const fs = require("fs");
const inquirer = require("inquirer");

inquirer
  .prompt([
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
        type: "checkbox",
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
  .then(function(response) {

    console.log(response.title, response.description, response.installation, response.usage, response.contributions, response.test, response.license, response.username, response.email)
  });
