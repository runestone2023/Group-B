#!/usr/bin/env pybricks-micropython
from pybricks.hubs import EV3Brick
from pybricks.ev3devices import Motor, UltrasonicSensor
from pybricks.parameters import Port, Stop
from pybricks.robotics import DriveBase
from pybricks.tools import wait

# Initialize the EV3 Brick and Motors
ev3 = EV3Brick()
left_motor = Motor(port=Port.B)
right_motor = Motor(port=Port.C)

obstacle_sensor = UltrasonicSensor(Port.S4)
gripper_motor = Motor(Port.A)

# Create a DriveBase object
robot = DriveBase(left_motor, right_motor, wheel_diameter=35, axle_track=192.5)

# Set the speed and turn rate of the robot
speedmod = 50
turn_ratemod = 20

# Control the robot with user input from the terminal
print("Use the following keys to control the robot:")
print("w: move forward")
print("s: move backward")
print("a: turn left")
print("d: turn right")
print("e: stop")
print("q: quit")

ev3.speaker.beep()

while True:
    gripper_motor.run_until_stalled(-200, then=Stop.COAST, duty_limit=50)
    gripper_motor.reset_angle(0)
    gripper_motor.run_target(200, -90)
    gripper_motor.run_until_stalled(-200, then=Stop.HOLD, duty_limit=50)
    gripper_motor.run_target(200, 90)
    # Begin driving forward at 200 millimeters per second.
    # robot.drive(200, 0)

    # Wait until an obstacle is detected. This is done by repeatedly
    # doing nothing (waiting for 10 milliseconds) while the measured
    # distance is still greater than 300 mm.
    # while obstacle_sensor.distance() > 300:
    # wait(10)

    # Drive backward for 300 millimeters.
    # robot.straight(-300)

    # Turn around by 120 degrees
    # robot.turn(120)
    # Read user input from the terminal
    # command = input("> ")

    # (distance, speed, angle, turn_rate) = robot.state()

    # # Interpret the user input and control the robot
    # if command == "w":
    #     robot.drive(speed + speedmod, 0)
    # elif command == "s":
    #     robot.drive(speed - speedmod, 0)
    # elif command == "a":
    #     robot.drive(speed, turn_rate + turn_ratemod)
    # elif command == "d":
    #     robot.drive(speed, turn_rate - turn_ratemod)
    # elif command == "e":
    #     robot.stop()
    # elif command == "q":
    #     break
    # else:
    #     print("Invalid command. Use w, s, a, d, or q.")
    #     continue

    # Stop the robot if no keys are pressed
    # robot.stop()
