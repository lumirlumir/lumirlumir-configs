const fs = require('fs');
const path = require('path');
const yml = require('yaml');

const userName = 'lumirlumir';
const repositoryName = 'lumirlumir-configs';
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
      [`${userName}/${path.parse(inputYmlFilePath).name}`]: ymlFileParsed[
        `${userName}/${repositoryName}`
      ].map(obj => ({
        source: obj.dest,
        dest: obj.source,
      })),
    };

    // console.log(ymlFileParsed);
    // console.log('\n-----\n');
    // console.log(ymlFileParsedProcessed);
    // console.log('\n-----\n');
    // console.log(yml.stringify(ymlFileParsedProcessed));
    // console.log('\n-----\n');

    outputYmlFile = `${outputYmlFile}${yml.stringify(ymlFileParsedProcessed)}\n`;
  });

  return outputYmlFile;
};

fs.writeFileSync(outputYmlFilePath, createYmlFile(), 'utf-8');
