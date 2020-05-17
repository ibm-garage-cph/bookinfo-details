# Openshift Security Context Update
# Allows the pipeline service account to use a privileged container
oc adm policy add-scc-to-user privileged -z pipeline
oc adm policy add-role-to-user edit -z pipeline