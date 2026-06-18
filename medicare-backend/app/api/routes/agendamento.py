from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import date, datetime
from typing import List
from app.schemas.agendamento import AgendamentoCreate, AgendamentoOut, AtualizarStatus
from app.services import agendamento_service
from app.deps.auth import get_db, get_current_user
from typing import Optional
from app.models.cuidador import Cuidador
from app.models.agendamento import Agendamento
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
    somenteMeu: bool = Query(False),
    db: Session = Depends(get_db),
    user: Cuidador = Depends(get_current_user),
):
    agora = datetime.utcnow()
    logger.info(f"📅 Listando agendamentos pendentes até {agora.isoformat()}")
    logger.info(f"🔒 Filtro 'somenteMeu' ativado: {somenteMeu} (User ID: {user.id})")

    """ query = db.query(Agendamento).filter(
        Agendamento.horario <= agora,
        Agendamento.status == "pendente"
    ).order_by(
        Agendamento.horario
    ) """
    
    query = db.query(Agendamento).order_by(
        Agendamento.horario
    )

    if somenteMeu:
        query = query.filter(Agendamento.id_cuidador == user.id)

    agendamentos = query.all()
    logger.info(f"🔍 {len(agendamentos)} agendamentos encontrados")
    return agendamentos


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
