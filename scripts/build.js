import fs from "node:fs/promises"
import { generateFonts } from "fantasticon"
import { default as Hex } from "hex-format"
import manifest from "../package.json" assert { type: "json" }
import codepoints from "../src/template/mapping.json" assert { type: "json" }

const res = await generateFonts({
  name: "termicons",
  prefix: "termicon",
  codepoints: codepoints,
  inputDir: "./src/icons",
  outputDir: "./dist",
  fontTypes: ["ttf", "woff", "woff2"],
  assetTypes: ["json", "html"],
  normalize: true,
  descent: 55,
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
})

const hex = new Hex.default()

async function inferColor(key) {
  const content = await fs.readFile(`./src/icons/${key}.svg`, "utf-8")
  const match = content.match(/fill[:=]\s?"?(#[A-z\d]{3,6})/)
  const value = match?.[1] ?? "#ffffff"

  return hex.format(value).toLowerCase()
}

// Add additional metadata to the JSON file
const json = JSON.parse(res.assetsOut.json)
const promises = Object.entries(json).map(async ([key, codepoint]) => {
  const color = await inferColor(key)

  return [key, { codepoint, color }]
})

const mappings = Object.fromEntries(await Promise.all(promises))
const jsonURL = new URL("../dist/termicons.json", import.meta.url)
await fs.writeFile(jsonURL, JSON.stringify(mappings, null, 2))
