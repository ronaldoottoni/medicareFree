from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ResidenteBase(BaseModel):
    nome: str
    data_nascimento: datetime
    sexo: str
    observacoes: Optional[str] = None

class ResidenteCreate(ResidenteBase):
    pass

class ResidenteOut(ResidenteBase):
    id: int
    data_cadastro: datetime
    
    class Config:
        from_attributes  = True