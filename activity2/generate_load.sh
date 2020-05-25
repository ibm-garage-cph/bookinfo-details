#!/bin/sh
URL=`oc get route details-v2 -o jsonpath={.spec.host}`
for i in {1..100} 
do
    curl -w "\n" $URL
done
