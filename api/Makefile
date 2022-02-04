TLS_CERT := $(shell microk8s kubectl get secret tls-secret -o 'go-template={{index .data "tls.crt"}}' --ignore-not-found)
# TLS_KEY := $(shell microk8s kubectl get secret tls-secret -o 'go-template={{index .data "tls.key"}}' --ignore-not-found)

deploy_db:
	microk8s kubectl apply -f kubernetes/postgres-config.yaml \
	-f kubernetes/postgres-secret.yaml -f kubernetes/postgres-storage.yaml \
	-f kubernetes/postgres-deployment.yaml -f kubernetes/postgres-service.yaml

delete_db:
	microk8s kubectl delete deploy postgres-deployment;
	microk8s kubectl delete service postgres-service;
	microk8s kubectl delete pvc postgres-pv-claim;
	microk8s kubectl delete pv postgres-pv-volume;
	microk8s kubectl delete secret postgres-secret;
	microk8s kubectl delete secret dbpassword;
	microk8s kubectl delete configmap postgres-config;

setup_ssl:
 #Create key and cert
	@if [ ! -f tls.crt ]; then\
	  echo "Does not exist";\
	  openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=kube-master-gui";\
	fi

# Create secret
	@if [ -z ${TLS_CERT} ]; then\
	  @echo 'Secret does not exist!';\
	  microk8s kubectl create secret tls tls-secret --cert=tls.crt --key=tls.key;\
	else\
	  @echo 'Using existing tls certificate';\
	fi

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
	docker build . --tag localhost:32000/softcon-api:latest
	docker push localhost:32000/softcon-api:latest
	microk8s kubectl rollout restart deploy softcon-api-deployment

