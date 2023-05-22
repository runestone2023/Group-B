#!/usr/bin/env pybricks-micropython
# from robot_init import (
#     ev3,
#     gripper_motor,
#     robot,
#     color_sensor,
#     area_sensor,
#     obstacle_sensor,
#     speed,
# )
from event_handler import event_loop
from connect import sse_connect

# # import uasyncio
# from pybricks.tools import wait
# from pybricks.parameters import Stop, Color


# # Set the speed and turn rate of the robot
# speedmod = 50
# turn_ratemod = 20


# ev3.speaker.beep()

# global current_color
# current_color = Color.WHITE

# gripper_motor.run_until_stalled(-speed, then=Stop.HOLD, duty_limit=50)
# gripper_motor.reset_angle(0)

# gripper_motor.run_target(speed, 180)
# while True:
#     # gripper_motor.reset_angle(0)
#     while color_sensor.color() != Color.WHITE:
#         robot.drive(100, 0)
#         while obstacle_sensor.distance() > 300 and color_sensor.color() != Color.WHITE:
#             wait(10)
#             # # Drive backward for 100 millimeters.
#         if color_sensor.color() != Color.WHITE:
#             robot.straight(-100)
#             robot.turn(90)

#     robot.stop()
#     gripper_motor.run_until_stalled(-speed, duty_limit=50)
#     while area_sensor.color() != Color.WHITE:
#         robot.drive(100, 0)
#         while obstacle_sensor.distance() > 300 and area_sensor.color() != Color.WHITE:
#             wait(10)
#         if area_sensor.color() != Color.WHITE:
#             robot.straight(-100)
#             robot.turn(90)
#     robot.stop()
#     gripper_motor.run_target(speed, 180)
#     robot.straight(-100)
#     robot.turn(180)


if __name__ == "__main__":
    # Create event loop
    # loop = uasyncio.new_event_loop()

    # # Create connection to server and get reader
    # reader = uasyncio.run(sse_connect())

    # # Add the event handler to the event loop
    # loop.create_task(event_loop(reader))

    # # Run event loop forever
    # loop.run_forever()

    reader = sse_connect()

    event_loop(reader)
