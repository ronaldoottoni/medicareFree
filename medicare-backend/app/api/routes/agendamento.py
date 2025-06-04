from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date
from typing import List
from app.schemas.agendamento import AgendamentoCreate, AgendamentoOut, AtualizarStatus
from app.services import agendamento_service
from app.deps.auth import get_db, get_current_user
from app.models.cuidador import Cuidador
from typing import Optional

router = APIRouter(prefix="/agendamento", tags=["Agendamentos"])


@router.post("/", response_model=AgendamentoOut)
def criar(
    agendamento: AgendamentoCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return agendamento_service.criar_agendamento(db, agendamento)


@router.get("/", response_model=List[AgendamentoOut])
def listar(db: Session = Depends(get_db), user=Depends(get_current_user)):
    data: Optional[date] = (Query(None, description="Filtrar por data (YYYY-MM-DD)"),)
    status: Optional[str] = (Query(None, description="Filtrar por status"),)
    return agendamento_service.listar_agendamentos(db, data, status)


@router.get("/residente/{id_residente}", response_model=List[AgendamentoOut])
def listar_residente(
    id_residente: int, db: Session = Depends(get_db), user=Depends(get_current_user)
):
    return agendamento_service.listar_por_residente(db, id_residente)


@router.get("/{id}", response_model=AgendamentoOut)
def buscar(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    agendamento = agendamento_service.buscar_agendamento(db, id)
    if not agendamento:
        return HTTPException(status_code=404, detail="Agendamento não encontrado")
    return agendamento


@router.put("/{id}", response_model=AgendamentoOut)
def atualizar(
    id: int,
    dados: AgendamentoCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    atualizado = agendamento_service.atualizar_agendamento(db, id, dados)
    if not atualizado:
        raise HTTPException(status_code=4 - 4, detail="Agendamento não encontrado")
    return atualizado


@router.delete("/{id}")
def remover(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    removido = agendamento_service.remover_agendamento(db, id)
    if not removido:
        raise HTTPException(status_code=404, detail="Agendamento não removido")
    return {"ok": True, "message": "Agendamento removido com sucesso"}


@router.get("/alertas", response_model=List[AgendamentoOut])
def alertas(
    somente_meus: Optional[bool] = False,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    id_cuidador = user.id if somente_meus else None
    return agendamento_service.buscar_alertas(db, id_cuidador)


@router.patch("/{id}/status", response_model=AgendamentoOut)
def atualizar_status(
    id: int,
    payload: AtualizarStatus,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    atualizado = agendamento_service.atualizar_status(db, id, payload.status)
    if not atualizado:
        raise HTTPException(status_code=404, detail="Agendamento não atualizado")
    return atualizado
