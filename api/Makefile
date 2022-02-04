deploy_db:
	microk8s kubectl apply -f kubernetes/postgres-config.yaml \
	-f kubernetes/postgres-secret.yaml -f kubernetes/postgres-storage.yaml \
	-f kubernetes/postgres-deployment.yaml -f kubernetes/postgres-service.yaml

setup_ssl:
# Create key and cert
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=kube-master-gui"

# Create secret
	microk8s kubectl create secret tls tls-secret --cert=tls.crt --key=tls.key

# Disable ingress
	microk8s disable ingress

# re-enable ingress
	microk8s enable ingress:default-ssl-certificate=default/tls-secret

deploy_api: setup_ssl

	microk8s kubectl apply \
	-f kubernetes/api-deployment.yaml -f kubernetes/api-service.yaml \
	-f kubernetes/ingress.yaml

delete_api:
	microk8s kubectl delete deploy softcon-api-deployment
	microk8s kubectl delete service softcon-api-service
	microk8s kubectl delete ingress softcon-api-ingress
	microk8s kubectl delete secret tls-secret

rollout_api:
	docker build . --tag localhost:32000/softcon-api
	docker push localhost:32000/softcon-api
	microk8s kubectl rollout restart deploy softcon-api-deployment

