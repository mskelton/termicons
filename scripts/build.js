import fs from "node:fs/promises"
import os from "node:os"
import { generateFonts } from "fantasticon"
import manifest from "../package.json" assert { type: "json" }
import codepoints from "../src/template/mapping.json" assert { type: "json" }

// The list of codepoints in the mapping file are not necessarily sorted
// alphabetically, so we need to post process it.
const sortedCodepoints = Object.fromEntries(
  Object.entries(codepoints).sort((a, b) => a[0].localeCompare(b[0]))
)

const res = await generateFonts({
  name: "termicons",
  prefix: "termicon",
  codepoints: sortedCodepoints,
  inputDir: "./src/icons",
  outputDir: "./dist",
  fontTypes: ["ttf", "woff", "woff2"],
  assetTypes: ["json", "html"],
  normalize: true,
  descent: 50,
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

function hexFormat(value) {
  return value.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => {
    return "#" + r + r + g + g + b + b
  })
}

async function inferColor(key) {
  const content = await fs.readFile(`./src/icons/${key}.svg`, "utf-8")
  const match = content.match(/fill="(#[a-f\d]{3,6})/i)
  const value = match?.[1] ?? "#ffffff"

  if (!match) {
    console.warn(`WARN: No fill color found for ${key}`)
  }

  return hexFormat(value.toLowerCase())
}

// Update the codepoint range in the readme
async function updateReadme() {
  const url = new URL("../README.md", import.meta.url)
  const original = await fs.readFile(url, "utf-8")

  const endCodepoint = codepoints[Object.keys(codepoints).pop()]
    .toString(16)
    .toUpperCase()

  const updated = original.replace(
    /symbol_map.*/,
    `symbol_map U+D000-U+${endCodepoint} termicons`
  )

  await fs.writeFile(url, updated)
}

// Read the mappings from the vscode extension to automatically get their matches
async function readMappings() {
  const url = new URL(
    "../material-icons/src/icons/fileIcons.ts",
    import.meta.url
  )

  // The vscode extension is written in TypeScript, so we have to do some
  // transformation to properly read it.
  const content = (await fs.readFile(url, "utf-8"))
    .replace("export const fileIcons", "global.fileIcons")
    .replace(/import.*/g, "")
    .replace(": FileIcons", "")
    .replace(/IconPack\.([A-Za-z]+)/g, '"$1"')

  // This is probably the first time I've ever used eval and felt right about it :)
  eval(content)

  return fileIcons.icons
}

// Add additional metadata to the JSON file
async function updateJSON() {
  const sourceMappings = await readMappings()
  const json = JSON.parse(res.assetsOut.json)
  const promises = Object.entries(json).map(async ([key, codepoint]) => {
    const source = sourceMappings.find((m) => m.name === key)
    const color = await inferColor(key)

    return [
      key,
      {
        codepoint,
        color,
        filenames: source?.fileNames ?? [],
        extensions: source?.fileExtensions ?? [],
      },
    ]
  })

  const mappings = Object.fromEntries(await Promise.all(promises))
  const jsonURL = new URL("../dist/termicons.json", import.meta.url)
  await fs.writeFile(jsonURL, JSON.stringify(mappings, null, 2))
}

async function copyFont() {
  const source = new URL("../dist/termicons.ttf", import.meta.url)
  const dest = new URL(`file://${os.homedir()}/Library/Fonts/termicons.ttf`)

  await fs.copyFile(source, dest)
}

await updateJSON()
await updateReadme()

if (process.argv.includes("--dev")) {
  await copyFont()
}
