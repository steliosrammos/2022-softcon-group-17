FROM python:3.8.1-slim

# Install packages with apt
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # deps for installing poetry
        curl \
        # deps for building python deps
        build-essential \
        procps \
        # dependency for PostgreSQL client
        libpq-dev

# Set env variables
ENV PYTHONUNBUFFERED=1 \
    # prevents python creating .pyc files
    PYTHONDONTWRITEBYTECODE=1 \
    # Pip
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    # Poetry
    # https://python-poetry.org/docs/configuration/#using-environment-variables
    # Make poetry install to this location
    POETRY_HOME="/opt/poetry" \
    # Make poetry create the virtual environment outside of the 
    # possibly mounted project directory
    POETRY_VIRTUALENVS_IN_PROJECT=false \
    POETRY_VIRTUALENVS_PATH="/opt/poetry/.venv" \
    # Do not ask any interactive question
    POETRY_NO_INTERACTION=1 \
    # paths
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"

# Prepend poetry and venv to path
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"

# Change dir
WORKDIR /app

# Install Poetry
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -

COPY pyproject.toml .

RUN poetry install

COPY . .

EXPOSE 5000

CMD poetry run python src/api.py

# FROM python:3.7

# WORKDIR /opt/app

# COPY . .

# RUN apt install libpq-dev

# RUN pip install --no-cache-dir -r requirements.txt

# EXPOSE 5000

# CMD ["python3", "api.py"]