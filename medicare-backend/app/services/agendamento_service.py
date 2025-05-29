from sqlalchemy.orm import Session
from app.models.agendamento import Agendamento
from app.schemas.agendamento import AgendamentoCreate


def criar_agendamento(db: Session, agendamento: AgendamentoCreate):
    db_agendamento = Agendamento(**agendamento.dict())
    db.add(db_agendamento)
    db.commit()
    db.refresh(db_agendamento)
    return db_agendamento


def listar_agendamento(db: Session):
    return db.query(Agendamento).all()
