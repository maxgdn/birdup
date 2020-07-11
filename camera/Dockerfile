FROM python:3.8-slim-buster

RUN apt-get update && \
	apt-get install -y libgphoto2-dev

RUN pip install --upgrade pip && \
pip install -r requirements.txt

COPY . /opt/camera

WORKDIR /opt/camera

RUN make

CMD ["build/main.out"]

