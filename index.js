const inquirer = require("inquirer");
const fs = require('fs');
let path = './README.md';
let $template = "";

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

// Creates inquirer questions
function getInfo() {
  inquirer
    .prompt([
      //Title
      {
        type: "input",
        message: "What is your projects name?",
        name: "title"
      },
      //description
      {
        type: "input",
        message: "Enter a description for your project.",
        name: "description"
      },
      //installation
      {
        type: "input",
        message: "What are the instructions to install this project. Enter None if their aren't any.",
        name: "installation"
      },
      //Usage
      {
        type: "input",
        message: "How is your project used",
        name: "usage"
      },
      //test
      {
        type: "input",
        message: "What are the Test instuctions?",
        name: "test"
      },
      //contribution
      {
        type: "input",
        message: "How can this code be tested?",
        name: "test"
      },
      //checkbox
      {
        type: "checkbox",
        message: "select a licence",
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
        message: " your Github username_______",
        name: "username"
      },
      //Email
      {
        type: "input",
        message: "your email address?",
        name: "email"
      },
    ])
    // Receives response from questions
    .then(function (response) {
      // Creates the template for the readme
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
      $template += `## Application Image\n\n ![Image of Application](${response.image})`;
      // Writes the created template to README.md file
      fs.writeFile(path, $template, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });

}
