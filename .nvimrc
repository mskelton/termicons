augroup termicons
  au!
  au BufWritePost *.svg silent %s/\s\+\(\(width\|height\)=".\{-\}"\|fill="none"\)\n//e
augroup END
