from aiohttp import web

async def handle(request):
    data = await request.json()
    text = "Hello, " + data['uuid']

    # return 200 if image was taken

    # return 500 otherwise

    return web.Response(text=text)

app = web.Application()
app.router.add_post('/capture', handle)

web.run_app(app)