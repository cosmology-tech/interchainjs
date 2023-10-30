#/usr/bin/env bash

# make sure `docker-desktop` is listed in `kubectl config get-contexts`
# kubectl config use-context docker-desktop

helm install -f .starship.yaml tutorial starship/devnet --version 0.1.45
watch kubectl get pods

# remember to run port-forward after all pods running
# ./scripts/port-forward.sh --config=.starship.yaml > .port