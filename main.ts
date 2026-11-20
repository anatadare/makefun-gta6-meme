// Hand in the meme's X post: copy POST.json from the repository into the output
// directory, where the house reads it and fetches the post itself. That is the
// whole job; the post, not anything written here, is what gets judged.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const postFile = join(botDir, 'POST.json');

// Check the post file is usable before handing it in: it must be valid JSON
// holding an object with a string url field, so a broken POST.json fails here
// with a clear message instead of being copied on and refused by the gate.
let post;
try {
  post = JSON.parse(readFileSync(postFile, 'utf8'));
} catch {
  console.error('POST.json is not valid JSON:', postFile);
  process.exit(1);
}
if (typeof post !== 'object' || post === null || typeof post.url !== 'string') {
  console.error('POST.json must be an object with a string url field:', postFile);
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(postFile, join(outDir, 'POST.json'));
} catch (error) {
  console.error('could not copy POST.json:', error instanceof Error ? error.message : error);
  process.exit(1);
}
