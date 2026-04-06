#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RERUN_EMPTY = process.argv.includes('--rerun-empty');
const MIN_WORDS = 5; // responses with fewer words are considered empty/failed

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROMPTS_PATH = join(__dirname, 'prompts.json');
const RESULTS_DIR = join(__dirname, 'results');

function isEmptyResponse(text) {
  return text.trim().split(/\s+/).filter(Boolean).length < MIN_WORDS;
}

function computeMetrics(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const lines = text.split('\n').length;
  return { words, chars, lines };
}

function runClaude(prompt) {
  try {
    const stdout = execFileSync('claude', ['-p', prompt], {
      encoding: 'utf-8',
      timeout: 120_000,
      maxBuffer: 10 * 1024 * 1024,
    });
    return { ok: true, output: stdout, metrics: computeMetrics(stdout) };
  } catch (err) {
    const msg = err.stderr?.toString() || err.message;
    console.error(`  Error: ${msg.slice(0, 200)}`);
    return { ok: false, output: `[ERROR] ${msg}`, metrics: null };
  }
}

function runClaudeWithRetry(prompt, maxRetries = 2) {
  let result;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (attempt > 0) console.log(`    Retry ${attempt}/${maxRetries}...`);
    result = runClaude(prompt);
    if (result.ok && !isEmptyResponse(result.output)) return result;
  }
  return result; // return last attempt even if empty
}

function pct(normal, terse, key) {
  if (!normal || !terse) return '  N/A ';
  const val = ((normal[key] - terse[key]) / normal[key] * 100);
  if (!Number.isFinite(val)) return '  N/A ';
  return `${val.toFixed(1)}%`.padStart(6);
}

function pad(val, width) {
  return String(val).padStart(width);
}

function median(arr) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function formatTable(normalMetrics, terseMetrics) {
  const W = 7; // column width
  const lines = [];
  lines.push('┌───────────┬─────────┬─────────┬─────────┐');
  lines.push(`│ Mode      │ ${pad('Words', W)} │ ${pad('Chars', W)} │ ${pad('Lines', W)} │`);
  lines.push('├───────────┼─────────┼─────────┼─────────┤');

  if (normalMetrics) {
    lines.push(`│ Normal    │ ${pad(normalMetrics.words, W)} │ ${pad(normalMetrics.chars, W)} │ ${pad(normalMetrics.lines, W)} │`);
  } else {
    lines.push(`│ Normal    │ ${pad('N/A', W)} │ ${pad('N/A', W)} │ ${pad('N/A', W)} │`);
  }

  if (terseMetrics) {
    lines.push(`│ Terse     │ ${pad(terseMetrics.words, W)} │ ${pad(terseMetrics.chars, W)} │ ${pad(terseMetrics.lines, W)} │`);
  } else {
    lines.push(`│ Terse     │ ${pad('N/A', W)} │ ${pad('N/A', W)} │ ${pad('N/A', W)} │`);
  }

  lines.push('├───────────┼─────────┼─────────┼─────────┤');
  lines.push(`│ Reduction │ ${pct(normalMetrics, terseMetrics, 'words')}  │ ${pct(normalMetrics, terseMetrics, 'chars')}  │ ${pct(normalMetrics, terseMetrics, 'lines')}  │`);
  lines.push('└───────────┴─────────┴─────────┴─────────┘');
  return lines.join('\n');
}

// --- Main ---

const raw = readFileSync(PROMPTS_PATH, 'utf-8');
let categories;
try {
  const parsed = JSON.parse(raw);
  // Backward compat: flat array → single category
  if (Array.isArray(parsed)) {
    categories = { uncategorized: parsed };
  } else if (parsed && typeof parsed === 'object') {
    categories = parsed;
  } else {
    throw new Error('Expected an object or array');
  }
} catch (e) {
  console.error(`Failed to parse ${PROMPTS_PATH}: ${e.message}`);
  process.exit(1);
}

const categoryEntries = Object.entries(categories).filter(([, v]) => Array.isArray(v) && v.length > 0);
if (categoryEntries.length === 0) {
  console.error('prompts.json must contain at least one category with prompts.');
  process.exit(1);
}

const totalPrompts = categoryEntries.reduce((n, [, v]) => n + v.length, 0);

mkdirSync(RESULTS_DIR, { recursive: true });

const output = [];
const allReductions = [];

output.push('Terse Plugin Comparison');
output.push('=======================\n');

let globalIdx = 0;

