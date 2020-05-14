# Activity 1

Prerequisites, before starting the exercise:

- [Exercise 3](https://github.com/ibm-garage-cph/istio-roks-101/tree/master/workshop/exercise-3)
- [Exercise 4](https://github.com/ibm-garage-cph/istio-roks-101/tree/master/workshop/exercise-4)

Which means that your starting point should be an istio-enabled openshift cluster, where you have created a project named `bookinfo-<your initials>` and you have deployed the bookinfo microservices into it.

At this stage introduce a basic node.js server, running with express.

The project is unit-test-enabled, using `jest` & `supertest` as test frameworks.

The project also contains the artifacts neccessary for you to deploy it to your bookinfo project on the openshift cluster

## Problem

You have been tasked with the containerisation of this brand-new service. What we expect is for you to:

1. Build an image for this codebase. This involves creating a `Dockerfile` in which you `COPY` the necessary source code. As well, you must ensure to install the node.js dependancies that the service requires on run-time.
2. `Push` the resulting image to dockerhub with the following name and tag: your-account/details:1
3. Deliver the new image to your openshift namespace, by using a `Deployment` resource
4. Expose the new deployment as a `Service`

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
# Build image with a tag
docker build --tag tagname:1.0.0 .

# Run container interactively
docker run -it tagname:1.0.0

# Run container detached
docker run -d tagname:1.0.0

# Stop container
docker stop tagname:1.0.0

# List containers
docker ps

# List local images
docker images
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
