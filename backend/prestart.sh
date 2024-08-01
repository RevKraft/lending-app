#! /usr/bin/env bash

# Let the DB start
python /app/app/backend_pre_start.py


# Generate a new migration script
#alembic revision --autogenerate -m "Transactions model extended for Nium's data"


# Run migrations
alembic upgrade head
#alembic downgrade 4abaa2843228

# Create initial data in DB
python /app/app/initial_data.py
