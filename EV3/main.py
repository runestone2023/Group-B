#!/usr/bin/env pybricks-micropython
from pybricks.hubs import EV3Brick
from pybricks.ev3devices import Motor, UltrasonicSensor, ColorSensor
from pybricks.parameters import Port, Stop, Color
from pybricks.robotics import DriveBase
from pybricks.tools import wait

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

# Control the robot with user input from the terminal
print("Use the following keys to control the robot:")
print("w: move forward")
print("s: move backward")
print("a: turn left")
print("d: turn right")
print("e: stop")
print("q: quit")

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

    # # Red
    # elif color_sensor.color() == Color.RED:
    #     ev3.screen.clear()
    #     ev3.screen.draw_text(50, 50, "Red", Color.BLACK, Color.WHITE)
    #     current_color = Color.RED

    # # Blue
    # elif color_sensor.color() == Color.BLUE:
    #     ev3.screen.clear()
    #     ev3.screen.draw_text(50, 50, "Blue", Color.BLACK, Color.WHITE)
    #     current_color = Color.BLUE

    # # Black
    # elif color_sensor.color() == Color.BLACK:
    #     ev3.screen.clear()
    #     ev3.screen.draw_text(50, 50, "Black", Color.BLACK, Color.WHITE)
    #     current_color = Color.BLACK

    # White

    # if color_sensor.color() == Color.WHITE:
    #     robot.stop()
    #     ev3.screen.clear()
    #     ev3.screen.draw_text(50, 50, "White", Color.BLACK, Color.WHITE)
    #     current_color = Color.WHITE
    #     # for count in range(10):
    #     gripper_motor.run_until_stalled(-speed, duty_limit=50)
    #     # gripper_motor.run_target(speed, 50)
    #     while True:
    #         robot.drive(25, 0)

# robot.Stop()
# speed = 200
# for count in range(10):
#     gripper_motor.run_until_stalled(-speed, duty_limit=90)
#     gripper_motor.run_target(speed, 50)
# gripper_motor.run_until_stalled(-200, duty_limit=10)
# wait(50)
# gripper_motor.reset_angle(200)
# gripper_motor.run_target(200, -90)
# gripper_motor.run_until_stalled(-200, then=Stop.HOLD, duty_limit=50)
# gripper_motor.run_target(200, 90)
# wait(50)
# Begin driving forward at 200 millimeters per second.
# robot.drive(200, 0)

# Wait until an obstacle is detected. This is done by repeatedly
# doing nothing (waiting for 10 milliseconds) while the measured
# distance is still greater than 300 mm.
# robot.drive(200, 0)
# while obstacle_sensor.distance() > 300:
#     wait(10)

# # Drive backward for 100 millimeters.
# robot.straight(-100)

# # Turn around by 90 degrees
# robot.turn(90)
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
