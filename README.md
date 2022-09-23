# [Fun Project] - Image to Audio

This is an experimental project that aims to transform an image into an audio output using Javascript.

#  How it works?

It reads the image and for every pixel (rgba) it extracts the mean value and creates a (1) 2D array of pixel mean values.

Given the total amount of time we want to play the song (more time, more samples), we extract
a sample value from (1) and use it as a frequency into the oscillator.
