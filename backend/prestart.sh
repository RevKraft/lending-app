#! /usr/bin/env bash

# Let the DB start
python /app/app/backend_pre_start.py

# Generate a new migration script
#alembic revision --autogenerate -m "Add transaction relationship"


# Run migrations
alembic upgrade head

# Create initial data in DB
python /app/app/initial_data.py
