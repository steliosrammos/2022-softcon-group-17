# API for SoftCon-2022 Books Library

## Dependencies

We use the `poetry` dependency manager. 

In `development`, you may install the dependencies of the `softcon-bistro-api` by running the following command:

```poetry install```

if the command completes successfully, you may start up the `softcon-bistro-api` with the following command:

```poetry run python api.py```

To add a dependency to the project, run the following command; 

```poetry add <name-of-the-package>```

In `production`, we use Kubernets to orchestrate a Dockerised version of the `softcon-bistro-api`. 

TBD

## API Endpoints

`GET /api/meals`: fetches all meals on the menu
`GET /api/orders/id`: fetches a single order
`GET /api/orders`: fetches all orders
`DELETE /api/orders/id`: cancels an existing order
`POST /api/order`:  creates a new order