for (const [category, prompts] of categoryEntries) {
  const catLabel = category.replace(/_/g, ' ');
  output.push(`── ${catLabel} ${'─'.repeat(Math.max(0, 40 - catLabel.length))}`);
  output.push('');
  console.log(`\n━━ Category: ${catLabel} (${prompts.length} prompts) ━━`);

  const catReductions = [];
  const safeCat = category.replace(/[^a-z0-9_-]/gi, '_');

  for (const [j, prompt] of prompts.entries()) {
    globalIdx++;
    const truncated = prompt.length > 60 ? prompt.slice(0, 57) + '...' : prompt;
    const normalPath = join(RESULTS_DIR, `${safeCat}-${j}-normal.md`);
    const tersePath = join(RESULTS_DIR, `${safeCat}-${j}-terse.md`);

    let normal, terse;

    if (RERUN_EMPTY) {
      // Read existing results and check if they're substantive
      const normalExists = existsSync(normalPath);
      const terseExists = existsSync(tersePath);
      const normalText = normalExists ? readFileSync(normalPath, 'utf-8') : '';
      const terseText = terseExists ? readFileSync(tersePath, 'utf-8') : '';
      const normalNeedsRerun = !normalExists || isEmptyResponse(normalText);
      const terseNeedsRerun = !terseExists || isEmptyResponse(terseText);

      if (!normalNeedsRerun && !terseNeedsRerun) {
        console.log(`\n[${globalIdx}/${totalPrompts}] Skipping (both exist): "${truncated}"`);
        normal = { ok: true, output: normalText, metrics: computeMetrics(normalText) };
        terse = { ok: true, output: terseText, metrics: computeMetrics(terseText) };
      } else {
        console.log(`\n[${globalIdx}/${totalPrompts}] Re-running empty results: "${truncated}"`);
        if (normalNeedsRerun) {
          console.log('  Normal mode (re-run)...');
          normal = runClaudeWithRetry(prompt);
          writeFileSync(normalPath, normal.output);
        } else {
          normal = { ok: true, output: normalText, metrics: computeMetrics(normalText) };
        }
        if (terseNeedsRerun) {
          console.log('  Terse mode (re-run)...');
          terse = runClaudeWithRetry(`/terse:terse ${prompt}`);
          writeFileSync(tersePath, terse.output);
        } else {
          terse = { ok: true, output: terseText, metrics: computeMetrics(terseText) };
        }
      }
    } else {
      console.log(`\n[${globalIdx}/${totalPrompts}] Running: "${truncated}"`);

      console.log('  Normal mode...');
      normal = runClaudeWithRetry(prompt);
      writeFileSync(normalPath, normal.output);

      console.log('  Terse mode...');
      terse = runClaudeWithRetry(`/terse:terse ${prompt}`);
      writeFileSync(tersePath, terse.output);
    }

    output.push(`Prompt ${globalIdx}/${totalPrompts}: "${truncated}"`);
    output.push(formatTable(normal.metrics, terse.metrics));
    output.push('');

    // Only include valid pairs in averages
    if (normal.metrics && terse.metrics) {
      const r = {
        words: (normal.metrics.words - terse.metrics.words) / normal.metrics.words * 100,
        chars: (normal.metrics.chars - terse.metrics.chars) / normal.metrics.chars * 100,
        lines: (normal.metrics.lines - terse.metrics.lines) / normal.metrics.lines * 100,
      };
      const isValid = normal.metrics.words >= MIN_WORDS
        && terse.metrics.words >= MIN_WORDS
        && Object.values(r).every(v => Number.isFinite(v));
      if (isValid) {
        catReductions.push(r);
        allReductions.push(r);
      }
    }
  }

  if (catReductions.length > 0) {
    const avg = (key) => (catReductions.reduce((s, r) => s + r[key], 0) / catReductions.length).toFixed(1);
    const med = (key) => median(catReductions.map(r => r[key])).toFixed(1);
    output.push(`  ${catLabel} (${catReductions.length}/${prompts.length} valid): avg ${avg('words')}% / median ${med('words')}% words, avg ${avg('chars')}% / median ${med('chars')}% chars, avg ${avg('lines')}% / median ${med('lines')}% lines`);
    output.push('');
  } else {
    output.push(`  ${catLabel}: no valid pairs`);
    output.push('');
  }
}

if (allReductions.length > 0) {
  const avg = (key) => (allReductions.reduce((s, r) => s + r[key], 0) / allReductions.length).toFixed(1);
  const med = (key) => median(allReductions.map(r => r[key])).toFixed(1);
  output.push(`Overall (${allReductions.length}/${totalPrompts} valid): avg ${avg('words')}% / median ${med('words')}% words, avg ${avg('chars')}% / median ${med('chars')}% chars, avg ${avg('lines')}% / median ${med('lines')}% lines`);
} else {
  output.push('Overall: no valid pairs to compare');
}

const summary = output.join('\n');
console.log('\n' + summary);
writeFileSync(join(RESULTS_DIR, 'summary.txt'), summary);
console.log(`\nResults saved to ${RESULTS_DIR}/`);
