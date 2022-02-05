# Kubernetes deployment for `softcon-bistro`

## Helm 

### Configuration

To deploy the `softcon-bistro` we use the `helm-chart` present in this directory. 

The `helm-chart` describes the templates needed to run `softcon-bistro-api`, the `softcon-bistro-web-app` and the `postgres-db`.

To install the chart, run the following command: 

```
microk8s helm3 install softcon-bistro ./helm-chart
``` 

To upgrade the chart after a change run:

```
microk8s helm3 upgrade softcon-bistro ./helm-chart
```

### Stress test

The `softcon-bistro-api` and `softcon-bistro-web-app` are configured to scale horizontally using an HPA, based on their CPU 
utilization. 

To stress test the `softcon-bistro-api` we provide a bash script called `stressingmeout.sh` which runs a temporary pod 
to send requests to the api. 

To run the stress test, run the following command:

```
./stressingmeout.sh
```

### Clean up

To clean up the entire installation, use the following command: 

```
microk8s uninstall softcon-bistro
```