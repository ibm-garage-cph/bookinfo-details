In this exercise we will configure liveness and readiness probes for our `bookinfo-details-v2` microservice.

The [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) uses **liveness probes** to know when to restart a container. For example, liveness probes could catch a deadlock, where an application is running, but unable to make progress. Restarting a container in such a state can help to make the application more available despite bugs.

The kubelet uses **readiness probes** to know when a container is ready to start accepting traffic. A Pod is considered ready when all of its containers are ready. One use of this signal is to control which Pods are used as backends for Services. When a Pod is not ready, it is removed from Service load balancers.

The use of each probe is best understood by examining the action that will take place if the probe is activated. 

- Liveness : Under what circumstances is it appropriate to restart the pod?
- Readiness : under what circumstances should we take the pod out of the list of service endpoints so that it no longer responds to requests? 

Coupled with the action of the probe is the type of test that can be performed within the pod :

- HTTP GET request - For success, a request to a specific HTTP endpoint must result in a response between 200 and 399.
- Execute a command - For success, the execution of a command within the container must result in a return code of 0.
- TCP socket check - For success, a specific TCP socket must be successfully opened on the container.


In our exercise we will define two routes:

- /health - it will be used by `liveness` probe.
- /ready  - it will be used by the `readiness` probe.
  
and then we will define both probes in the application `deploymen.yml`

## Instructions
1. Review the code added to the `src/app.js`

```
app.get('/health', (req, res, next) => {
  if(health) {
   res.json({ status: 'Healthy'})
   next()
 } else {
  res.status(500).send('Health check did not pass');
 }
})

app.get('/bad-health', (req, res, next) => {
  health = false
  res.json({ status: 'App health set to \'false\'. This should activate the liveness probe'})
  next()
})
```
2.  (Optional) If you have local installation of Docker on your workstation, try to build the new docker image for our `bookinfo-details-v2` microservice.
   ```sh
   cd bookinfo-details/activity3
   docker build -t bookinfo-details-v2:2.0 .
   ```
   After it completes list the local docker images:
   ```
   docker images
   ```
   It should list the image you have just built.
   Run the docker container locally in order to test if it works correctly:

   ```
   # docker run -d -p 3000:3000 --name bookinfo-details bookinfo-details-v2:2.0
   docker run -p 3000:3000 --name bookinfo-details bookinfo-details-v2:2.0
   ```
   Use curl or web browser and test microservice URLs:
   - `http://localhost:3000/health`
   - `http://localhost:3000/ready`
   
   Simulate the app health problem with `http://localhost:3000/simulate-problem`
   Check the `http://localhost:3000/health` again.

 2. + Push image to container registry
 
   ```
    docker tag  bookinfo-details-v2:2.0 de.icr.io/<namespace>/<id>-bookinfo-details-v2:2.0

   docker push de.icr.io/<namespace>/<id>-bookinfo-details-v2:2.0
   ```

 3. Review the contents of the `openshift/deployment.yml`. The YAML file fas been updated with definitions of the liveness and readiness probes:
   ```yml
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 3
          periodSeconds: 3
          failureThreshold: 2
        readinessProbe:
          exec:
            command:
            - cat
            - /tmp/healthy
          initialDelaySeconds: 5
          periodSeconds: 5
   ```
4. Re-deploy the deployment to your namespace

   ```bash
   oc project bookinfo-xxx/activity3

   oc apply -f openshift/deployment.yaml
   ```
5. Test the liveness probe. Access the `bookinfo-details` external URL (collect it with `oc get route`)
   ```sh
   curl `http://<route_host>/health`
   ```
   Check the status of the pod
   ```
   oc get po
   ```
   Simulate the health problem with:
   ```sh
   curl `http://<route_host>/simulate-problem`
   ```
   Check if pod has been restarted by the kubelet:

   ```sh
   oc describe po <pod-name>
   ```
   Check the section Events of the output.