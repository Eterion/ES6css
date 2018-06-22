import { readdirSync, statSync } from 'fs';
import { basename, extname, join, resolve } from 'path';
import { runSass } from 'sass-true';

(function runTest(dir) {
  readdirSync(dir).forEach(file => {
    if (statSync(join(dir, file)).isDirectory()) {
      describe(file, () => {
        runTest(join(dir, file));
      });
    } else {
      if (
        extname(file) == '.scss' &&
        !['resources'].includes(basename(file, '.scss'))
      ) {
        runSass(
          {
            file: join(dir, file),
            includePaths: [join(__dirname, '../dist')],
          },
          describe,
          it
        );
      }
    }
  });
})(resolve(__dirname));
