const fs = require('fs');
const path = require('path');
 

fs.mkdir('./04-copy-directory/files-copy', { recursive: true}, (err) => {
  if (err) throw err;
});

const folder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

fs.readdir(folder, (err, files) => {
  files.forEach(file => {
    fs.copyFile(`${folder}/${file}`, `${copyFolder}/${file}`, (err) => {  
      if (err) throw err;
    });
  });
});

fs.readdir(copyFolder, (err, copies) =>{
  copies.forEach(copy =>{
    const copyPathInFolder = path.join(folder, copy);
    const copyPathInCopy = path.join(copyFolder, copy);
    fs.stat(copyPathInFolder, function(err) {
      if (err) {
        console.log('Файл не найден');
        fs.unlink(copyPathInCopy, function(err){
          if(err) return console.log(err);
          console.log('file deleted successfully');
        });  
      } 
    });
  });
});

