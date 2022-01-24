# API for SoftCon-2022 Books Library

## Dependencies

We use the `poetry` dependency manager. 

In `development`, you may install the dependencies of the `softcon-books-api` by running the following command:

```poetry install```

if the command completes successfully, you may start up the `softcon-books-api` with the following command:

```poetry run python api.py```

To add a dependency to the project, run the following command; 

```poetry add <name-of-the-package>```

In `production`, we use Kubernets to orchestrate a Dockerised version of the `softcon-books-api`. 

TBD