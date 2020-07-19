import bluetooth

uuid = "0C:FC:83:2F:19:6D"

server_sock=bluetooth.BluetoothSocket( bluetooth.RFCOMM )

port = bluetooth.get_available_port( bluetooth.RFCOMM )
server_sock.bind(("",port))
server_sock.listen(1)
print "listening on port %d" % port

bluetooth.advertise_service( server_sock, "Service", uuid )

client_sock,address = server_sock.accept()
print "Accepted connection from ",address

try:
    while True:
        data = client_sock.recv(1024)
        if not data:
            break
        print("Received", data)
except OSError:
    pass

client_sock.close()
server_sock.close()

