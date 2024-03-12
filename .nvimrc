augroup termicons
  au!
  au BufWritePost *.svg silent %s/\s\+\(\(width\|height\)=".\{-\}"\|fill="none"\)\n//e
augroup END

lua << EOF

vim.keymap.set("n", ",f", ":%d|put+<cr>", {
	desc = "Replace file",
})

vim.keymap.set("n", ",g", ":norm yae<cr>", {
	desc = "Yank file file",
})

EOF
