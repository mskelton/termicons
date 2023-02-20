import os
import json
import csv
import fontforge
import psMat

version = "1.0.0"
font_name = "devicons"
start_codepoint = 0xD000
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

font.autoWidth(0, 0, font.em)

manifest = {"icons": []}


def width_from_bb(bb):
    return bb[2] - bb[0]


def height_from_bb(bb):
    return bb[3] - bb[1]


def calc_shift(left1, width1, left2, width2):
    """Calculate shift needed to center '2' in '1'"""
    return width1 / 2 + left1 - width2 / 2 - left2


def add_icon(codepoint: int, file_path: str, name: str):
    glyph = font.createChar( codepoint, name)
    glyph.importOutlines(file_path)

    d_bb = [120, 0, 1000 - 120, 900]  # just some nice sizes
    g_bb = glyph.boundingBox()

    scale_x = width_from_bb(d_bb) / width_from_bb(g_bb)
    scale_y = height_from_bb(d_bb) / height_from_bb(g_bb)
    scale = scale_y if scale_y < scale_x else scale_x
    glyph.transform(psMat.scale(scale, scale))

    g_bb = glyph.boundingBox()  # re-get after scaling (rounding errors)
    glyph.transform(
        psMat.translate(
            calc_shift(d_bb[0], width_from_bb(d_bb), g_bb[0], width_from_bb(g_bb)),
            calc_shift(d_bb[1], height_from_bb(d_bb), g_bb[1], height_from_bb(g_bb)),
        )
    )

    glyph.width = int(d_bb[2] + d_bb[0])
    glyph.manualHints = True


def get_name(file_path: str):
    return os.path.basename(file_path).replace(".svg", "").replace("_", "-")


with open("icons.csv") as file:
    for icon in csv.reader(file):
        if not icon:
            print("Found blank line, exiting.")
            break

        codepoint = start_codepoint +int(icon[0])
        name = icon[2] if len(icon) > 2 else get_name(icon[1])

        add_icon(codepoint, icon[1], name)
        manifest["icons"].append({
            "name": name,
            "codepoint": codepoint,
        })

font.generate(os.path.join(output_dir, font_name + ".otf"))
font.generate(os.path.join(output_dir, font_name + ".woff"))
font.generate(os.path.join(output_dir, font_name + ".woff2"))

with open(os.path.join(output_dir, "manifest.json"), "w") as file:
    json.dump(manifest, file)
