#!/usr/bin/env pybricks-micropython
from pybricks.hubs import EV3Brick
from pybricks.ev3devices import (
    Motor,
    TouchSensor,
    ColorSensor,
    InfraredSensor,
    UltrasonicSensor,
    GyroSensor,
)
from pybricks.parameters import Port, Stop, Direction, Button, Color
from pybricks.tools import wait, StopWatch, DataLog
from pybricks.robotics import DriveBase
from pybricks.media.ev3dev import SoundFile, ImageFile
import uasyncio
from connect import sse_connect
from event_handler import event_loop


# This program requires LEGO EV3 MicroPython v2.0 or higher.
# Click "Open user guide" on the EV3 extension tab for more information.

# Create your objects here.
ev3 = EV3Brick()

left_motor = Motor(port=Port.B)
right_motor = Motor(port=Port.C)

# gripper_motor = Motor(Port.A)
# Create a DriveBase object
robot = DriveBase(left_motor, right_motor, wheel_diameter=35, axle_track=192.5)

# Set the speed and turn rate of the robot
speedmod = 50
turn_ratemod = 20

# Write your program here.
(distance, speed, angle, turn_rate) = robot.state()
# robot.drive(speed + speedmod, 0)


if __name__ == "__main__":
    # Create event loop
    loop = uasyncio.new_event_loop()

    # Create connection to server and get reader
    reader = uasyncio.run(sse_connect())

    # Add the event handler to the event loop
    loop.create_task(event_loop(reader))

    # Run event loop forever
    loop.run_forever()
