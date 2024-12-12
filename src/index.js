/**
 * @fileoverview Main script file for the GitHub Actions `sync-server` action. This script creates a single YML file from multiple YML files.
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const fs = require('node:fs');
const path = require('node:path');
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

    // console.log(ymlFileParsed);
    // console.log('\n-----\n');
    // console.log(ymlFileParsedProcessed);
    // console.log('\n-----\n');
    // console.log(yml.stringify(ymlFileParsedProcessed));
    // console.log('\n-----\n');

    // Should use LF line endings because every file in the repository uses LF line endings due to the `.editorconfig` file.
    outputYmlFile += `${yml.stringify(ymlFileParsedProcessed)}\n`;
  });

  return outputYmlFile;
};

// --------------------------------------------------------------------------------
// Execution
// --------------------------------------------------------------------------------

fs.writeFileSync(outputYmlFilePath, createYmlFile(), 'utf-8');
