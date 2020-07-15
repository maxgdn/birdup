import aiohttp
import uuid
import asyncio

##########################################
#
# Currently not working.
#
##########################################
async def main():
    async with aiohttp.ClientSession(loop=loop) as session:
        uid = "c2a88d1b-5d00-4f87-bcc3-5f00807e10d1.jpeg"
        headers = {'content-type': 'application/json'}
        print(id)
        payload = {"id": uid}
        print(payload)
        async with session.post('http://localhost:8081/fetch',
                                data=payload,
                                headers=headers) as resp:
            print(await resp.text())

loop = asyncio.get_event_loop()
loop.run_until_complete(main())