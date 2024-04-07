# termicons

Material style icons optimized for terminal rendering

## Installation

Download the latest release of the font
[here](https://termicons.mskelton.dev/termicons.ttf) and install using your
system font manager.

### Kitty

To setup termicons with [Kitty](https://sw.kovidgoyal.net/kitty), add the
following to your `kitty.conf` file.

```kitty
symbol_map U+D000-U+D1C6 termicons
```

_Note: As new icons are added, the end codepoint will change, so ensure you
check the README when updating to the latest version to ensure you have the
latest end codepoint in your Kitty config._

### iTerm

Usage of termicons in iTerm is limited given that iTerm only supports a single
"non-ASCII" font. If you don't already have a "non-ASCII" font specified in your
iTerm preferences, set it to "termicons". Sadly, termicons does not support
patched fonts, so this does not work alongside an existing "non-ASCII" font.

### Neovim

For an alternative set of icons for
[nvim-web-devicons](https://github.com/nvim-tree/nvim-web-devicons) you can use
the [termicons.nvim](https://github.com/mskelton/termicons.nvim) plugin for
Neovim which will use termicons for file icons.
