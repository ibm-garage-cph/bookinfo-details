# Activity 1

Prerequisites, before starting the exercise:

- [Exercise 3](https://github.com/ibm-garage-cph/istio-roks-101/tree/master/workshop/exercise-3)
- [Exercise 4](https://github.com/ibm-garage-cph/istio-roks-101/tree/master/workshop/exercise-4)
- [01-basis](https://github.com/ibm-garage-cph/devops-plan/tree/master/01-basis)

Which means that your starting point should be an istio-enabled openshift cluster, where you have created a project named `bookinfo-<your initials>` and you have deployed the bookinfo microservices into it.

At this stage introduce a basic node.js server, running with express.

The project is unit-test-enabled, using `jest` & `supertest` as test frameworks.

The project also contains the artifacts neccessary for you to deploy it to your bookinfo project on the openshift cluster

## Problem

You have been tasked with the containerisation of this brand-new service. What we expect is for you to:

1. Build an image for this codebase. This involves creating a `Dockerfile` in which you `COPY` the necessary source code. As well, you must ensure to install the node.js dependancies that the service requires on run-time.
2. `Push` the resulting image to dockerhub or IBM container registry with the following name and tag: de.icr.io/kmddk/bookinfo-details-<initials>:1
3. Deliver the new image to your openshift namespace, by using a `Deployment` (app: details-nodejs - as labels)
4. Expose the new deployment as a `Service` with the name `details-nodejs`
5. Save your artifacts (yamls, codebase, dockerfile) in a github repository

## Reference

### Node.js

```bash
# Install dependancies
npm install

# Start application
npm start
```

### Dockerfile

```Dockerfile
# Source image - starting point
FROM node:12

# Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD command
WORKDIR /app

# Copy files from dockerfile location disk to image
COPY source-filename.json destination-filename.json
COPY /example/src/folder /example/destination/folder

# Run scripts inside the image on build-time
RUN npm install

# Command executed on container run time
CMD npm start
```

### Docker cli

```bash
# Login to ibm container registry
ibmcloud login
ibmcloud cr region-set eu-central
ibmcloud cr login

# Build image with a tag
docker build --tag tagname:1.0.0 .
# Use a tag in this format. it will make things simpler when pushing
docker build --tag de.icr.io/kmddk/bookinfo-details-<initials>:1

# Run container interactively
docker run -it tagname:1.0.0

# Run container interactively with ports exposed
docker run -p xxxx:yyyy -it tagname:1.0.0

# Run container detached
docker run -d -p 3000:3000 tagname:1.0.0

# Stop container
docker stop tagname:1.0.0

# List containers
docker ps

# List local images
docker images

# Push image to registry
docker push tagname:1.0.0
docker push de.icr.io/kmddk/bookinfo-details-<initials>:1
```

### Deployment resource

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: <Image>
          resources:
            limits:
              memory: "128Mi"
              cpu: "500m"
          ports:
            - containerPort: <Port>
```

### Service resource

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
  ports:
    - port: <Port>
      targetPort: <Target Port>
```

### Hints

- .dockerignore - a file which blacklists files from being considered (copied, executed, etc) by a Dockerfile at build-time
- package.json - contains the nodejs dependancies and scripts; it's the entry-point to the app in a sense
