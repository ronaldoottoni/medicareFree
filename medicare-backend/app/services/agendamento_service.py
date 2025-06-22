from sqlalchemy.orm import Session
from sqlalchemy import and_, func
from app.models.agendamento import Agendamento
from app.schemas.agendamento import AgendamentoCreate
from typing import Optional
from datetime import date, timedelta, datetime, time
import logging


def criar_agendamento(db: Session, agendamento: AgendamentoCreate):
    dias = int(agendamento.dias)
    intervalo = int(agendamento.intervalo)
    dataPri = agendamento.dataPriDose
    horaPri = agendamento.horaPriDose
    horaPri = horaPri.strftime("%H:%M")

    logger = logging.getLogger(__name__)

    data_hora_inicial = datetime.strptime(f"{dataPri} {horaPri}", "%Y-%m-%d %H:%M")

    horarios = []
    atual = data_hora_inicial

    dosesDia = int(24 / intervalo)
    dosesTotal = dosesDia * dias

    logger.info(f"⏳ Calculando horários com base nos dados: {agendamento}")
    for x in range(dosesTotal):
        if x > 0:
            atual += timedelta(hours=intervalo)
        horarios.append(atual)

    agendamentos_gerados = []
    for horario in horarios:
        novo = Agendamento(
            id_residente=agendamento.id_residente,
            id_cuidador=agendamento.id_cuidador,
            id_medicamento=agendamento.id_medicamento,
            horario=horario,
            dose=agendamento.dosagem,
            status="pendente",
        )
        db.add(novo)
        agendamentos_gerados.append(novo)

    db.commit()
    return agendamentos_gerados[-1]


def listar_agendamentos(
    db: Session, data: Optional[date] = None, status: Optional[str] = None
):
    query = db.query(Agendamento)
    status = "pendente"
    
    if data:
        query = query.filter(func.date(Agendamento.horario) == data)
    if status:
        query = query.filter(Agendamento.status == status)
        
    query = query.order_by(Agendamento.horario.asc())

    return query.all()


def listar_por_residente(db: Session, id_residente: int):
    return db.query(Agendamento).filter(Agendamento.id_residente == id_residente).all()


def buscar_agendamento(db: Session, id: int):
    return db.query(Agendamento).filter(Agendamento.id == id).first()


def atualizar_status(db: Session, id: int, novo_status: str):
    agendamento = buscar_agendamento(db, id)
    if not agendamento:
        return None
    agendamento.status = novo_status
    db.commit()
    db.refresh(agendamento)
    return agendamento
