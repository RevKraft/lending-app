from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Beneficiary, BeneficiaryCreate, BeneficiaryPublic, BeneficiariesPublic, BeneficiaryUpdate, Message

router = APIRouter()


@router.get("/", response_model=BeneficiariesPublic)
def read_beneficiaries(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve beneficiaries.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(Beneficiary)
        count = session.exec(count_statement).one()
        statement = select(Beneficiary).offset(skip).limit(limit)
        beneficiaries = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(Beneficiary)
            .where(Beneficiary.owner_id == current_user.id)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(Beneficiary)
            .where(Beneficiary.owner_id == current_user.id)
            .offset(skip)
            .limit(limit)
        )
        beneficiaries = session.exec(statement).all()

    return BeneficiariesPublic(data=beneficiaries, count=count)


@router.get("/{id}", response_model=BeneficiaryPublic)
def read_beneficiary(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    """
    Get beneficiary by ID.
    """
    beneficiary = session.get(Beneficiary, id)
    if not beneficiary:
        raise HTTPException(status_code=404, detail="Beneficiary not found")
    if not current_user.is_superuser and (beneficiary.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return beneficiary


@router.post("/", response_model=BeneficiaryPublic)
def create_beneficiary(
    *, session: SessionDep, current_user: CurrentUser, beneficiary_in: BeneficiaryCreate
) -> Any:
    """
    Create new beneficiary.
    """
    beneficiary = Beneficiary.model_validate(beneficiary_in, update={"owner_id": current_user.id})
    session.add(beneficiary)
    session.commit()
    session.refresh(beneficiary)
    return beneficiary


@router.put("/{id}", response_model=BeneficiaryPublic)
def update_beneficiary(
    *, session: SessionDep, current_user: CurrentUser, id: int, beneficiary_in: BeneficiaryUpdate
) -> Any:
    """
    Update a beneficiary.
    """
    beneficiary = session.get(Beneficiary, id)
    if not beneficiary:
        raise HTTPException(status_code=404, detail="Beneficiary not found")
    if not current_user.is_superuser and (beneficiary.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = beneficiary_in.model_dump(exclude_unset=True)
    beneficiary.sqlmodel_update(update_dict)
    session.add(beneficiary)
    session.commit()
    session.refresh(beneficiary)
    return beneficiary


@router.delete("/{id}")
def delete_beneficiary(session: SessionDep, current_user: CurrentUser, id: int) -> Message:
    """
    Delete a beneficiary.
    """
    beneficiary = session.get(Beneficiary, id)
    if not beneficiary:
        raise HTTPException(status_code=404, detail="Beneficiary not found")
    if not current_user.is_superuser and (beneficiary.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(beneficiary)
    session.commit()
    return Message(message="Beneficiary deleted successfully")