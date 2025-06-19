from sqlalchemy.orm import Session
from sqlalchemy import and_, func
from app.models.agendamento import Agendamento
from app.schemas.agendamento import AgendamentoCreate
from typing import Optional
from datetime import date, timedelta, datetime, time


def criar_agendamento(db: Session, agendamento: AgendamentoCreate):
    dias = int(agendamento.dias)
    intervalo = int(agendamento.intervalo)
    dataPri = agendamento.dataPriDose
    horaPri = agendamento.horaPriDose
    
    data_hora_inicial = datetime.strptime(f"{dataPri} {horaPri}", "%Y-%m-%d %H:%M")
    data_hora_final = data_hora_inicial + timedelta(days=dias)

    horarios = []
    atual = data_hora_inicial

    while atual <= data_hora_final:
        horarios.append(atual)
        atual += timedelta(hours=intervalo)

    agendamentos_gerados = []
    for horario in horarios:
        novo = Agendamento(
            id_residente=agendamento.id_residente,
            id_cuidador=agendamento.id_cuidador,
            id_medicamento=agendamento.id_medicamento,
            horario=horario,
            dose=agendamento.dosagem,
            status="A",
        )
        db.add(novo)
        agendamentos_gerados.append(novo)

    db.commit()
    return agendamentos_gerados


def listar_agendamentos(
    db: Session, data: Optional[date] = None, status: Optional[str] = None
):
    query = db.query(Agendamento)

    if data:
        query = query.filter(func.date(Agendamento.horario) == data)
    if status:
        query = query.filter(Agendamento.status == status)

    return query.all()


def listar_por_residente(db: Session, id_residente: int):
    return db.query(Agendamento).filter(Agendamento.id_residente == id_residente).all()


def buscar_agendamento(db: Session, id: int):
    return db.query(Agendamento).filter(Agendamento.id == id).first()


def atualizar_agendamento(db: Session, id: int, dados: AgendamentoCreate):
    agendamento = buscar_agendamento(db, id)
    if not agendamento:
        return None
    for key, value in dados.model_dump().items():
        setattr(agendamento, key, value)
    db.commit()
    db.refresh(agendamento)
    return agendamento


def remover_agendamento(db: Session, id: int):
    agendamento = buscar_agendamento(db, id)
    if not agendamento:
        return None
    db.delete(agendamento)
    db.commit()
    return agendamento


def buscar_alertas(db: Session, id_cuidador: Optional[int] = None):
    agora = datetime.now()
    inicio = agora - timedelta(minutes=30)
    fim = agora + timedelta(minutes=30)

    query = db.query(Agendamento).filter(
        func.date(Agendamento.horario) == agora.date(),
        Agendamento.status == "pendente",
        Agendamento.horario.between(inicio, fim),
    )

    if id_cuidador:
        query = query.filter(Agendamento.id_cuidador == id_cuidador)

    return query.all()


def atualizar_status(db: Session, id: int, novo_status: str):
    agendamento = buscar_agendamento(db, id)
    if not agendamento:
        return None
    agendamento.status = novo_status
    db.commit()
    db.refresh(agendamento)
    return agendamento
