#!/usr/bin/env pybricks-micropython

from event_handler import event_loop
from connect import sse_connect


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
