#!/usr/bin/env bash
sha=$(git rev-parse HEAD:material-icons)

open https://github.com/PKief/vscode-material-icon-theme/compare/$sha..main
git submodule update --remote
