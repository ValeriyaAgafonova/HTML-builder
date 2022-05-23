const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');


fs.writeFile(
  path.join(__dirname, 'testFile.txt'),
  '',
  (err) => {
    if (err) throw err;
    console.log('Файл был создан');
  }
);

stdout.write('Введите текст: \n');

process.on('SIGINT', function(){
  console.log('\n Вы создали файл и можете посмотреть изменения в нем. Проверьте его');
  process.exit();
});

stdin.on('data', data => {
  let name = data.toString();
  if(name === 'exit\n'){
    console.log('\n Вы захотели выйти из программы. Ну что ж, мы еще встретимся');
    process.exit();
  }
  fs.appendFile(
    path.join(__dirname,  'testFile.txt'),
    name,
    err => {
      if (err) throw err;
    } 
  );
  stdout.write('\n Я все записала!Давай напишем что-то еще \n');
  
  
});

