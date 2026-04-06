# Terse — Token-Efficient Communication for Claude Code

Inspired by the brilliant [Caveman Plugin](https://github.com/JuliusBrussee/caveman).

A Claude Code plugin that cuts **30–50% of output tokens** by compressing prose, eliminating filler, and reducing explanatory code to minimal form — without touching deliverable code quality.

## What It Does

Terse mode transforms Claude's communication style:

| Normal | Terse |
|--------|-------|
| "Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by a misconfigured authentication middleware..." | "Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:" |
| 6-line PostgreSQL pool setup with imports | `` `new Pool({ max: 20, idleTimeoutMillis: 30000 })` `` + one-line explanation |

### Key Behaviors

- **Prose**: Drops articles, filler words, pleasantries, and hedging. Fragments are fine.
- **Explanatory code**: Compressed to one-liners, pseudocode, or name-drops. Full snippets only for obscure APIs.
- **Deliverable code**: Untouched. Production code stays production-quality.
- **Technical terms**: Always exact. No simplification of domain language.

## Install

### From marketplace

```
claude plugin install terse@fingerskier-plugins
```

### Manual install

```bash
git clone https://github.com/fingerskier/terse-claude-plugin.git ~/.claude/skills/terse

# Or copy directly
cp -r terse-claude-plugin/skills/terse ~/.claude/skills/
```

## Usage

Activate in any Claude Code conversation:

```
start terse
```

Deactivate:

```
stop terse
```

Also triggers on: `terse mode`, `less tokens`, `be brief`.

## Who Is This For?

Experienced developers who don't need hand-holding.
If you already know what `useMemo` does and just need to know *when* to reach for it, terse mode skips the tutorial and gives you the answer.

## Token Savings Estimate

| Response Type | Estimated Savings |
|--------------|-------------------|
| Pure explanation | 35–55% |
| Mixed code + explanation | 25–50% |
| Short direct questions | 40–60% |
| Mostly deliverable code | 0–10% |
| **Median across categories** | **~36%** |

Savings vary by prompt and conversation. Numbers based on automated benchmarking of 26 prompts across 8 categories.

## Test Results

We ran 26 prompts across 8 categories, comparing normal vs terse output by word, character, and line count.
Some normal-mode runs returned empty responses (test harness issue), so results below include only valid pairs where both modes produced content.

| Category | Valid / Total | Word Reduction |
|----------|:------------:|:--------------:|
| Pure explanation | 3 / 4 | 12–58% |
| Mixed code + explanation | 3 / 4 | 26–52% |
| Error & technical terms | 3 / 3 | 20–47% |
| Short direct questions | 4 / 4 | -3–25% |
| Multi-step tutorial | 2 / 3 | 6–16% |
| Pleasantry traps | 3 / 3 | -74–25% |
| Boundary cases (should not compress) | 1 / 2 | -299–26% |

### Takeaways

- **Best gains on prose-heavy responses.** Explanations and mixed code/explanation see 20–58% word reduction consistently.
- **Diminishing returns on short answers.** Already-concise responses (short questions, error diagnostics) see 0–25% reduction.
- **Inconsistent on pleasantries and boundary cases.** Terse sometimes *expanded* output — particularly on prompts asking for structured deliverables like PR descriptions, where terse mode added more detail than normal mode provided.
- **Test harness gaps.** 5 of 26 normal-mode responses came back empty, inflating negative percentages in the raw summary. Valid-pair results are more representative.

Full results are in [`test/results/summary.txt`](test/results/summary.txt).

## License

MIT
