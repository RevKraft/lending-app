import logging

import sentry_sdk
from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from typing import Any, Dict

from app.api.main import api_router
from app.core.config import settings
from app.models import UserCreate, UserRegister


def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"


if settings.SENTRY_DSN and settings.ENVIRONMENT != "local":
    sentry_sdk.init(dsn=str(settings.SENTRY_DSN), enable_tracing=True)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

@app.webhooks.post("new-register")
def new_register(body: UserRegister) -> Dict[str, Any]:
    print(body)
    return {"body": body, "message": "Automatic webhook processed"}

@app.webhooks.post("new-user")
def new_user(body: UserCreate) -> Dict[str, Any]:
    logger.info(body)
    return {"body": body, "message": "Automatic webhook processed"}


app.include_router(api_router, prefix=settings.API_V1_STR)
