# termicons

Material style icons optimized for terminal rendering

## Installation

Download the latest release of the font
[here](https://mskelton.dev/termicons/termicons.ttf) and install using your
system font manager.

### Kitty

To setup termicons with [Kitty], add the following to your `kitty.conf` file.

```kitty
symbol_map U+D000-U+D1AC termicons
```

_Note: As new icons are added, the end codepoint will change, so ensure you
check the README when updating to the latest version to ensure you have the
latest end codepoint in your Kitty config._

### Neovim

For an alternative set of icons for
[nvim-web-devicons](https://github.com/nvim-tree/nvim-web-devicons) you can use
the [termicons.nvim](https://github.com/mskelton/termicons.nvim) plugin for
Neovim which will use termicons for file icons.
