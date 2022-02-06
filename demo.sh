#!/bin/bash

demo_rbac() {
	echo "Testing permissions of user db_admin:"
	echo -e "\tLIST pods/postgres: $(microk8s kubectl auth can-i list pods/postgres --as db_admin)"
	echo -e "\tWATCH pods/postgres: $(microk8s kubectl auth can-i watch pods/postgres --as db_admin)"
	echo -e "\tCREATE pods/postgres: $(microk8s kubectl auth can-i create pods/postgres --as db_admin)"
	echo -e "\tUPDATE pods/postgres: $(microk8s kubectl auth can-i update pods/postgres --as db_admin)"
	echo -e "\tDELETE pods/postgres: $(microk8s kubectl auth can-i delete pods/postgres --as db_admin)"
	echo -e "\tLIST pods/softcon-api: $(microk8s kubectl auth can-i list pods/softcon-api --as db_admin)"
	echo -e "\tWATCH pods/softcon-api: $(microk8s kubectl auth can-i watch pods/softcon-api --as db_admin)"
	echo -e "\tCREATE pods/softcon-api: $(microk8s kubectl auth can-i create pods/softcon-api --as db_admin)"
	echo -e "\tUPDATE pods/softcon-api: $(microk8s kubectl auth can-i update pods/softcon-api --as db_admin)"
	echo -e "\tDELETE pods/softcon-api: $(microk8s kubectl auth can-i delete pods/softcon-api --as db_admin)"
}

demo_hpa() {
	HOST_IP=$(ip -4 addr show enp0s5 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
	while sleep 0.001; do wget -qO- https://$HOST_IP:443/api/orders --no-check-certificate > /dev/null; done &
	microk8s kubectl get hpa -w
}
"$@"
