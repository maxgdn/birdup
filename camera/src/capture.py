import gphoto2 as gp
import io
from PIL import Image

class Capture :
    def __init__(self):
        self.camera = gp.Camera()
        self.camera.init()
    
    def _do_capture(self):
        # capture actual image
        OK, camera_file_path = gp.gp_camera_capture(
            self.camera, gp.GP_CAPTURE_IMAGE)
        if OK < gp.GP_OK:
            print('Failed to capture')
            return None
        camera_file = self.camera.file_get(
            camera_file_path.folder, camera_file_path.name,
            gp.GP_FILE_TYPE_NORMAL)
        file_data = camera_file.get_data_and_size()
        image_bytes = io.BytesIO(file_data)
        #with open("test.txt",'w') as f:
        #    f.write(image_bytes)
        return image_bytes

    def shut_down(self):
        print('Shutting down camera')
        self.camera.exit()