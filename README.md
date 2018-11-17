# proxy-amazon
Combined proxy across all microservices.

To run:
- "npm build" to build client files
- "node server/index.js" to run server

* Docker

** Building a docker image
`docker build -t proxy-amazon .`

** Running a Docker Container
`docker run -p 80:3000 {image-id}`