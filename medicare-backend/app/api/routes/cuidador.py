from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app.schemas.cuidador import CuidadorCreate, CuidadorOut
from app.services import cuidador_service
from app.deps.db import get_db

router = APIRouter(prefix="/cuidadores", tags=["Cuidadores"])

@router.post("/", response_model=CuidadorOut)
def criar(cuidador: CuidadorCreate, db: Session = Depends(get_db)):
    return cuidador_service.criar_cuidador(db, cuidador)

@router.get("/", response_model=List[CuidadorOut])
def listar(db: Session = Depends(get_db)):
    return cuidador_service.listar_cuidadores(db)