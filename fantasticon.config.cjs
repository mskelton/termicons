const manifest = require("./package.json")
const codepoints = require("./src/template/mapping.json")

/** @type import('fantasticon').RunnerOptions */
module.exports = {
  name: "termicons",
  prefix: "termicon",
  codepoints: codepoints,
  inputDir: "./src/icons",
  outputDir: "./dist",
  fontTypes: ["ttf", "woff", "woff2"],
  assetTypes: ["json", "html"],
  normalize: true,
  // descent: 55,
  templates: {
    html: "src/template/preview.hbs",
  },
  pathOptions: {
    html: "dist/index.html",
  },
  formatOptions: {
    ttf: {
      url: manifest.url,
      description: manifest.description,
      version: manifest.fontVersion,
    },
  },
}
