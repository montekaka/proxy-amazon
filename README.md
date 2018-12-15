# proxy-amazon
Combined proxy across all microservices.

To run:
- "npm build" to build client files
- "node server/index.js" to run server

# Docker

## Building a docker image
`docker build -t proxy-amazon .`

## Running a Docker Container
`docker run -p 80:3000 {image-id}`

Because we are running Docker locally, go to http://localhost to view

## Check running Docker containers by typing
`docker container ls`

## Stop the container from running by
`docker stop {container-id}`

## Deploy to ECS 
1. Retrieve the login command to use to authenticate your Docker client to your registry.
`aws ecr get-login --no-include-email --region us-west-1`

2. Build latest image
`docker build -t proxy-amazon .`

3. After the build completes, tag your image so you can push the image to this repository:
`docker tag proxy-amazon:latest 001545669968.dkr.ecr.us-west-1.amazonaws.com/proxy-amazon:latest`

4. Run the following command to push this image to your newly created AWS repository:
`docker push 001545669968.dkr.ecr.us-west-1.amazonaws.com/proxy-amazon:latest`