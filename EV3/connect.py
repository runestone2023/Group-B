#!/usr/bin/env pybricks-micropython
import socket
import asyncio

# Port and ip to server
PORT = 8081
IP = "192.168.1.56"

# Needed for the pybricks version of asyncio
# Gives us a usable address to connect to
socket_address = socket.getaddrinfo(IP, PORT)[0][-1]


def sse_mvp():
    """
        MVP for SSE connection
        This code is not async so will only work until the robot has to do more then listen to commands
    """
    # Create a socket client
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    print("Socket created")

    # Connect to remote socket server
    client.connect(socket_address)

    print("Socket connected\n")

    handshake = "GET / HTTP/1.1\r\n\
                Cache-Control: no-cache\r\n\
                Connection: keep-alive\r\n\
                Host: {0}:{1}\r\n\r\n".format(IP, PORT).encode()
    # Tell the server that you are connected and listening
    client.send(handshake)

    # Print server response, should check what the response code is
    # If the response code is not 200 something is wrong
    print(client.recv(1024).decode())

    # Listen for events from the server
    while True:
        response = client.recv(1024)
        print(response)


def websocket_mvp():
    # Create a socket client
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    print("Socket created")

    # Connect to remote socket server
    client.connect(socket_address)

    print("Socket connected\n")

    handshake = "GET / HTTP/1.1\r\n\
    Host: {0}:{1}\r\n\
    Origin: http://example.com\r\n\
    Connection: Upgrade\r\n\
    Upgrade: websocket\r\n\
    Sec-WebSocket-Key: q4xkcO32u266gldTuKaSOw==\r\n\
    Sec-WebSocket-Version: 13\r\n\r\n".format(IP, PORT).encode()
    print(handshake.decode())
    # Tell the server that you are connected and listening
    client.send(handshake)

    # Print server response, should check what the response code is
    # If the response code is not 200 something is wrong
    print(client.recv(1024).decode())

    # while True:
    #     response = client.recv(1024)
    #     print(response)


if __name__ == "__main__":
    # sse_mvp()
    websocket_mvp()
