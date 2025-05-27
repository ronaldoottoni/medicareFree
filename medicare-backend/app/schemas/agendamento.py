from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class AgendamentoBase(BaseModel):
    id_residente: int
    id_medicamento: int
    id_cuidador: int
    horario: datetime
    dose: Optional[str] = None
    observacoes: Optional[str] = None
    status: Optional[str] = None


class AgendamentoCreate(AgendamentoBase):
    pass


class AgendamentoOut(AgendamentoBase):
    id: int
    data_registro: datetime

    class Config:
        orm_mode = True