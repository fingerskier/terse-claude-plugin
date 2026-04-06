

`git rebase` replays commits from current branch onto new base. Moves/reapplies commits one-by-one on top of target branch.

**vs merge:** merge creates merge commit preserving both histories; rebase rewrites history into linear sequence.

**Common forms:**
- `git rebase main` — replay current branch commits onto tip of main
- `git rebase -i HEAD~3` — interactive: reorder, squash, edit, drop last 3 commits
- `git rebase --onto A B C` — take commits B..C, replay onto A

**Key gotcha:** rewrites commit hashes. Never rebase commits already pushed to shared branch — other devs' history diverges.

**Conflict flow:** rebase pauses at conflicts → fix → `git add` → `git rebase --continue` (or `--abort` to bail).
