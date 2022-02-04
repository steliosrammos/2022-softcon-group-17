#!/bin/bash

microk8s kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- https://localhost/api/orders/; done"
