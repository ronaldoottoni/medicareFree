from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date
from typing import List
from app.schemas.agendamento import AgendamentoCreate, AgendamentoOut, AtualizarStatus
from app.services import agendamento_service
from app.deps.auth import get_db, get_current_user
from typing import Optional
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/agendamentos", tags=["Agendamentos"])


@router.post("/register", response_model=AgendamentoOut)
def criar(
    agendamento: AgendamentoCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    logger.info("🔄 Iniciando criação de agendamento")
    logger.info(f"📦 Payload recebido: {agendamento}")
    logger.info(f"👤 Usuário autenticado: {user.email}")

    return agendamento_service.criar_agendamento(db, agendamento)


@router.get("/alertas", response_model=List[AgendamentoOut])
def listar_agendamentos(
    data: Optional[date] = Query(None, description="Filtrar por data (YYYY-MM-DD)"),
    status: Optional[str] = Query(None, description="Filtrar por status"),
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return agendamento_service.listar_agendamentos(db, data, status)


@router.patch("/{id}/status", response_model=AgendamentoOut)
def atualizar_status(
    id: int,
    payload: AtualizarStatus,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    atualizado = agendamento_service.atualizar_status(db, id, payload.status)
    if not atualizado:
        raise HTTPException(status_code=4 - 4, detail="Agendamento não encontrado")
    return atualizado
