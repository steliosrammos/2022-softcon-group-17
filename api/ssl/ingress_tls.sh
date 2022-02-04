#!/bin/bash

# Create key and cert
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=localhost"

# Delete secret
microk8s kubectl delete secret tls-secret

# Create secret
microk8s kubectl create secret tls tls-secret --cert=tls.crt --key=tls.key

# Disable ingress
microk8s disable ingress

# re-enable ingress
microk8s enable ingress:default-ssl-certificate=default/tls-secret
