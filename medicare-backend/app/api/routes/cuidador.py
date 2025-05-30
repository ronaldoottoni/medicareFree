from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.cuidador import CuidadorCreate, CuidadorOut, CuidadorLogin, Token
from app.services import cuidador_service
from app.core.security import verificar_senha, criar_token
from app.deps.auth import get_db, get_current_user

router = APIRouter(prefix="/cuidadores", tags=["Cuidadores"])

@router.post("/", response_model=CuidadorOut)
def criar(cuidador: CuidadorCreate, db: Session = Depends(get_db)):
    return cuidador_service.criar_cuidador(db, cuidador)

@router.get("/", response_model=List[CuidadorOut])
def listar(db: Session = Depends(get_db)):
    return cuidador_service.listar_cuidadores(db)

# def register

# def login

# def get_me