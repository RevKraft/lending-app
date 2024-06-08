# Domain
# This would be set to the production domain with an env var on deployment
export DOMAIN=ec2-3-22-252-63.us-east-2.compute.amazonaws.com/

# Environment: local, staging, production
export ENVIRONMENT=local

export PROJECT_NAME="Lending App"
export STACK_NAME=lending-aPP

# Backend
export BACKEND_CORS_ORIGINS="http://localhost,http://localhost:5173,https://localhost,https://localhost:5173,http://localhost.tiangolo.com,http://ec2-3-22-252-63.us-east-2.compute.amazonaws.com,https://ec2-3-22-252-63.us-east-2.compute.amazonaws.com"
export SECRET_KEY=9aVxo54yEij2k6y92EFyzCzrZNikUUGXG8403Jc0heg
export FIRST_SUPERUSER=ramiro.velez.koeppel@gmail.com
export FIRST_SUPERUSER_PASSWORD=Pass1234**
export USERS_OPEN_REGISTRATION=True

# Emails
export SMTP_HOST=smtp.yopmail.com
export SMTP_USER=fastapirevkraft@yopmail.com
export SMTP_PASSWORD=
export EMAILS_FROM_EMAIL=fastapirevkraft@yopmail.com
export SMTP_TLS=True
export SMTP_SSL=False
export SMTP_PORT=587

# Postgres
export POSTGRES_SERVER=localhost
export POSTGRES_PORT=5432
export POSTGRES_DB=app
export POSTGRES_USER=ramiro.velez.koeppel
export POSTGRES_PASSWORD=Pass1234**
export SENTRY_DSN=

# Configure these with your own Docker registry images
export DOCKER_IMAGE_BACKEND=backend
export DOCKER_IMAGE_FRONTEND=frontend
