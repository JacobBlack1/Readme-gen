const inquirer = require("inquirer");
const fs = require('fs');
let path = './README.md';
let $template = "";

//  Prompt questions
function getInfo() {
  inquirer
    .prompt([
      //Project Title
      {
        type: "input",
        message: "What is the name of your project?",
        name: "title"
      },

      //Project Description
      {
        type: "input",
        message: "Please enter in a discription for your project.",
        name: "description"
      },

      //How to Install
      {
        type: "input",
        message: "How can your code be installed?",
        name: "installation"
      },

      //Usage for Project 
      {
        type: "input",
        message: "What can your project be used for?",
        name: "usage"
      },

      //Project test
      {
        type: "input",
        message: "What are the instructions to test htis project?",
        name: "test"
      },

      //contribution
      {
        type: "input",
        message: "who else was involled in your code?",
        name: "contribution"
      },

      //licence checkbox
      {
        type: "checkbox",
        message: "Choose a licence for your project. Or choose none.",
        name: "licence",
        choices: [
          "MIT",
         "Apache", 
         "GPLv3",
         "None"
        ]
      },

      //GitHub user
      {
        type: "input",
        message: "What is your github username? ",
        name: "Github username"
      },

      //Email Address
      {
        type: "input",
        message: "What is your email Address?",
        name: "email"
      },
    ])


    // Receing a response for the answers
    .then(function (response) {
      // Forms readme template
      let licenceInfo = "";

      $template += `# ${response.name}\n\n`;


      if (response.licence === "MIT") {
        $template += `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n\n`;
        licenceInfo = '(https://opensource.org/licenses/MIT)\n\nYou have the freedom to do as you like with this permissive software, as long as an original copy and license notice is included. I cannon be held liable for this software.\n\n';
      } else if (response.licence === "Apache") {
        $template += `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n\n`;
        licenceInfo = '(http://www.apache.org/licenses/LICENSE-2.0.html)\n\nYou have the freedom to do as you like with this permissive software. This license also contains a patent license from the contributors of the code.\n\n';
      } else if (response.licence === "GPLv3") {
        $template += `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)\n\n`;
        licenceInfo = '(http://www.gnu.org/licenses/gpl-3.0.html)\n\nYou have the freedom to run, study, share, and modify this permissive software. Anyone who acquires this software must make it available to anyone else under the same licensing agreement.\n\n';
      };      
     
     
      $template += `### Table of Contents\n\n- [Description](#description)\n- [Installation](#installation)\n- [Usage](#usage)\n- [Contributing](#contributing)\n- [Testing](#testing)\n- [Questions](#questions)\n- [License](#license)\n- [Application Image](#application-image)\n\n`;
      $template += `## Description\n\n${response.description}\n\n`;
      $template += `## Installation\n\n${response.install}\n\n`;
      $template += `## Usage\n\n${response.usage}\n\n`;
      $template += `## Contributing\n\n${response.contribute}\n\n`;
      $template += `## Questions\n\nIf you have any questions feel free to contact me here:\n\n ##### Github: [github.com/${response.username}](https://github.com/${response.username})\n\n ##### Email: [${response.email}](mailto:${response.email}?subject=[GitHub])\n\n`;
      $template += `## Testing\n\n[${response.test}]\n\n`;
      $template += `## License\n\n[${response.licence}]${licenceInfo}`;
      
      
      
      // Writes the created template to README.md file
      fs.writeFile(path, $template, function (err) {
        if (err) {
          console.log(err);
       
        }

      });
    });
}

try {
  // Checks if README.md exists
  if (fs.existsSync(path)) {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Overwrite existing README.md?",
          name: "overwrite",
          choices: ["yes", "no", "cancel"]
        }])
      .then(function (response) {
        if (response.overwrite === "no") {
          path = './README-1.md';
          getInfo();
        } else if (response.overwrite === "yes") {
          getInfo();
        };
      })
  } else { getInfo(); }
} catch (err) {
  console.error(err);
}
