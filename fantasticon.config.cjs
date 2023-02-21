const manifest = require("./package.json")
const codepoints = require("./src/template/mapping.json")

module.exports = {
  name: "devicons",
  prefix: "devicon",
  codepoints: codepoints,
  inputDir: "./src/icons",
  outputDir: "./dist",
  fontTypes: ["ttf", "woff", "woff2"],
  assetTypes: ["json", "html"],
  normalize: true,
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
