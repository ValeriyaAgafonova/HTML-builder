const fs = require('fs');
const path = require('path');

fs.mkdir('./06-build-page/project-dist', { recursive: true}, (err) => {
  if (err) throw err;
});

const pathToResult = path.join(__dirname, 'project-dist'); 

fs.open(`${pathToResult}/index.html`, 'w', (err) => {
  if(err) throw err;
  console.log('File created');
});
fs.open(`${pathToResult}/style.css`, 'w', (err) => {
  if(err) throw err;
  console.log('File created');
});

fs.mkdir('./06-build-page/project-dist/assets', { recursive: true}, (err) => {
  if (err) throw err;
});


const assets = path.join(__dirname, 'assets');
const assetsCopy = path.join(pathToResult, 'assets');

fs.readdir(assets, (err, papkas) => {
  papkas.forEach(papka => {
    fs.mkdir(`${assetsCopy}/${papka}`, { recursive: true}, (err) => {
      if (err) throw err;
    });
    fs.readdir(`${assets}/${papka}`, (err, files)=>{
      files.forEach(file =>{
        fs.copyFile(`${assets}/${papka}/${file}`, `${assetsCopy}/${papka}/${file}`, (err) => {  
          if (err) throw err;
        });
      });
    });
  });
});
   


fs.readdir(assetsCopy, (err, copies) =>{
  copies.forEach(copy =>{
    const copyPathInFolder = path.join(assets, copy);
    const copyPathInCopy = path.join(assetsCopy, copy);
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
const resultCss = path.join(pathToResult, 'style.css');
const resultFile = path.join(pathToResult, 'index.html');
const template = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');

fs.readFile(template, (err, data) => {
  if (err) throw err;
  let content = data;
  content = content.toString();


  fs.readdir(components, (err, compos)=>{
    compos.forEach(comp=>{
      fs.readFile(`${components}/${comp}`, (err, data) => {
        if (err) throw err;
        let fileContent = data;
        fileContent = fileContent.toString();
        const compName = path.parse(comp).name;

        if (content.indexOf(compName) !== -1){
          content = content.replace(`{{${compName}}}`, fileContent);
          fs.writeFile(resultFile, content, 'utf8', function (err) {
            if (err) return console.log(err);
          });
        }
      });
    });
  });
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
              resultCss,
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
