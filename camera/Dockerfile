FROM ubuntu:bionic

RUN apt-get update && \
	apt-get install -y build-essential git cmake autoconf libtool pkg-config

COPY . /opt/camera

WORKDIR /opt/camera

RUN make

CMD ["build/main.out"]

