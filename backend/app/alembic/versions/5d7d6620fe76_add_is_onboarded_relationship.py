"""Add is_onboarded relationship

Revision ID: 5d7d6620fe76
Revises: 5752007e8326
Create Date: 2024-07-12 19:13:21.151351

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '5d7d6620fe76'
down_revision = '5752007e8326'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('is_onboarded', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'is_onboarded')
    # ### end Alembic commands ###
