from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ResidenteBase(BaseModel):
    nome: str
    data_nascimento: datetime
    sexo: str
    observacoes: Optional[str] = None


class ResidenteCreate(ResidenteBase):
    nome: str
    data_nascimento: str
    sexo: str
    observacoes: str


class ResidenteOut(ResidenteBase):
    id: int
    data_cadastro: datetime

    class Config:
        from_attributes = True


class ResidenteUpdate(BaseModel):
    nome: Optional[str]
    data_nascimento: Optional[str]
    sexo: Optional[str]
    observacoes: Optional[str]