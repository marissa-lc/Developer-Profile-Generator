const fs = require('fs');
const inquirer = require("inquirer");
const util = require("util");
const convertFactory = require("electron-html-to");
const electron = require("electron");
const axios = require("axios");
const generateHTML = require("./generateHTML");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);


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

promptUser().then((data) => {
  const queryUrl = `https://api.github.com/users/${data.github}`;
  const starsUrl = `https://api.github.com/users/${data.github}/starred`;

  axios.get(queryUrl).then((res) => {
  axios.get(starsUrl).then((stars) => {
  
      html = generateHTML(data, res, stars);
    writeFileAsync("index.html", html);
    }).then(() => {
      readFileAsync("index.html", "utf8").then(html); {
        const conversion = convertFactory({
          converterPath: convertFactory.converters.PDF,
          allowLocalFileAccess: true
        });

            conversion({ html: html}, function(err, result) {
            if(err) {
            return console.error(err);
      }
        console.log(result.logs);
        console.log(result.numberOfPages);
        result.stream.pipe(fs.createWriteStream('github-portfolio.pdf'));
        conversion.kill();
    });
  }
}).catch(function(err) {
  console.log(err)
})

})
});
