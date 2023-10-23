#/usr/bin/env bash

kind create cluster --name starship
helm install -f .starship.yaml tutorial starship/devnet --version 0.1.45
watch kubectl get pods