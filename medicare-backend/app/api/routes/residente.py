from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.residente import ResidenteCreate, ResidenteOut, ResidenteUpdate
from app.services import residente_service
from app.deps.auth import get_db, get_current_user

import logging

router = APIRouter(prefix="/residentes", tags=["Residentes"])

logger = logging.getLogger(__name__)


@router.post("/register", response_model=ResidenteOut)
def criar(
    residente: ResidenteCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return residente_service.criar_residente(db, residente)


@router.put("/{id}", response_model=ResidenteOut)
def atualizar_residente(
    id: int,
    residente: ResidenteUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    existente = residente_service.buscar_residente(db, id)
    if not existente:
        raise HTTPException(status_code=404, detail="Residente não encontrado")
    return residente_service.atualizar_residente(db, id, residente)


@router.get("/listar", response_model=List[ResidenteOut])
def listar(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return residente_service.listar_residentes(db)


@router.delete("/excluir/{id}")
def excluir_residente(
    id: int, db: Session = Depends(get_db), user=Depends(get_current_user)
):
    sucesso = residente_service.excluir_residente(db, id)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Residente não encontrado")
    return {"ok": True, "message": "Residente excluíd com sucesso"}


@router.get("/{id}", response_model=ResidenteOut)
def buscar_residente(
    id: int, db: Session = Depends(get_db), user=Depends(get_current_user)
):
    """logger.info(f"🔍 Buscando residente com ID: {id}")"""
    residente = residente_service.buscar_residente(db, id)
    if not residente:
        raise HTTPException(status_code=404, detail="Residente não encontrado")
    return residente
