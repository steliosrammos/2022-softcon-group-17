#!/bin/bash

microk8s kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -qO- https://10.0.2.15:443/api/orders --no-check-certificate; done"
