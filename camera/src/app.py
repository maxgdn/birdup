from aiohttp import web, FormData, ClientSession
import asyncio
from capture import Capture

async def handle(request):
    data = await request.post()
    
    cap = request.app['capture']

    image_bytes = cap._do_capture()

    print(image_bytes)
    # return 500 on capture failure
    if image_bytes is None:
        return web.HTTPInternalServerError(reason="Failed to capture image")

    # send to block storage
    
    loop = asyncio.get_event_loop()
    status = loop.run_until_complete(send_to_storage(loop ,data['id'],image_bytes))

    # return 500 on storage failure
    if not status:
        return web.HTTPInternalServerError(reason="Failed to store image")
    
    # return 200 if image was taken and sent to block storage
    return web.HTTPOk()

async def send_to_storage(loop, uid, image_bytes): 
    ##url = os.getEnv('BLOCK_STORAGE_URL')
    url = "http://localhost:8082/upload"

    formdata = FormData()
    formdata.add_field('file',
               image_bytes,
               filename=uid+'.jpeg',
               content_type='image/jpeg')


    print("Reached form POST")
    async with ClientSession(loop=loop) as session:
        async with session.post(url, data=formdata) as resp:
            print(await resp.text())
            #if it failed return false

    return True

async def on_shutdown(app):
    cap = app['capture']
    cap.shut_down()

async def init_app():
    app = web.Application()
    capture = Capture()
    app['capture'] = capture
    app.on_shutdown.append(on_shutdown)
    app.router.add_post('/capture', handle)
    return app

app = init_app()


web.run_app(app, port="8081")
