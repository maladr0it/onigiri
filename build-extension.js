const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

const hostName = process.argv[2];

const templateData = { hostName };
const srcDir = path.resolve(__dirname, "src", "extension");
const buildDir = path.resolve(__dirname, "build", "extension");

async function makeTemplate(inputPath, templateData) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(inputPath, templateData, (err, html) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
}

(async function() {
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }

  const html = await makeTemplate(srcDir + "/popup.ejs", templateData);
  fs.writeFileSync(buildDir + "/popup.html", html);
  fs.copyFileSync(srcDir + "/manifest.json", buildDir + "/manifest.json");
  fs.copyFileSync(srcDir + "/bg.html", buildDir + "/bg.html");
})();
