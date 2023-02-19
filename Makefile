build:
	python3 scripts/generate-font.py

tidy:
	black scripts/generate-font.py
