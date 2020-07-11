from aiohttp import web

async def handle(request):
    data = await request.json()
    text = "Hello, " + data['uuid']
    return web.Response(text=text)

app = web.Application()
app.router.add_post('/capture', handle)

web.run_app(app)