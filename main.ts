// Hand in the meme's X post: copy POST.json from the repository into the output
// directory, where the house reads it and fetches the post itself. That is the
// whole job; the post, not anything written here, is what gets judged.
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(join(botDir, 'POST.json'), join(outDir, 'POST.json'));
} catch (error) {
  console.error('could not copy POST.json:', error instanceof Error ? error.message : error);
  process.exit(1);
}
