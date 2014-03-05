#!/bin/bash
sleep 1 # I don't know why I need a sleep or echo, but if I take it out xdotool commands don't run...
google-chrome --app="http://www.netflix.com/WiPlayer?movieid=70155569&trkid=13630398&tctx=0%2C0%2Ca4960444-a564-40c7-a52b-d0e10a92c2ed-4271837"
sleep 1
xdotool windowmove --sync `xdotool search --name Netflix` 1920 0
xdotool windowsize --sync `xdotool search --name Netflix` 1920 1080