

`git rebase` replays commits from your current branch onto a new base commit. It rewrites history so your changes appear as if they were made on top of the target branch.

```
# Before rebase (on feature branch):
main:    A - B - C
feature:      \- D - E

# After `git rebase main`:
main:    A - B - C
feature:              \- D' - E'
```

Key points:
- **D' and E'** are new commits (different SHAs) with the same changes as D and E
- Unlike merge, it produces a linear history — no merge commit
- **Don't rebase commits that others have pulled** — it rewrites shared history

Common uses:
- `git rebase main` — update your feature branch with latest main
- `git rebase -i HEAD~3` — interactive rebase to squash/edit/reorder last 3 commits
- `git rebase --onto new-base old-base branch` — transplant a range of commits
