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
          "Boost Software License 1.0",
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
  ${badgeSelection}
  
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
  // creating an empty array that will store badges, based on the user's license selection
  const badgeSelection = []

  function generateBadge(response) {
    if (response.license === "Apcahe") {
      badgeSelection.push("![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)")
    };

    if (response.license === "GNU LGPLv3") {
      badgeSelection.push("![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)")
    };
      
    if (response.license === "MIT") {
      badgeSelection.push("![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)")
    };
      
    if (response.license === "ISC") {
      badgeSelection.push("![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)")
    };
      
    if (response.license === "Mozilla Public License 2.0") {
      badgeSelection.push("![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)")
    };
      
    if (response.license === "Boost Software License 1.0") {
      badgeSelection.push("![License: Boost](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)")
    };
      
    if (response.license === "The Unlicense") {
      badgeSelection.push("  ![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)")
    };
  };

  promptUser().then(function(response) {
  //choose the badge 
    generateBadge(response);
  //create the README file from the user's responses
    const README = generateREADME(response);
  // create the README.md file
     return writeFileAsync("README.md", README)

      .then(function() {
        console.log("Successfully generated README.md");
      })
      .catch(function(err) {
        console.log(err);
      });
  }); 