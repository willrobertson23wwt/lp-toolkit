# lp-toolkit

The shared Remotion toolkit and video tools for the WWT learning paths.
`README.md` covers using, linking and releasing it. The style rules the code
follows (sketch style, palette roles, sound levels) are in the template,
`../learning-path-pipeline/.claude/references/`, and its `CLAUDE.md`.

## Rules

- **Nothing path-specific here.** A path that wants a different look gets a
  setting (a prop, or a module-level default like `configureHand`), with
  the template's look as the default. Put the path's own values in the path.
- **Every course pins a tag,** so a change can't reach a finished path by
  accident. A change that makes a course edit its code (a renamed export,
  a removed prop, a changed default that moves pixels) is a major version.
  Say so in the commit message.
- **Test in a course before tagging:** link the toolkit into a course
  (`npm i ../lp-toolkit`), run its `npx tsc --noEmit`, and render a still
  of a composition that uses the change.
- The bins run in a course folder (`process.cwd()`) and load Remotion's
  packages from the course with `lib/course.mjs`, never from here.
- `src/` is TypeScript compiled to `dist/` by `npm run build` (and by
  `prepare` on install). `dist/` is not committed.

## Commands

```bash
export PATH="$HOME/.nvm/versions/node/<version>/bin:$PATH"   # macOS + nvm only
npm install
npm run typecheck
npm run watch        # rebuild dist/ on save while a course has it linked
```
