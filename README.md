# Terse — Token-Efficient Communication for Claude Code

Inspired by the brilliant [Caveman Plugin](https://github.com/JuliusBrussee/caveman).

A Claude Code plugin that cuts **50–70% of output tokens** by compressing prose, eliminating filler, and reducing explanatory code to minimal form — without touching deliverable code quality.

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

Experienced developers who don't need hand-holding. If you already know what `useMemo` does and just need to know *when* to reach for it, terse mode skips the tutorial and gives you the answer.

## Token Savings Estimate

| Response Type | Estimated Savings |
|--------------|-------------------|
| Pure explanation | 60–70% |
| Mixed code + explanation | 40–60% |
| Mostly deliverable code | 10–20% |
| **Weighted average** | **50–70%** |

Savings vary by conversation. The claim is based on the compression techniques applied, not formal benchmarking.

## License

MIT
