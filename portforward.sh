#!/usr/bin/bash

#microk8s kubectl port-forward ingress/softcon-api-ingress --address 10.0.2.15 443
microk8s kubectl port-forward service/softcon-api-service --address 10.0.2.15 8082
