const fs = require('fs');
const path = require('path');

const text = path.join(__dirname, 'text.txt');
var stream = new fs.ReadStream(text, 'utf-8');
 
stream.on('readable', function(){
  var data = stream.read();
  console.log(data);
});