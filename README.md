# lp-toolkit

The code every WWT learning path shares, kept in one place so a fix reaches
every path instead of staying in the one where it was made.

- **The Remotion toolkit:** the hand-drawn kit (`Ink`, `HandText`, the shapes,
  `SweepMask`, `NavyGround`, `TitleLight`, `SketchThankYou`), the terminal kit
  (`TermWindow`, `typedText`, `Pill`, ...), the WWT palette and theme,
  `MixTrack`, `ManimLayer`, `HudIcon`, the older look's cards and backdrops,
  and the Studio layout helpers (`LayoutProvider`, `useNum`, `useFlag`).
- **The video tools,** run from a course folder: `lp-generate-audio`,
  `lp-transcribe`, `lp-beats`, `lp-captions`, `lp-stills`.

Each course's own work (its compositions, `Root.tsx`, beats, narration, labs)
stays in the course. The template, `learning-path-pipeline`, depends on this
package, so every path `/new-path` scaffolds gets it with `npm install`.

## Using it in a course

```bash
npm i github:willrobertson23wwt/lp-toolkit#v0.1.0
```

npm clones the tag and builds it (the `prepare` script). Pin a tag, never a
branch: a finished path keeps the version it was built with, and a path in
progress upgrades by changing the tag.

```tsx
import {HandText, Ink, NavyGround, SweepMask, configureHand} from 'lp-toolkit/sketch';
import {TermWindow, typedText} from 'lp-toolkit/terminal';
import {ACCENT, GROUND, WWT} from 'lp-toolkit/theme';
import {LayoutProvider, useNum, useFlag} from 'lp-toolkit/layout';
import {MixTrack, ManimLayer, TitleCard} from 'lp-toolkit';
```

`remotion.config.ts` wraps its webpack override with `lpWebpack`:

```ts
const {lpWebpack} = require('lp-toolkit/webpack');
Config.overrideWebpackConfig((c) => lpWebpack(enableTailwind(c)));
```

The tools run with `npx`, from the course folder:

```bash
npx lp-generate-audio <course-slug> [lab|first-last] [--force] [--dry-run]
npx lp-transcribe public/chapters/<id>/narration.mp3
npx lp-beats public/chapters/<id>/narration.transcript.json --words
npx lp-captions public/chapters/<id>/narration.transcript.json --map ... --script ...
npx lp-stills <CompositionId> out/stills/<CompositionId> <f1,f2,...>
```

### Changing a default for one path

Change a path's look with a setting, not by editing the toolkit. For example,
steadier lettering for the whole path, set once in the course's
`src/index.ts`:

```ts
import {configureHand} from 'lp-toolkit/sketch';
configureHand({jitter: 0.3, wobble: 0.6});
```

If a path needs something the toolkit can't do yet, add the option here
and release it, so the next path has it too.

## Working on the toolkit

Clone it next to the course you're testing with, link it, and rebuild on
save:

```bash
git clone https://github.com/willrobertson23wwt/lp-toolkit ../lp-toolkit
cd ../lp-toolkit && npm install && npm run watch
# in the course:
npm i ../lp-toolkit
```

Studio and renders pick up each rebuild. `lpWebpack` keeps the course's own
React and Remotion in use while the toolkit is linked. When you're done,
point the course back at a tag.

### Releasing

1. `npm run typecheck`, then render a still in a course that uses the change.
2. Bump `version` in `package.json` (patch for a fix, minor for a new
   component or option, major when a course has to change its code).
3. Commit, tag `vX.Y.Z`, push with `--tags`.
4. In `learning-path-pipeline`, move its `lp-toolkit` dependency to the new
   tag, so new paths start on it.

### Source assets

- `src/assets/hand/`: the EMS single-line fonts, converted by
  `tools/hand-font.mjs` (SIL Open Font License).
- `src/assets/hud/`: the Lottie HUD icons, trimmed from the Envato pack by
  `tools/prepare-hud.mjs` (the pack itself stays out of git).

Files a composition loads with `staticFile()` (music, backgrounds, Manim
renders) live in each course's `public/`, not here.
