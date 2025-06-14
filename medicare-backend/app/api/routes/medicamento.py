from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from app.schemas.medicamento import MedicamentoCreate, MedicamentoOut
from app.services import medicamento_service
from app.deps.auth import get_db, get_current_user

router = APIRouter(prefix="/medicamentos", tags=["Medicamentos"])


@router.post("/register", response_model=MedicamentoOut)
def criar(
    medicamento: MedicamentoCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return medicamento_service.criar_medicamento(db, medicamento)


@router.get("/", response_model=List[MedicamentoOut])
def listar(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return medicamento_service.listar_medicamentos(db)


@router.get("/{id}", response_model=MedicamentoOut)
def buscar(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    medicamento = medicamento_service.buscar_medicamento(db, id)
    if not medicamento:
        raise HTTPException(status_code=404, detail="Medicamento não encontrado")
    return medicamento


@router.put("/{id}", response_model=MedicamentoOut)
def atualizar(
    id: int,
    dados: MedicamentoCreate,
    db: Session = Depends(get_db), user=Depends(get_current_user),
):
    atualizado = medicamento_service.atualizar_medicamento(db, id, dados)
    if not atualizado:
        return HTTPException(status_code=404, detail="Medicamento não atualizado")
    return atualizado


@router.delete("/{id}")
def remover(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    removido = medicamento_service.remover_medicamento(db, id)
    if not removido:
        return HTTPException(status_code=404, detail="Medicamento não removido")
    return {"ok": True, "message": "Medicamento removido com sucesso"}
