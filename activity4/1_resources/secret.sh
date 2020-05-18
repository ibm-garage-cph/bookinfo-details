# example with environment variables
export SERVER=''
export USERNAME='iamapikey'
export PASSWORD='MUST REPLACE HERE: your IBM Cloud ApiKey'
export EMAIL='iamapikey'

oc create secret docker-registry dockerhub \
    --docker-server=$SERVER \
    --docker-username=$USERNAME \
    --docker-password=$PASSWORD \
    --docker-email=$EMAIL

# or, with inline values:
oc create secret docker-registry dockerhub \
    --docker-server='de.icr.io' \
    --docker-username='iamapikey' \
    --docker-password='MUST REPLACE HERE: your IBM Cloud ApiKey' \
    --docker-email='iamapikey'
