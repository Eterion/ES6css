const fs = require('fs');
const path = require('path');
const sassTrue = require('sass-true');

(function test(dir) {
  fs.readdirSync(dir).forEach(file => {

    // isDirectory
    if(fs.statSync(path.join(dir, file)).isDirectory()) {
      describe(file, function() {
        test(path.join(dir, file));
      });
    }

    // runSass
    else {
      if(path.extname(file) == '.scss' && path.basename(file, '.scss') != 'dependencies') {
        sassTrue.runSass({ file: path.join(dir, file) }, describe, it);
      }
    }

  });
})(path.resolve(__dirname));
