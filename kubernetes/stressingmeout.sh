#!/bin/bash
HOST_IP=$(ip -4 addr show enp0s5 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
echo $HOST_IP
microk8s kubectl run -i --tty load-generator --rm --image=busybox --restart=Never --env="HOST_IP=$HOST_IP" -- /bin/sh -c "while sleep 0.001; do wget -qO- https://$HOST_IP:443/api/orders --no-check-certificate > /dev/null; done"
