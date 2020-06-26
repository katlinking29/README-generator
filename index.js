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
          "GNU GPLv3",
          "GNU AGPLv3",  
          "MIT", 
          "ISC",
          "CCO-1.0",
          "CC-BY-4.0", 
          "CC-BY-SA-4.0", 
          "SIL Open Font License", 
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
  return `
  # ${response.title}
  
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
  ${response.questions}
  `
}

  promptUser().then(function(response) {
    //create the README file from the user's responses
      const README = generateREADME(response)

      return writeFileAsync("README.md", README)

      .then(function() {
        console.log("Successfully generated README.md");
      })
      .catch(function(err) {
        console.log(err);
      });
  })