from pydantic import BaseModel, Field
from datetime import datetime, date, time
from typing import Optional

from .residente import ResidenteOut
from .cuidador import CuidadorOut
from .medicamento import MedicamentoOut


class AgendamentoBase(BaseModel):
    id_residente: int
    id_medicamento: int
    id_cuidador: int
    horario: datetime
    dose: Optional[str] = None
    status: Optional[str] = None


class AgendamentoCreate(BaseModel):
    id_residente: int
    id_cuidador: int
    id_medicamento: int
    dosagem: str
    intervalo: int  # em horas
    dias: int
    dataPriDose: date
    horaPriDose: time


class AgendamentoOut(BaseModel):
    id: int
    horario: datetime
    dose: str
    status: str
    id_residente: int
    id_cuidador: int
    id_medicamento: int
    residente: Optional[ResidenteOut]
    cuidador: Optional[CuidadorOut]
    medicamento: Optional[MedicamentoOut]

    class Config:
        from_attributes = True


class AtualizarStatus(BaseModel):
    status: str
