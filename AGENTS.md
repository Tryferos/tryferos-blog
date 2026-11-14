<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commits

Commit on `main` as `<type>: <Imperative summary>`, one concern per commit, never "and" in the message. Types: `feat`, `fix`, `refactor` (no behaviour change), `deps`, `chore` (docs, config, tooling).

## Checks

Run `pnpm check`, then `pnpm build`. Fix findings in the code, never by disabling rules, raising limits or ignoring Knip. There are no tests.

## Packages

- Use pnpm. Add packages with `pnpm add`.
- Before writing a lot of complex code, research libraries and tools, then let the user choose with the trade-offs.

## Code

- No comments unless necessary. Make the code clearer instead.
- Inside a kind folder such as `components/` or `lib/`, group files by what the reader sees, such as the article page: two or more files for the same one go in a kebab-case subfolder named after it, like `components/article/`. A file used by several of them, or the only file for its own, stays in the kind folder. A component used by several is named `<Component>.shared.tsx`.
- Name magic numbers, indexes, offsets and conditions: `user.role === roles.admin`, not `user.role === 2`.
- Environment variables never get default values.

## AGENTS.md files

Write only what no check verifies. When a rule can be checked, add the check instead.
