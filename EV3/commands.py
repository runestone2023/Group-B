#!/usr/bin/env pybricks-micropython
from robot_init import gripper_motor, robot, speed, color_sensor, obstacle_sensor, area_sensor
from pybricks.parameters import Stop, Color
from pybricks.tools import wait


def forward():
    robot.drive(100, 0)


def stop():
    robot.stop()


def back():
    robot.drive(-100, 0)


def right():
    robot.turn(90)


def left():
    robot.turn(-90)


def close():
    gripper_motor.run_until_stalled(-speed, then=Stop.HOLD, duty_limit=50)


def open():
    gripper_motor.run_until_stalled(-speed, then=Stop.HOLD, duty_limit=50)
    gripper_motor.reset_angle(0)
    gripper_motor.run_target(speed, 180)


def drive(data):
    if data == 1:
        robot.drive(100, 0)
    elif data == -1:
        robot.drive(-100, 0)
    elif data == 0:
        robot.stop()
    elif data == 2:
        robot.turn(90)
    elif data == -2:
        robot.turn(-90)


def grab(data):
    if data == 1:
        gripper_motor.run_until_stalled(-speed, then=Stop.HOLD, duty_limit=50)
    else:
        gripper_motor.run_until_stalled(-speed, then=Stop.HOLD, duty_limit=50)
        gripper_motor.reset_angle(0)
        gripper_motor.run_target(speed, 180)

def auto():
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
