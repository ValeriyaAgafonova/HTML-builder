const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');


fs.readdir(folder, (err, files) => {
  files.forEach(file => {
    fs.stat(`${folder}/${file}`, (err, stats) => {
      if (err) {
        throw err;
      } else {
        if (stats.isFile()){
          const name = path.parse(file).name;
          let ras = path.extname(file);
          ras = ras.replace('.', '');
          
          console.log(`${name} - ${ras} - ${stats.size}`);
        }
      }
    });
  });
});