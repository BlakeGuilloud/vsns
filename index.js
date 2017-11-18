#!/usr/bin/env node
const { exec } = require('child_process');
const fs = require('fs');

const colorOpts = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'gray'];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return colorOpts[Math.floor(Math.random() * (max - min)) + min];
}

function execute(program) {
  exec(`${program} --version`, (execError, stdin, stderr) => {
    if (execError && execError.code === 127) {
      console.log(`${program} |`.toUpperCase(), 'Not found..');
    } else {
      const strColor = getRandomInt(0, colorOpts.length);

      const returnVal = stdin || stderr;
      console.log('str color', strColor);

      console.log(`${program} |`.toUpperCase(), returnVal.toString().trim()[strColor]);
    }
  });
}

const configFile = process.cwd().split('/').slice(0, 3).join('/').concat('/.vsns');

function writeAndReadFile(content) {
  fs.writeFileSync(configFile, content);

  fs.readFile(configFile, 'utf8', (err, data) => {
    data.split(',').forEach(execute);
  });
}

fs.readFile(configFile, 'utf8', (err, data) => {
  if (!data) {
    writeAndReadFile(['node', 'npm', 'yarn']);
  } else if (process.argv[2] === 'add' && !data.includes(process.argv[3].toLowerCase())) {
    writeAndReadFile(data.split(',').concat(process.argv[3]));
  } else if (process.argv[2] === 'remove' && data.includes(process.argv[3].toLowerCase())) {
    const content = data.split(',');
    
    content.splice(content.indexOf(process.argv[3]), 1);

    writeAndReadFile(content);
  } else {
    data.split(',').forEach(execute);
  }
});
