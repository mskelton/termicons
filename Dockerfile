FROM python:3.11

# Install fontforge
RUN apt-get update && \
    apt-get install -y fontforge

# Create a working directory
WORKDIR /work

# Copy the source code
COPY ./scripts /work/scripts
COPY ./svgs /work/svgs
COPY ./icons.csv /work/icons.csv

# Generate the font
RUN python ./scripts/generate-font.py
