from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.residente import ResidenteCreate, ResidenteOut
from app.services import residente_service
from app.deps.auth import get_db, get_current_user

router = APIRouter(prefix="/residentes", tags=["Residentes"])

@router.post("/register", response_model=ResidenteOut)
def criar(
    residente: ResidenteCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return residente_service.criar_residente(db, residente)


@router.get("/listar", response_model=List[ResidenteOut])
def listar(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return residente_service.listar_residentes(db)


@router.get("/{id}", response_model=ResidenteOut)
def buscar(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    residente = residente_service.buscar_residente(db, id)
    if not residente_service:
        raise HTTPException(status_code=404, detail="Residente não encontrado")
    return residente


@router.put("/{id}", response_model=ResidenteOut)
def atualizar(
    id: int,
    dados: ResidenteCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    atualizado = residente_service.atualizar_residente(db, id, dados)
    if not atualizado:
        return HTTPException(status_code=404, detail="Residente não encontrado")
    return atualizado


@router.delete("/{id}")
def remover(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    removido = residente_service.remover_residente(db, id)
    if not removido:
        return HTTPException(status_code=404, detail="Residente não removido")
    return {"ok": True, "message": "Residente removido com sucesso"}
