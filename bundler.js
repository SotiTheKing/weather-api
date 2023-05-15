const fs = require('fs');

// Read the source JavaScript file
let code = fs.readFileSync('./index.js', 'utf8');

// Replace placeholder with the environment variable value
code = code.replace('process.env.API_KEY', '9c7726e1a983414191a140225231505');

// Write the modified code to the destination JavaScript file
fs.writeFileSync('dist/main.js', code, 'utf8');
