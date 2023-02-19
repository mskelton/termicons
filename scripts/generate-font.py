import os
import csv
import fontforge

version = "1.0.0"
font_name = "devicons"
start_codepoint = 0xEC00
output_dir = "dist"

font = fontforge.font()
font.fontname = font_name
font.familyname = font_name
font.fullname = font_name
font.encoding = "UnicodeFull"
font.em = 1024

font.sfntRevision = None  # Auto-set (refreshed) by fontforge
font.version = version
font.copyright = "Mark Skelton"

en = "English (US)"
font.appendSFNTName(en, "Version", version)
font.appendSFNTName(en, "Vendor URL", "https://github.com/mskelton/devicons")
font.appendSFNTName(en, "Copyright", "Mark Skelton")

# Add valid space glyph to avoid "unknown character" box on IE11
glyph = font.createChar(32)
glyph.width = 200


def add_icon(offset: int, file_path: str, name: str):
    glyph = font.createChar(start_codepoint + offset, name)
    glyph.importOutlines(file_path)
    glyph.left_side_bearing = 0
    glyph.right_side_bearing = 0


def get_name(file_path: str):
    return "i_" + os.path.basename(file_path).replace(".svg", "").replace("-", "_")


with open("icons.csv") as file:
    for icon in csv.reader(file):
        add_icon(int(icon[0]), icon[1], get_name(icon[1]))

# font.generate(os.path.join(output_dir, font_name + ".otf"))
