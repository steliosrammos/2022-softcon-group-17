deploy_db:
	microk8s kubectl apply -f kubernetes/postgres-config.yaml \
	-f kubernetes/postgres-secret.yaml -f kubernetes/postgres-storage.yaml \
	-f kubernetes/postgres-deployment.yaml -f kubernetes/postgres-service.yaml

deploy_api:
	microk8s kubectl apply \
	-f kubernetes/api-deployment.yaml -f kubernetes/api-service.yaml \
	-f kubernetes/ingress.yaml

delete_api:
	microk8s kubectl delete deploy softcon-api-deployment
	microk8s kubectl delete service softcon-api-service
	microk8s kubectl delete ingress softcon-api-ingress

rollout_api:
	docker build . --tag localhost:32000/softcon-api
	docker push localhost:32000/softcon-api
	microk8s kubectl rollout restart deploy softcon-api-deployment

