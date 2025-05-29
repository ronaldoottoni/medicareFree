from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app.schemas.medicamento import MedicamentoCreate, MedicamentoOut
from app.services import medicamento_service
from app.deps.db import get_db

router = APIRouter(prefix="/medicamentos", tags=["Medicamentos"])

@router.post("/", response_model=MedicamentoOut)
def criar(medicamento: MedicamentoCreate, db: Session = Depends(get_db)):
    return medicamento_service.criar_medicamento(db, medicamento)

@router.get("/", response_model=List[MedicamentoOut])
def listar(db: Session = Depends(get_db)):
    return medicamento_service.listar_medicamentos(db)