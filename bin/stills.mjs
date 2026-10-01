#!/usr/bin/env node
// Render many stills of one composition from a single bundle (remotion still
// re-bundles the whole project on every call).
//   npx lp-stills <CompositionId> <outDir> <frame,frame,...> [--props '<json>']
import {mkdirSync} from 'node:fs';
import path from 'node:path';
import {fromCourse} from '../lib/course.mjs';
import {lpWebpack} from '../webpack.cjs';

const {bundle} = await fromCourse('@remotion/bundler');
const {renderStill, selectComposition} = await fromCourse('@remotion/renderer');

const [id, outDir, frameList] = process.argv.slice(2);
if (!id || !outDir || !frameList) {
  console.error("Usage: npx lp-stills <CompositionId> <outDir> <f1,f2,...> [--props '<json>']");
  process.exit(1);
}
const propsIdx = process.argv.indexOf('--props');
const inputProps = propsIdx === -1 ? {} : JSON.parse(process.argv[propsIdx + 1]);
const frames = frameList.split(',').map(Number);

const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), webpackOverride: lpWebpack});
const composition = await selectComposition({serveUrl, id, inputProps});
mkdirSync(outDir, {recursive: true});
for (const frame of frames) {
  const output = path.join(outDir, `f${frame}.png`);
  await renderStill({serveUrl, composition, frame, output, inputProps});
  console.log(output);
}
