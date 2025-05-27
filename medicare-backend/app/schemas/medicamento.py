from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class MedicamentoBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    tipo: Optional[str] = None
    observacoes: Optional[str] = None


class MedicamentoCreate(MedicamentoBase):
    pass


class MedicamentoOut(MedicamentoBase):
    id: int
    data_cadastro: datetime

    class Config:
        orm_mode = True
