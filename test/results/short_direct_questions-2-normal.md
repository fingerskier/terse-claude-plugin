

`git rebase` replays commits from your current branch onto a different base commit. It rewrites history so your changes appear as if they were made on top of the target branch.

**Common usage:**
```bash
git rebase main        # replay current branch's commits on top of main
git rebase --onto A B  # replay commits after B onto A
```

**vs merge:** Merge creates a merge commit preserving both histories. Rebase creates a linear history by rewriting commits.

**Key things to know:**
- Rewrites commit hashes (new SHAs)
- Don't rebase commits already pushed/shared with others
- Use `--abort` to cancel a rebase in progress
- Use `--continue` after resolving conflicts
