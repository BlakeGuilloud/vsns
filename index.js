#!/usr/bin/env node
const { exec } = require('child_process');
const colors = require('colors');

const colorOpts = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'gray'];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return colorOpts[Math.floor(Math.random() * (max - min)) + min];
}

const programs = ['node', 'yarn', 'npm'];

function execute(program) {
  exec(`${program} --version`, (execError, stdin, stderr) => {
    const strColor = getRandomInt(0, colorOpts.length);

    console.log(`${program} |`.toUpperCase(), stdin.toString().trim()[strColor]);
  });
}

programs.forEach(execute);
