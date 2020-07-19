from aiohttp import web, FormData, ClientSession
import asyncio
import json
from capture import Capture

async def handle(request):
    data = await request.post()
    body = await request.json()
    
    cap = request.app['capture']

    image_bytes = cap._do_capture()

    s = ''
    d = s.join(body.get('id'))

    if image_bytes is None:
        return web.HTTPInternalServerError(reason="Failed to capture image")

    # send to block storage
    
    loop = request.app['loop']
    status = await send_to_storage(loop ,d,image_bytes)

    print("Status")
    print(status)

    # return 500 on storage failure
    if not status:
        return web.HTTPInternalServerError(reason="Failed to store image")
    
    # return 200 if image was taken and sent to block storage
    resp_obj = {'id':d}
    headers = {'content-type': 'application/json'}
    return web.Response(status=200, body=json.dumps(resp_obj), headers=headers)

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
            if resp.status == 200:
                return True
            else:
                return False
            #if it failed return false

    return True

async def on_shutdown(app):
    cap = app['capture']
    cap.shut_down()

async def init_app():
    loop = asyncio.get_event_loop()
    app = web.Application(loop=loop)
    capture = Capture()
    app['capture'] = capture
    app['loop'] = loop
    app.on_shutdown.append(on_shutdown)
    app.router.add_post('/capture', handle)
    return app

app = init_app()


web.run_app(app, port="8081")
