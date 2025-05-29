from sqlalchemy.orm import Session
from app.models.cuidador import Cuidador
from app.schemas.cuidador import CuidadorCreate


def criar_cuidador(db: Session, cuidador: CuidadorCreate):
    db_cuidador = Cuidador(**cuidador.dict())
    db.add(db_cuidador)
    db.commit()
    db.refresh(db_cuidador)
    return db_cuidador


def listar_cuidadores(db: Session):
    return db.query(Cuidador).all()
