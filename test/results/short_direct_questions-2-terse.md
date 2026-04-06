

`git rebase` replays commits from current branch onto tip of another branch. Rewrites history — new commit hashes.

Common use: `git rebase main` — takes your feature branch commits, replays them after latest main.

vs merge: rebase = linear history, merge = preserves branch topology.

Interactive (`-i`): reorder, squash, edit, drop commits before replay.

Risk: never rebase shared/pushed commits — rewrites history others depend on.
