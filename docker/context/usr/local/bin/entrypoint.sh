#!/bin/bash

ENV_FILE=/usr/local/etc/${SERVICE_NAME}.env
if [ -f "$ENV_FILE" ]; then
  echo "INFO: Loading environment variables from file: ${ENV_FILE}"
  set -a
  source $ENV_FILE
  set +a
fi

env

echo "INFO: Starting ${SERVICE_NAME} application..."

exec -a $SERVICE_NAME node ./main.js
