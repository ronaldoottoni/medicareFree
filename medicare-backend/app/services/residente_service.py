from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.residente import Residente
from app.schemas.residente import ResidenteCreate, ResidenteUpdate
import logging

logger = logging.getLogger(__name__)


def criar_residente(db: Session, residente: ResidenteCreate):
    db_residente = Residente(**residente.model_dump())
    db.add(db_residente)
    db.commit()
    db.refresh(db_residente)
    return db_residente


def listar_residentes(db: Session):
    return db.query(Residente).all()


def buscar_residente(db: Session, id: int):
    return db.query(Residente).filter(Residente.id == id).first()


def atualizar_residente(db: Session, id: int, dados: ResidenteUpdate):
    residente = buscar_residente(db, id)
    if not residente:
        raise HTTPException(status_code=404, detail="Residenteuidador não encontrado")

    for campo, valor in dados.model_dump(exclude_unset=True).items():
        setattr(residente, campo, valor)

    db.commit()
    db.refresh(residente)
    return residente


def excluir_residente(db: Session, id: int) -> bool:
    residente = buscar_residente(db, id)
    if not residente:
        return False

    db.delete(residente)
    db.commit()
    return True
