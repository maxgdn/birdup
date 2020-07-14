import aiohttp
import uuid
import asyncio

async def main():
    async with aiohttp.ClientSession(loop=loop) as session:
        id = str(uuid.uuid4())
        print(id)
        payload = {'uuid': str(uuid.uuid4())}

        async with session.post('http://localhost:8080/capture',
                                data=payload) as resp:
            print(await resp.text())

loop = asyncio.get_event_loop()
loop.run_until_complete(main())