/**
 * @fileoverview Main script file for the GitHub Actions `sync-server` action. This script creates a single YML file from multiple YML files.
 *
 * run: `node src`
 * run(debug mode): `node src -d` or `node src --debug`
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const fs = require('node:fs');
const path = require('node:path');
const { log } = require('node:console');
const yml = require('yaml');

// --------------------------------------------------------------------------------
// Declaration
// --------------------------------------------------------------------------------

const USER_NAME = 'lumirlumir';
const REPOSITORY_NAME = 'lumirlumir-configs';
const clientsDirPath = path.resolve(__dirname, '..', 'clients');
const outputYmlFilePath = path.resolve(__dirname, '..', '.github', 'sync-server.yml');
const inputYmlFilePaths = fs
  .readdirSync(clientsDirPath)
  .map(filePath => path.resolve(clientsDirPath, filePath));
const secondArgv = process.argv[2];

const createYmlFile = () => {
  let outputYmlFile = '';

  inputYmlFilePaths.forEach(inputYmlFilePath => {
    const ymlFileParsed = yml.parse(fs.readFileSync(inputYmlFilePath, 'utf-8'));

    const ymlFileParsedProcessed = {
      [`${USER_NAME}/${path.parse(inputYmlFilePath).name}`]: ymlFileParsed[
        `${USER_NAME}/${REPOSITORY_NAME}`
      ].map(({ dest, source }) => ({
        source: dest,
        dest: source,
      })),
    };

    // Should use LF line endings because every file in the repository uses LF line endings due to the `.editorconfig` file.
    outputYmlFile += `${yml.stringify(ymlFileParsedProcessed)}\n`;

    // Debug mode.
    if (secondArgv === '-d' || secondArgv === '--debug') {
      log('inputYmlFilePath:');
      log(inputYmlFilePath);
      log('----------------------------------------------------------------------');
      log('ymlFileParsed:');
      log(ymlFileParsed);
      log('----------------------------------------------------------------------');
      log('ymlFileParsedProcessed:');
      log(ymlFileParsedProcessed);
      log('----------------------------------------------------------------------');
      log('yml.stringify(ymlFileParsedProcessed):');
      log(yml.stringify(ymlFileParsedProcessed));
    }
  });

  return outputYmlFile;
};

// --------------------------------------------------------------------------------
// Execution
// --------------------------------------------------------------------------------

fs.writeFileSync(outputYmlFilePath, createYmlFile(), 'utf-8');
