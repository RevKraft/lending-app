from typing import Any

from pydantic import EmailStr, RootModel
from sqlmodel import Field, Relationship, SQLModel


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_onboarded: bool = False
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str
    items: list["Item"] = Relationship(back_populates="owner")
    transactions: list["Transaction"] = Relationship(back_populates="owner")
    beneficiaries: list["Beneficiary"] = Relationship(back_populates="owner")


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: int


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


# Shared properties
class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    walletHashId: str = Field(min_length=1, max_length=255)
    status: str = Field(min_length=1, max_length=255)
    regulatoryRegion: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)

class TransactionBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    beneficiaryId: str = Field(min_length=1, max_length=255)
    payout_source_amount: str = Field(min_length=1, max_length=255)
    payout_source_currency: str = Field(min_length=1, max_length=255)
    message: str | None = Field(default=None, max_length=255)
    payment_id: str | None = Field(default=None, max_length=255)
    system_reference_number: str | None = Field(default=None, max_length=255)
    description: str | None = Field(default=None, max_length=255)

class BeneficiaryBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    beneficiaryName: str = Field(min_length=1, max_length=255)
    beneficiaryAccountType: str = Field(min_length=1, max_length=255)
    beneficiaryCountryCode: str = Field(min_length=1, max_length=255)
    destinationCountry: str = Field(min_length=1, max_length=255)
    destinationCurrency: str = Field(min_length=1, max_length=255)
    payoutMethod: str = Field(min_length=1, max_length=255)
    beneficiaryAccountNumber: str = Field(min_length=1, max_length=255)
    routingCodeType1: str = Field(min_length=1, max_length=255)
    routingCodeValue1: str = Field(min_length=1, max_length=255)
    beneficiaryHashId: str | None = Field(default=None, max_length=255)
    description: str | None = Field(default=None, max_length=255)

# Properties to receive on item/transaction/beneficiary creation
class ItemCreate(ItemBase):
    title: str = Field(min_length=1, max_length=255)
    walletHashId: str = Field(min_length=1, max_length=255)
    status: str = Field(min_length=1, max_length=255)
    regulatoryRegion: str = Field(min_length=1, max_length=255)

class TransactionCreate(TransactionBase):
    title: str = Field(min_length=1, max_length=255)
    beneficiaryId: str = Field(min_length=1, max_length=255)
    payout_source_amount: str = Field(min_length=1, max_length=255)
    payout_source_currency: str = Field(min_length=1, max_length=255)

class BeneficiaryCreate(BeneficiaryBase):
    title: str = Field(min_length=1, max_length=255)
    beneficiaryName: str = Field(min_length=1, max_length=255)
    beneficiaryAccountType: str = Field(min_length=1, max_length=255)
    beneficiaryCountryCode: str = Field(min_length=1, max_length=255)
    destinationCountry: str = Field(min_length=1, max_length=255)
    destinationCurrency: str = Field(min_length=1, max_length=255)
    payoutMethod: str = Field(min_length=1, max_length=255)
    beneficiaryAccountNumber: str = Field(min_length=1, max_length=255)
    routingCodeType1: str = Field(min_length=1, max_length=255)
    routingCodeValue1: str = Field(min_length=1, max_length=255)
    beneficiaryHashId: str | None = Field(default=None, min_length=1, max_length=255)


# Properties to receive on item/transaction/beneficiary update
class ItemUpdate(ItemBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore

class TransactionUpdate(TransactionBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore

class BeneficiaryUpdate(BeneficiaryBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore
    beneficiaryName: str = Field(min_length=1, max_length=255)
    beneficiaryAccountType: str = Field(min_length=1, max_length=255)
    beneficiaryCountryCode: str = Field(min_length=1, max_length=255)
    destinationCountry: str = Field(min_length=1, max_length=255)
    destinationCurrency: str = Field(min_length=1, max_length=255)
    payoutMethod: str = Field(min_length=1, max_length=255)
    beneficiaryAccountNumber: str = Field(min_length=1, max_length=255)
    routingCodeType1: str = Field(min_length=1, max_length=255)
    routingCodeValue1: str = Field(min_length=1, max_length=255)
    beneficiaryHashId: str | None = Field(default=None, min_length=1, max_length=255)

# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(max_length=255)
    walletHashId: str = Field(max_length=255)
    status: str = Field(max_length=255)
    regulatoryRegion: str = Field(max_length=255)
    owner_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    owner: User | None = Relationship(back_populates="items")

class Transaction(TransactionBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(max_length=255)
    beneficiaryId: str = Field(min_length=1, max_length=255)
    payout_source_amount: str = Field(min_length=1, max_length=255)
    payout_source_currency: str = Field(min_length=1, max_length=255)
    message: str | None = Field(default=None, max_length=255)
    payment_id: str | None = Field(default=None, max_length=255)
    system_reference_number: str | None = Field(default=None, max_length=255)
    owner_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    owner: User | None = Relationship(back_populates="transactions")

class Beneficiary(BeneficiaryBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(max_length=255)
    beneficiaryName: str = Field(max_length=255)
    beneficiaryAccountType: str = Field(max_length=255)
    beneficiaryCountryCode: str = Field(max_length=255)
    destinationCountry: str = Field(max_length=255)
    destinationCurrency: str = Field(max_length=255)
    payoutMethod: str = Field(max_length=255)
    beneficiaryAccountNumber: str = Field(max_length=255)
    routingCodeType1: str = Field(max_length=255)
    routingCodeValue1: str = Field(max_length=255)
    owner_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    owner: User | None = Relationship(back_populates="beneficiaries")


# Properties to return via API, id is always required
class ItemPublic(ItemBase):
    id: int
    owner_id: int

class TransactionPublic(TransactionBase):
    id: int
    owner_id: int

class BeneficiaryPublic(BeneficiaryBase):
    id: int
    owner_id: int

class ItemsPublic(SQLModel):
    data: list[ItemPublic]
    count: int

class TransactionsPublic(SQLModel):
    data: list[TransactionPublic]
    count: int

class BeneficiariesPublic(SQLModel):
    data: list[BeneficiaryPublic]
    count: int

# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: int | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)

# Generic request
class RequestBodyModel(RootModel[dict[str, Any]]):
    pass
