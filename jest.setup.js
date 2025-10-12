const fs = require('fs');
const path = require('path');

const distIndex = path.join(__dirname, 'dist', 'index.js');

if (!fs.existsSync(distIndex)) {
  throw new Error('Missing dist build output. Run `npm run build` before executing tests.');
}
