#!/bin/bash

# cleanup
rm render.mp4

# render
# casperjs render.js stdout | ffmpeg -y -c:v png -f image2pipe -r 25 -i - -c:v libx264 -pix_fmt yuv420p -movflags +faststart -t 10 render.mp4
casperjs render.js files
ffmpeg -start_number 10 -i frames/frame%02d.png -c:v libx264 -r 25 -pix_fmt yuv420p render.mp4
open render.mp4