// The bins run inside a course (process.cwd()), and Remotion's own packages
// must come from that course's node_modules, never from a copy beside this
// toolkit: two Remotions in one render break it. Resolve them from the course.
import {createRequire} from 'node:module';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const req = createRequire(path.join(process.cwd(), 'package.json'));

export const fromCourse = async (name) => {
  let file;
  try {
    file = req.resolve(name);
  } catch {
    console.error(`${name} isn't installed in this course (${process.cwd()}). Run the command from the course folder.`);
    process.exit(1);
  }
  return import(pathToFileURL(file).href);
};
