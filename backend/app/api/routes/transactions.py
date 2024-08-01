from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import (
    Message,
    Transaction,
    TransactionCreate,
    TransactionPublic,
    TransactionsPublic,
    TransactionUpdate,
)

router = APIRouter()


@router.get("/", response_model=TransactionsPublic)
def read_transactions(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve transactions.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(Transaction)
        count = session.exec(count_statement).one()
        statement = select(Transaction).offset(skip).limit(limit)
        transactions = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(Transaction)
            .where(Transaction.owner_id == current_user.id)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(Transaction)
            .where(Transaction.owner_id == current_user.id)
            .offset(skip)
            .limit(limit)
        )
        transactions = session.exec(statement).all()

    return TransactionsPublic(data=transactions, count=count)


@router.get("/{id}", response_model=TransactionPublic)
def read_transaction(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    """
    Get transaction by ID.
    """
    transaction = session.get(Transaction, id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    if not current_user.is_superuser and (transaction.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return transaction


@router.post("/", response_model=TransactionPublic)
def create_transaction(
    *, session: SessionDep, current_user: CurrentUser, transaction_in: TransactionCreate
) -> Any:
    """
    Create new transaction.
    """
    transaction = Transaction.model_validate(
        transaction_in, update={"owner_id": current_user.id}
    )
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction


@router.put("/{id}", response_model=TransactionPublic)
def update_transaction(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: int,
    transaction_in: TransactionUpdate,
) -> Any:
    """
    Update an transaction.
    """
    transaction = session.get(Transaction, id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    if not current_user.is_superuser and (transaction.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = transaction_in.model_dump(exclude_unset=True)
    transaction.sqlmodel_update(update_dict)
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction


@router.delete("/{id}")
def delete_transaction(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Message:
    """
    Delete a transaction.
    """
    transaction = session.get(Transaction, id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    if not current_user.is_superuser and (transaction.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(transaction)
    session.commit()
    return Message(message="Transaction deleted successfully")
