#/usr/bin/env bash

helm delete tutorial
pkill -f "port-forward"
kind delete clusters starship