#!/usr/bin/env bash

set -e
set -x
export FIRST_SUPERUSER=ramiro.velez.koeppel@gmail.com
export FIRST_SUPERUSER_PASSWORD=Pass1234**
coverage run --source=app -m pytest
coverage report --show-missing
coverage html --title "${@-coverage}"
