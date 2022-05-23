const fs = require('fs');
const path = require('path');

const pathToResult = path.join(__dirname, 'project-dist');

fs.open(`${pathToResult}/bundle.css`, 'w', (err) => {
  if(err) throw err;
  console.log('File created');
});

const stylesFolder = path.join(__dirname, 'styles');

fs.readdir(stylesFolder, (err, files) => {
  files.forEach(file => {
    const filePath = path.join(stylesFolder, file);
    fs.lstat(filePath, (err, stats) => {
      if(err)
        return console.log(err); 

      if (stats.isFile() == true && path.extname(file) == '.css' ){
        fs.readFile(`${stylesFolder}/${file}`, 'utf8', 
          function(error,data){ 
            if(error) throw error; 
            fs.appendFile(
              `${pathToResult}/bundle.css`,
              data,
              err => {
                if (err) throw err;
              } 
            );           
          });          
      }
    });
  });
});