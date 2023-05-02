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
import socket


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


# Connection
def sse_mvp():
    """
    MVP for SSE connection
    This code is not async so will only work until the robot has to do more then listen to commands
    """

    # Needed for the pybricks version of asyncio
    # Gives us a usable address to connect to
    socket_address = socket.getaddrinfo("172.20.10.3", 8081)[0][-1]

    # Create a socket client
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    print("Socket created")

    # Connect to remote socket server
    client.connect(socket_address)

    print("Socket connected\n")

    handshake = b"GET / HTTP/1.1\r\n\
                   Cache-Control: no-cache\r\n\
                   Connection: keep-alive\r\n\
                   Accept: */*\r\n\
                   Host: 192.168.1.56:8081\r\n\r\n"
    # Tell the server that you are connected and listening
    client.send(handshake)

    # Print server response, should check what the response code is
    # If the response code is not 200 something is wrong
    print(client.recv(1024).decode())

    # Listen for events from the server
    while True:
        response = client.recv(1024)
        print(response)
        ev3.speaker.beep()


if __name__ == "__main__":
    sse_mvp()


sse_mvp()
