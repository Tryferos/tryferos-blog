<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commits

Commit on `main` as `<type>: <Imperative summary>`, one concern per commit, never "and" in the message. Types: `feat`, `fix`, `refactor` (no behaviour change), `deps`, `chore` (docs, config, tooling). If you need to use "and" for the commit summary, split it between more commits.

## Checks

Run `pnpm check`, then `pnpm build`. Fix findings in the code, never by disabling rules, raising limits or ignoring Knip. There are no tests.

## Packages

- Use pnpm. Add packages with `pnpm add`.
- Before writing a lot of complex code, research libraries and tools, then let the user choose with the trade-offs.

## Code

- When building new components, always try to use components/ui first, if they do not fit the style extend them (size, variants). Then look at components/shared, if it can be used. If you are building something new, build it at the place you are working on (e.g. feature) if this component will be shared across many features make it shared.
- No comments unless necessary. Make the code clearer instead.
- Inside a kind folder such as `components/` or `lib/`, group files by what the reader sees, such as the article page: two or more files for the same one go in a kebab-case subfolder named after it, like `components/series/`. A file used by several of them, or the only file for its own, stays in the kind folder. A component used by several is named `<Component>.shared.tsx`.
- `src/components/ui/` holds only shadcn components, in PascalCase files that each export one compound component built with `Object.assign` (`<Dialog.Content>`, `<Command.Item>`). Rewrite what `shadcn add` generates into that shape. Every other app-wide component goes in `src/components/shared/`.
- Each screen lives in `src/features/<name>/`, whose `index.tsx` exports only `<Name>Screen`. Routes in `src/app/` handle params and metadata, then render the screen.
- Name conditions and compared strings: `const isDraft = article.status === statuses.draft`, not `article.status === 'draft'` inline.
- Environment variables never get default values.
- Animations take their values from `src/data/motion.tokens.ts`. Add a token there rather than an inline duration, delay or offset.
- Do not use border-b or border-t as a means of separating sections, use Separator.tsx instead,

### Model Convention

In TypeScript, compute any result derived from two or more fields in a model, with the data as the first argument: `topicModel.articleHref(topic, article)`, not `` `/${topic.slug}/${article.slug}` ``.

## AGENTS.md files

Write only what no check verifies. When a rule can be checked, add the check instead.
