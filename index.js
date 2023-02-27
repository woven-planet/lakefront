// index.js
const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
  * Notice the "name" and "date" property.
*/

const DATA = {
    nameOfComponent: 'NAME_OF_COMPONENT',
    dummyURL: 'NAME_OF_COMPONENT',
    imgSrc: 'NAME_OF_COMPONENT'
};
/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */

function readReadMe() {
    if (fs.readFileSync('README.md', 'utf8').slice(-1) != '|') {
        fs.appendFileSync('README.md', '\n');
        generateReadMe(false);
    } else {
        generateReadMe(true);
    }
}

function generateReadMe(rightColumn) {
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) throw err;
        let output = Mustache.render(data.toString(), DATA);
        if (rightColumn) {
            output = output.substring(0, output.length - 1);
        }
        fs.appendFileSync('README.md', output,);
    });
}

readReadMe();
