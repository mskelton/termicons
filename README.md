# termicons

Material style icons optimized for terminal rendering

## Installation

Download the latest release of the font from the
[releases page](https://github.com/mskelton/termicons/releases).

### Kitty

To setup termicons with [Kitty], add the following to your `kitty.conf` file.

```kitty
symbol_map U+D000-U+D17F termicons
```

_Note: As new icons are added, the end codepoint will change, so ensure you
check the README when updating to the latest version to ensure you have the
latest end codepoint in your Kitty config._
