#!/usr/bin/env pybricks-micropython
import socket
import asyncio


def sse_mvp():
    """
        MVP for SSE connection
        This code is not async so will only work until the robot has to do more then listen to commands
    """

    # Needed for the pybricks version of asyncio
    # Gives us a usable address to connect to
    socket_address = socket.getaddrinfo("192.168.1.56", 8081)[0][-1]

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


if __name__ == "__main__":
    sse_mvp()
