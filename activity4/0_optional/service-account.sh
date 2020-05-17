# Openshift Security context
# Allows using a privileged container
oc adm policy add-scc-to-user privileged -z pipeline
oc adm policy add-role-to-user edit -z pipeline