#!/bin/bash
sleep 1 # I don't know why I need a sleep or echo, but if I take it out xdotool commands don't run...
google-chrome --app="http://www.netflix.com/WiPlayer?movieid=70177044&trkid=7728649&tctx=-99%2C-99%2Ce418d74d-d4cf-4e50-b3cb-898db3de7f5d-36568643"
sleep 1
xdotool windowmove --sync `xdotool search --name Netflix` 1920 0
xdotool windowsize --sync `xdotool search --name Netflix` 1920 1080