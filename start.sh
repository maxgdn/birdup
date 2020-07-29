#!/bin/bash
docker-compose -f docker-compose.up.yaml -f storage/docker-compose.minio.yaml up --build