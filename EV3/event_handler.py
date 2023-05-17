from connect import READ_SIZE, get_response_info


class Events():
    DRIVE = "drive"
    GRAB = "grab"
    SWITCH_CONTROL = "switch"


async def event_loop(reader):
    """
        MVP for SSE connection
        This code is not async so will only work until the robot has to do more then listen to commands
    """
    # Listen for events from the server
    while True:
        # Read event as bytestring
        response = await reader.read(READ_SIZE)

        # Get event and data from bytestring
        event, data = get_response_info(response)

        if event == Events.DRIVE:
            # TODO: If data 1 or -1 is given drive until 0 is received?
            print("Drive in {}, direction".format(data))
            pass
        elif event == Events.GRAB:
            # TODO: Call function to grab or release depending on data
            print("Grab or release {}".format(data))
            pass
        elif event == Events.SWITCH_CONTROL:
            # TODO: Switch to mode specified by data
            print("Switch to {} control".format(data))
            pass
        else:
            print("Invalid event: {}".format(event))
