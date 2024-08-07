import os from "node:os"
import fs from "node:fs/promises"
import { generateFonts } from "fantasticon"
import manifest from "../package.json" with { type: "json" }
import codepoints from "../src/template/mapping.json" with { type: "json" }
import overrides from "../src/template/overrides.json" with { type: "json" }

// The list of codepoints in the mapping file are not necessarily sorted
// alphabetically, so we need to post process it.
const sortedCodepoints = Object.fromEntries(
  Object.entries(codepoints).sort((a, b) => a[0].localeCompare(b[0])),
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
      url: manifest.homepage,
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

function formatCodepoint(key) {
  return "U+" + codepoints[key].toString(16).toUpperCase()
}

// Update the codepoint range in the readme
async function updateReadme() {
  const url = new URL("../README.md", import.meta.url)
  const original = await fs.readFile(url, "utf-8")

  const keys = Object.keys(codepoints)
  const start = formatCodepoint(keys[0])
  const end = formatCodepoint(keys.at(-1))

  const updated = original.replace(
    /symbol_map.*/,
    `symbol_map ${start}-${end} termicons`,
  )

  await fs.writeFile(url, updated)
}

// Read the mappings from the vscode extension to automatically get their matches
async function readMappings() {
  const mod = await import("../material-icons/src/core/icons/fileIcons.ts")
  return mod.fileIcons.icons
}

const sourceMappings = await readMappings()

function mapIcon(key, codepoint, color) {
  const source = sourceMappings.find((m) => m.name === key)

  return {
    codepoint,
    color,
    enabledFor: source?.enabledFor ?? [],
    filenames: source?.fileNames ?? [],
    extensions: source?.fileExtensions ?? [],
  }
}

// Add additional metadata to the JSON file
async function updateJSON() {
  const json = JSON.parse(res.assetsOut.json)
  const promises = Object.entries(json).map(async ([key, codepoint]) => [
    key,
    mapIcon(key, codepoint, await inferColor(key)),
  ])

  const mappings = Object.fromEntries(await Promise.all(promises))

  // Add any overrides to the list of mappings. Overrides use the same icons but
  // with a different color. This is useful to include in the JSON file to
  // include filename/extension mappings from the vscode extension.
  Object.entries(overrides).forEach(([key, meta]) => {
    const mapping = mapIcon(key, codepoints[meta.icon], meta.color)

    if (!mapping.extensions.length && !mapping.filenames.length) {
      console.warn(`WARN: No filename/extension mappings found for ${key}`)
    }

    mappings[key.replace(/_/g, "-")] = mapping
  })

  // Sort the mappings alphabetically
  const sortedMappings = Object.fromEntries(Object.entries(mappings).sort())

  // Write the mappings to the output JSON file
  const jsonURL = new URL("../dist/termicons.json", import.meta.url)
  await fs.writeFile(jsonURL, JSON.stringify(sortedMappings, null, 2))
}

// Copy the font to the user's font directory
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
