from sqlalchemy.orm import Session
from app.models.medicamento import Medicamento
from app.schemas.medicamento import MedicamentoCreate


def criar_medicamento(db: Session, medicamento: MedicamentoCreate):
    db_medicamento = Medicamento(**medicamento.model_dump())
    db.add(db_medicamento)
    db.commit()
    db.refresh(db_medicamento)
    return db_medicamento


def listar_medicamentos(db: Session):
    return db.query(Medicamento).all()


def buscar_medicamento(db: Session, id: int):
    return db.query(Medicamento).filter(Medicamento.id == id).first()


def atualizar_medicamento(db: Session, id: int, dados: MedicamentoCreate):
    medicamento = buscar_medicamento(db, id)
    if not medicamento:
        return None
    for key, value in dados.model_dump().items():
        setattr(medicamento, key, value)
    db.commit()
    db.refresh(medicamento)
    return medicamento


def remover_medicamento(db: Session, id: int):
    medicamento = buscar_medicamento(db, id)
    if not medicamento:
        return None
    db.delete(medicamento)
    db.commit()
    return medicamento
