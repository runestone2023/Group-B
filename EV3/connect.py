
import socket
import uasyncio

# Port and ip to server
PORT = 8081
IP = "192.168.1.56"
READ_SIZE = 1024


async def sse_connect():
    """
        Create a connection to the server

        Returns: Reader to socket
    """
    print("Waiting for connection")

    # Connect to remote socket server
    reader, writer = await uasyncio.open_connection(IP, PORT)

    print("Socket connected")

    connect_request = "GET / HTTP/1.1\r\n\
                Cache-Control: no-cache\r\n\
                Connection: keep-alive\r\n\
                Host: {0}:{1}\r\n\r\n".format(IP, PORT).encode()
    # Tell the server that you are connected and listening
    writer.write(connect_request)
    writer.drain()

    print("Connection request sent")

    # Print server response, should check what the response code is
    # If the response code is not 200 something is wrong
    response = await reader.read(READ_SIZE)
    print(response)
    print("\nConnection response received\n")

    return reader


def get_response_info(resp):
    """
        Get the event type and data from a response
        Assumes that both event and data is present in the response

        Returns: 
            String: Event type
            int: Event data
    """
    event = resp.decode("utf-8").split("event: ", 1)[1].split("\r", 1)[0].replace('"', "").lower()

    # Assumes only one piece of data per response
    data = resp.decode("utf-8").split("data: ", 1)[1].split("\r", 1)[0]

    return event, data


def websocket_mvp():
    # Create a socket client
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    print("Socket created")

    # Connect to remote socket server
    client.connect(SOCKET_ADDRESS)

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
