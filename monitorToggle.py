#!/usr/bin/env python
import serial, sys
from time import sleep

SERIAL_PORT = '/dev/ttyACM0'
SERIAL_RATE = 9600

ser = serial.Serial(SERIAL_PORT, SERIAL_RATE)
sleep(2)
ser.write('m')
