const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// using inquirer.prompt, ask the user to provide input that will then be added to a dynamically created README
function promptUser () {
 return inquirer.prompt([
    {
      type: "input",
      message: "What is the title of your project?",
      name: "title"
    },
    {
        type: "input",
        message: "Provide a brief description of your project.",
        name: "description" 
    },
    {
        type: "input",
        message: "What are the steps required to install your project?",
        name: "installation" 
    },

    {
        type: "input",
        message: "Provide instructions and examples for use.",
        name: "usage" 
    },

    {
        type: "input",
        message: "What are guidelines for contributing to your application?",
        name: "contributions" 
    },

    {
        type: "input",
        message: "Provide instructions for how to test the application",
        name: "test" 
    },

    {
        type: "list",
        message: "What licenses apply to your project?",
        name: "license",
        choices: [
          "Apcahe", 
          "GNU LGPLv3", 
          "MIT", 
          "ISC",
          "Mozilla Public License 2.0",
          "Boost Software Licnese 1.0",
          "The Unlicense",
        ]
      },

      {
        type: "input",
        message: "What is your GitHub username?",
        name: "username" 
    },

    {
        type: "input",
        message: "What is your email",
        name: "email" 
    },
  
  ])
}

function generateREADME(response) {
// this function will be included in the write file function, so the README is formatted properly, while also including the user's reponses
  return `
  # ${response.title}
  ${badge}
  
  ## Description
  ${response.description}
  
  Table of Contents:
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Credits](#credits)
  * [Tests](#tests)
  * [Questions](#questions)
  
  ## Installation 
  ${response.installation}

  ## Usage
  ${response.usage}
    
  ## License
  ${response.license}

  ## Contributing
  ${response.contributions}

  ## Tests
  ${response.test}

  ## Questions
  If you have questions, please contact ${response.username} or email ${response.email}
  `
}

  promptUser().then(function(response) {
    //create the README file from the user's responses
      const README = generateREADME(response)
      createBadge(response)

      return writeFileAsync("README.md", README)

      .then(function() {
        console.log("Successfully generated README.md");
      })
      .catch(function(err) {
        console.log(err);
      });
  }); 
// creating an array to store badge links
const badge = [
  "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
  "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
  "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)", 
  "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)", 
  "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
  "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
  "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
];

// creating a function that will choose the badge link from the array, based on the license the user selects
function createBadge(response) {
  if (response.license === "Apache") {
  let badge = badge[0]
  return badge
  };

  if (response.license === "GNU LGPLv3") {
    let badge = badge[1]
    return badge
  };

  if (response.license === "MIT") {
    let badge = badge[2]
    return badge
  };

  if (response.license === "ISC") {
    let badge = badge[3]
    return badge
  };

  if (response.license === "Mozilla Public License 2.0") {
    let badge = badge[4]
    return badge
  };

  if (response.license === "Boost Software Licnese 1.0") {
    let badge = badge[5]
    return badge
  };

  if (response.license === "The Unlicense") {
    let badge = badge[5]
    return badge
  };
};
