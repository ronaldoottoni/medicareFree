from sqlalchemy.orm import Session
from app.models.residente import Residente
from app.schemas.residente import ResidenteCreate


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


def atualizar_residente(db: Session, id: int, dados: ResidenteCreate):
    residente = buscar_residente(db, id)
    if not residente:
        return None
    for key, value in dados.model_dump().items():
        setattr(residente, key, value)
    db.commit()
    db.refresh(residente)
    return residente


def remover_residente(db: Session, id: int):
    residente = buscar_residente(db, id)
    if not residente:
        return None
    db.delete(residente)
    db.commit()
    return residente
