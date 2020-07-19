import bluetooth

addr = "0C:FC:83:2F:19:6D"
port = 1

try:
    s = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
    s.connect((addr,port))

    try:
        while True:
            data = s.recv(1024)
            if not data:
                break
            print("Received", data)
    except OSError:
        pass
except bluetooth.btcommon.BluetoothError as err:
    # Error handler
    pass

print("All done.")

