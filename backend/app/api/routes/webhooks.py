from typing import Any
#from urllib.request import Request

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import col, delete, func, select
from typing import Any, Dict

from app import crud
from app.api.deps import (
    CurrentUser,
    SessionDep,
    get_current_active_superuser,
)
from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.models import (
    Item,
    Message,
    UpdatePassword,
    User,
    UserCreate,
    UserPublic,
    UserRegister,
    UsersPublic,
    UserUpdate,
    UserUpdateMe,
    Transaction,
    Beneficiary,
    RequestBodyModel,
)
from app.utils import generate_new_account_email, send_email

router = APIRouter()

@router.post("/nium", response_model=None)
async def event_webhook(request: Request, body: RequestBodyModel) -> Dict[str, Any]:
    headers = dict(request.headers)
    body_content = body.root
    return {"headers": headers, "body": body_content, "message": "Event processed"}