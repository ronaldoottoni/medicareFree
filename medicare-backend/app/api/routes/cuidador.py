from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.cuidador import CuidadorCreate, CuidadorOut, CuidadorLogin, Token
from app.services import cuidador_service
from app.core.security import verificar_senha, criar_token
from app.deps.auth import get_db, get_current_user

router = APIRouter(prefix="/cuidadores", tags=["Cuidadores"])


@router.post("/register", response_model=CuidadorOut)
def register(cuidador: CuidadorCreate, db: Session = Depends(get_db)):
    existente = cuidador_service.buscar_por_email(db, cuidador.email)
    if existente:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado")
    return cuidador_service.criar_cuidador(db, cuidador)


@router.post("/login", response_model=Token)
def login(login_data: CuidadorLogin, db: Session = Depends(get_db)):
    user = cuidador_service.buscar_por_email(db, login_data.email)

    if not user:
        raise HTTPException(status_code=401, detail="Email não encontrado")

    if not user.senha_hash:
        raise HTTPException(status_code=500, detail="Usuário sem senha registrada")

    if not verificar_senha(login_data.senha, user.senha_hash):
        raise HTTPException(status_code=401, detail="Senha inválida")

    token = criar_token({"sub": user.email})
    return {"access_token": token}


@router.get("/me", response_model=CuidadorOut)
def get_me(current_user=Depends(get_current_user)):
    return current_user
