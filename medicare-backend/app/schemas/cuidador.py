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
        from_attributes  = True


class CuidadorLogin(BaseModel):
    email: EmailStr
    senha: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
