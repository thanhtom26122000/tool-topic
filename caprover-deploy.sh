#!/bin/bash
SAME_DOMAIN_WEB=$1
REDEPLOY=$2
echo $REDEPLOY
BUILD_PATH=build
envFile="./.env"
. $envFile
rm $envFile
if [[ $SAME_DOMAIN_WEB =~ "true" ]]; then
   echo 'PUBLIC_URL="classroom"' >>$envFile
 
fi
echo 'REACT_APP_ENDPOINT="http://wsz-sv-nhung.cd.worksheetzone.org//api"' >>$envFile 
yarn build
tar -cvf ./deploy.tar --exclude='*.map' ./captain-definition ./build/*
if [[ $REDEPLOY =~ "true" ]]; then
    caprover deploy -t ./deploy.tar -d
else
    caprover deploy -t ./deploy.tar 
fi

# ./caprover-deploy.sh true false