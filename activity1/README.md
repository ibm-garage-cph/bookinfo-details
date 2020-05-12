# Activity 1

Prerequisites, before starting the exercise:

- [Exercise 3](https://github.com/ibm-garage-cph/istio-roks-101/tree/master/workshop/exercise-3)
- [Exercise 4](https://github.com/ibm-garage-cph/istio-roks-101/tree/master/workshop/exercise-4)

Which means that your starting point should be an istio-enabled openshift cluster, where you have created a project named `bookinfo-<your initials>` and you have deployed the bookinfo microservices into it.

At this stage we have a basic node.js server, running with express.

The project is unit-test-enabled, using `jest` & `supertest` as test frameworks.

## Instructions

1. Start by opening a terminal in a workspace directory of your choosing (*for example, on windows - C:\ibm-garage but it can be anything you'd like*)

2. Clone the current repository into this new workspace directory

    ```bash
    git clone https://github.com/ibm-garage-cph/bookinfo-details
    ```

3. In the same terminal, navigate to the directory `bookinfo-details`

    ```bash
    cd bookinfo-details
    ```

4. Apply the new deployment and the associated service to your namespace

   ```bash
   oc project bookinfo-mn

   oc apply -f activity1/openshift/deployment.yaml
   oc apply -f activity1/openshift/service.yaml
   ```

5. Observe what happened. Explain the following:

   1. What image are we using for the new deployment? Where is it coming from?
   2. What port are the associated pods listening on?
   3. What port is the details service listening on?
