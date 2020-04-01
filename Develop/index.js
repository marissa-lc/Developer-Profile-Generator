var generate = require('./generateHTML');
var fs = require('fs');
const inquirer = require("inquirer");

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "please enter your github username"
        },
        {
            type: "list",
            name: "color",
            message: "pick a color",
            choices: [
                "green",
                "blue",
                "pink",
                "red"
            ]
        }
    ]);
}

promptUser();

function init() {
    var htmlfile = generate({color: "green"});
    fs.writeFile('index.html', htmlfile, function() {
        
    });
}
init();
