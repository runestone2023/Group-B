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


# Initialize the EV3 Brick and Motors
ev3 = EV3Brick()
left_motor = Motor(port=Port.B)
right_motor = Motor(port=Port.C)


obstacle_sensor = UltrasonicSensor(Port.S4)
gripper_motor = Motor(Port.D)
color_sensor = ColorSensor(Port.S3)
area_sensor = ColorSensor(Port.S2)

# Create a DriveBase object
robot = DriveBase(left_motor, right_motor, wheel_diameter=56, axle_track=100)


# Set the speed and turn rate of the robot
speedmod = 50
turn_ratemod = 20


ev3.speaker.beep()

global current_color
current_color = Color.WHITE
speed = 200
gripper_motor.run_until_stalled(-speed, then=Stop.HOLD, duty_limit=50)
gripper_motor.reset_angle(0)
gripper_motor.run_target(speed, 180)
while True:
    # gripper_motor.reset_angle(0)
    while color_sensor.color() != Color.WHITE:
        robot.drive(100, 0)
        while obstacle_sensor.distance() > 300 and color_sensor.color() != Color.WHITE:
            wait(10)
            # # Drive backward for 100 millimeters.
        if color_sensor.color() != Color.WHITE:
            robot.straight(-100)
            robot.turn(90)

    robot.stop()
    gripper_motor.run_until_stalled(-speed, duty_limit=50)
    while area_sensor.color() != Color.WHITE:
        robot.drive(100, 0)
        while obstacle_sensor.distance() > 300 and area_sensor.color() != Color.WHITE:
            wait(10)
        if area_sensor.color() != Color.WHITE:
            robot.straight(-100)
            robot.turn(90)
    robot.stop()
    gripper_motor.run_target(speed, 180)
    robot.straight(-100)
    robot.turn(180)



if __name__ == "__main__":
    # Create event loop
    loop = uasyncio.new_event_loop()

    # Create connection to server and get reader
    reader = uasyncio.run(sse_connect())

    # Add the event handler to the event loop
    loop.create_task(event_loop(reader))

    # Run event loop forever
    loop.run_forever()
