from sqlalchemy.orm import Session
from app.models.residente import Residente
from app.schemas.residente import ResidenteCreate

def criar_residente(db: Session, residente: ResidenteCreate):
    db_residente = Residente(**residente.dict())
    db.add(db_residente)
    db.commit()
    db.refresh(db_residente)
    return db_residente

def listar_residentes(db: Session):
    return db.query(Residente).all()