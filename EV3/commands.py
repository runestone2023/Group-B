from robot_init import gripper_motor, robot, speed
from pybricks.parameters import Stop

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
        robot.drive(-100)
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


