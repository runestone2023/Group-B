#!/usr/bin/env pybricks-micropython
from pybricks.hubs import EV3Brick
from pybricks.ev3devices import (
    Motor,
    ColorSensor,
    UltrasonicSensor,
)
from pybricks.parameters import Port
from pybricks.robotics import DriveBase


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
speed = 200
