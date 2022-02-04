#!/usr/bin/bash

microk8s kubectl port-forward service/softcon-api-service --address 10.0.2.15 8082
