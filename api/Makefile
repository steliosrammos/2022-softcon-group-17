deploy db:
	microk8s kubectl apply -f kubernetes/postgres-config.yaml \
	-f kubernetes/postgres-secret.yaml -f kubernetes/postgres-storage.yaml \
	-f kubernetes/postgres-deployment.yaml -f kubernetes/postgres-service.yaml
