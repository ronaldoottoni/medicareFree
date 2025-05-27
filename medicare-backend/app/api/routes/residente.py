from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.residente import ResidenteCreate, ResidenteOut
from app.services import residente_service
from app.deps.db import get_db
from typing import List

router = APIRouter(prefix="/residentes", tags=["Residentes"])

@router.post("/", response_model=ResidenteOut)
def criar(residente: ResidenteCreate, db: Session = Depends(get_db)):
    return residente_service.criar_residente(db, residente)

@router.get("/", response_model=List[ResidenteOut])
def listar(db: Session = Depends(get_db)):
    return residente_service.listar_residentes(db)