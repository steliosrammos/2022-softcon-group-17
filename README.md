# 2022-softcon-group-17

## TODO
- [ ] Front-end
    - [ ] Get api ip address front environment variables in the pod
- [ ] SSL for front-end

## Persistent layer
- [ ] Create a Deployment/Statefulset
- [ ] Create a Service
    - [ ] Accessible by the REST API but not from outside of the cluster
    - [ ] ClusterIP Service?
- [ ] Create a Persistent Volume
- [ ] Use ConfigMaps and Secrets in the configuration of the DB

## REST API
- [ ] Create a Deployment
- [ ] Create a Dockerfile for the image
- [ ] Horizontal scaling
- [ ] Create a Service
    - [ ] Accessible by the Web front-end (maybe access from outside the cluster)

## Web Front-end
- [ ] Create a Deployment
- [ ] Create a Dockerfile for the image
- [ ] Horizontal scaling
- [ ] Create a Service/Ingress/API Gateway
    - [ ] Accessible from outside the cluster
    - [ ] NodePort Service?

