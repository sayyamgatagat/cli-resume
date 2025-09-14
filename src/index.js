#!/usr/bin/env node

import boxen from 'boxen';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatResume } from './helpers/formatter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resumePath = path.join(__dirname, 'resources', 'resume.json');
const resume = JSON.parse(fs.readFileSync(resumePath, 'utf-8'));

const boxOptions = {
  padding: 0,
  borderStyle: "round",
  borderColor: "black",
  backgroundColor: "black", 
  margin: 0,
};

const headerOutput = boxen(formatResume(resume, "header"), {
  ...boxOptions,
  textAlignment: "center",
  width: Math.max(process.stdout.columns - 4, 80),
});

const bodyOutput = boxen(formatResume(resume, "body"), boxOptions);

const outerBox = boxen(`${headerOutput}\n${bodyOutput}`, {
  borderStyle: "round",
  backgroundColor: "black",
});

console.log(outerBox);
console.log("\nTo download my resume, visit:" + chalk.cyan("https://drive.google.com/file/d/1OY3I74FZEXjOI-8tYDzUD3NcKFbfT3dD/view?usp=sharing"));
console.log(chalk.gray("\nGenerated with ❤️ by Sayyam Gatagat"));