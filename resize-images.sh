#!/bin/bash

# Go to the directory containing images
cd ./public/vdh

# Resize all AVIF files to 300px width
for file in *.avif; do
    if [ -f "$file" ]; then
        magick "$file" -resize 200x "$file"
        echo "Resized $file"
    fi
done