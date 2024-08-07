"""Transactions model extended for Nium's data

Revision ID: 25f35e9e156a
Revises: c000f49f3d6a
Create Date: 2024-07-17 03:43:07.590593

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '25f35e9e156a'
down_revision = 'c000f49f3d6a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('transaction', sa.Column('beneficiaryId', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False))
    op.add_column('transaction', sa.Column('payout_source_amount', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False))
    op.add_column('transaction', sa.Column('payout_source_currency', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=False))
    op.add_column('transaction', sa.Column('message', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=True))
    op.add_column('transaction', sa.Column('payment_id', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=True))
    op.add_column('transaction', sa.Column('system_reference_number', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('transaction', 'system_reference_number')
    op.drop_column('transaction', 'payment_id')
    op.drop_column('transaction', 'message')
    op.drop_column('transaction', 'payout_source_currency')
    op.drop_column('transaction', 'payout_source_amount')
    op.drop_column('transaction', 'beneficiaryId')
    # ### end Alembic commands ###
