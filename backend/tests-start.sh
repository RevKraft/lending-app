#! /usr/bin/env bash
set -e
set -x
export FIRST_SUPERUSER=ramiro.velez.koeppel@gmail.com
export FIRST_SUPERUSER_PASSWORD=Pass1234**
python3 /app/app/tests_pre_start.py

bash ./scripts/test.sh "$@"
