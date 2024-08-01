from typing import Any, Dict

from fastapi import APIRouter, Request

from app.models import (
    RequestBodyModel,
)

router = APIRouter()

@router.post("/nium", response_model=None)
async def event_webhook(request: Request, body: RequestBodyModel) -> Dict[str, Any]:
    headers = dict(request.headers)
    body_content = body.root
    return {"headers": headers, "body": body_content, "message": "Event processed"}
