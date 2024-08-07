# Third-party imports
from fastapi import APIRouter

# Local application imports
from app.api.routes import (
    beneficiaries,
    items,
    login,
    transactions,
    users,
    utils,
    webhooks,
)

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(
    transactions.router, prefix="/transactions", tags=["transactions"]
)
api_router.include_router(
    beneficiaries.router, prefix="/beneficiaries", tags=["beneficiaries"]
)
api_router.include_router(webhooks.router, prefix="/webhooks", tags=["webhooks"])
