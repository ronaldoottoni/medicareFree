from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class CuidadorBase(BaseModel):
    nome: str
    email: EmailStr
    telefone: str


class CuidadorCreate(CuidadorBase):
    senha: str


class CuidadorOut(CuidadorBase):
    id: int
    data_cadastro: datetime

    class Config:
        orm_mode = True
