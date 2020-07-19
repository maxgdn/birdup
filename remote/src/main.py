from evdev import InputDevice, categorize, ecodes
from client import GQLClient

ABShutter3 = InputDevice('/dev/input/event5')

client = GQLClient()

EV_VAL_PRESSED = 1
EV_VAL_RELEASED = 0
BTN_SHUTTER = 115

print(ABShutter3)

for event in ABShutter3.read_loop():
    if event.type == ecodes.EV_KEY:
        if event.value == EV_VAL_PRESSED:
            if event.code == BTN_SHUTTER:
                print('---')
                print('Shutter3 pressed')
                client.capture()
                print(event)
