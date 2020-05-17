export DOCKER_SERVER='https://index.docker.io/v1/'
export DOCKER_USERNAME='your dockerhub account name'
export DOCKER_PASSWORD='your password or API KEY generated from dockerhub'
export DOCKER_EMAIL='youremail@example.com'

oc create secret docker-registry dockerhub \
    --docker-server=$DOCKER_SERVER \
    --docker-username=$DOCKER_USERNAME \
    --docker-password=$DOCKER_PASSWORD \
    --docker-email=$DOCKER_EMAIL
