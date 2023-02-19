import os
import csv
import fontforge

version = "1.0.0"
font_name = "devicons"
start_codepoint = 0xFE00
output_dir = "dist"

font = fontforge.font()
font.fontname = font_name
font.familyname = font_name
font.fullname = font_name
font.encoding = "UnicodeFull"
font.em = 512

font.version = version
font.copyright = "Mark Skelton"

en = "English (US)"
font.appendSFNTName(en, "Version", version)
font.appendSFNTName(en, "Vendor URL", "https://github.com/mskelton/devicons")
font.appendSFNTName(en, "Copyright", "Mark Skelton")

# font.autoWidth(0, 0, font.em)

# Add valid space glyph to avoid "unknown character" box on IE11
glyph = font.createChar(32)
glyph.width = 200

output_info = {
    "em": font.em,
    "icons": {},
}

def addIcon(icon):
    name = icon["name"]

    glyph = font.createChar(int(icon["codepoint"]), name)
    glyph.importOutlines(
        os.path.join("svgs", (name + ".svg")),
    )
    glyph.left_side_bearing = 0
    glyph.right_side_bearing = 0

    output_info["icons"]["i_" + name] = {
        "width": glyph.width,
    }


with open("icons.csv") as file:
    for icon in csv.DictReader(file):
        addIcon(icon)

font.generate(os.path.join(output_dir, font_name + ".otf"))
