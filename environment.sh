# Domain
# This would be set to the production domain with an env var on deployment
export DOMAIN=ec2-3-22-252-63.us-east-2.compute.amazonaws.com

# Environment: local, staging, production
export ENVIRONMENT=production

export PROJECT_NAME="Lending App"
export STACK_NAME=lending-app

# Backend
export BACKEND_CORS_ORIGINS="http://localhost,http://localhost:5173,https://localhost,https://localhost:5173,http://localhost.tiangolo.com,http://ec2-3-22-252-63.us-east-2.compute.amazonaws.com,https://ec2-3-22-252-63.us-east-2.compute.amazonaws.com,*"
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

# traefik
export USERNAME=ramiro.velez.koeppel@gmail.com
export PASSWORD=Pass1234**
export HASHED_PASSWORD=$(openssl passwd -apr1 $PASSWORD)
export EMAIL=ramiro.velez.koeppel@gmail.com


export DOMAIN=ec2-3-22-252-63.us-east-2.compute.amazonaws.com ENVIRONMENT=production PROJECT_NAME="Lending App" STACK_NAME=lending-app BACKEND_CORS_ORIGINS="http://localhost,http://localhost:5173,https://localhost,https://localhost:5173,http://localhost.tiangolo.com,http://ec2-3-22-252-63.us-east-2.compute.amazonaws.com,https://ec2-3-22-252-63.us-east-2.compute.amazonaws.com" SECRET_KEY=9aVxo54yEij2k6y92EFyzCzrZNikUUGXG8403Jc0heg FIRST_SUPERUSER=ramiro.velez.koeppel@gmail.com FIRST_SUPERUSER_PASSWORD=Pass1234** USERS_OPEN_REGISTRATION=True SMTP_HOST=smtp.yopmail.com SMTP_USER=fastapirevkraft@yopmail.com SMTP_PASSWORD= EMAILS_FROM_EMAIL=fastapirevkraft@yopmail.com SMTP_TLS=True SMTP_SSL=False SMTP_PORT=587 POSTGRES_SERVER=localhost POSTGRES_PORT=5432 POSTGRES_DB=app POSTGRES_USER=ramiro.velez.koeppel POSTGRES_PASSWORD=Pass1234** SENTRY_DSN= DOCKER_IMAGE_BACKEND=backend DOCKER_IMAGE_FRONTEND=frontend USERNAME=ramiro.velez.koeppel@gmail.com PASSWORD=Pass1234** HASHED_PASSWORD=$(openssl passwd -apr1 $PASSWORD) EMAIL=ramiro.velez.koeppel@gmail.com
