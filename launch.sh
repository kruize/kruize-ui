#!/bin/bash

if rpm -qa | grep npm
then
	npm run start:dev
else
	echo "npm is NOT Installed on your machine."	
fi

