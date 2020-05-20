# Activity 4

This activity is about creating your first OpenShift CI pipeline.

## Problem

You have been tasked with automating the build and release of the new details service. Below you have the instructions for re-using some existing pipeline artifacts.

## Instructions

1. Create a new project on the cluster named `tekton-<your initials>`

2. Apply the `PipelineResources` which you can find in the directory named `1_resources`
   - Create a secret using the command found in `secret.sh`. Make sure to replace the `PASSWORD` field before execution with an API key generated from IBM Cloud IAM.
     - To obtain an API key --> cloud.ibm.com > top right corner > Manage > Access (IAM) > API Keys (Left side menu) > Create an IBM Cloud API key > Name it > Create > Copy / Download
   - Modify the `registry.yaml` file to include your docker username

   - Apply the resources on by one

   ```bash
   oc apply -f 1_resources/git.yaml
   oc apply -f 1_resources/registry.yaml
   oc apply -f 1_resources/service-account.yaml
   ```

3. Apply the `Task` resources which are found in the directory `2_tasks`

    ```bash
   oc apply -f 2_tasks/task-test.yaml
   oc apply -f 2_tasks/task-build-push.yaml
   ```

    *The files named `taskrun-` can be used for testing the tasks individually. But for our purposes, we don't need to use them*

4. Apply the `Pipeline` resource found in the directory `3_pipeline`

    ```bash
   oc apply -f 3_pipeline/pipeline.yaml
   ```

5. Ensure the pipeline service account in tekton-<id> can make changes in the namespace to work on bookinfo-<id>. Without this the manifest applies will fail.

    ```bash
   oc policy add-role-to-user edit system:serviceaccount:tekton-$INITIALS:pipeline -n bookinfo-$INITIALS
    ```


6. Create a `PipelineRun` instance in order to trigger the newly creted pipeline

    ```bash
   oc create -f 3_pipeline/pipelinerun.yaml
   ```
   Alternatively use the tekton cli
   ```bash
   tkn pipeline start pipeline-details-service  -r git=git-bookinfo-details  -r image=dockerhub-bookinfo-details  -p  TARGET_DIRECTORY=activity3 -p NAMESPACE=bookinfo-jb
   ```

   *Observe: the `pipelinerun.yaml` contains the reference to the previously created resources: service account, git repository, container registry*

7. Follow the progress of your pipeline using the tekton cli or the Openshift web console

8. If the pipeline is successful, check your dockerhub account to see that the image is there

9. If the pipeline is successful, check your deployment of the bookinfo application 


## Reference

### Tekton cli

```bash
# Tasks
tkn task ls     # list
tkn task logs   # get logs

# TaskRuns
tkn taskrun ls                  # list
tkn taskrun logs                # get logs
tkn taskrun logs taskrun-id     # get logs from specific taskrun

# Pipelines
tkn pipeline ls                 # list
tkn pipeline logs               # get logs
tkn pipeline logs pipeline-name # get logs from specific pipeline

# PipelineRuns
tkn pipelinerun ls          # list
tkn pipelinerun logs        # get logs
tkn pipelinerun logs id     # get logs from specific pipeline
```

