from sqlalchemy.orm import Session
from app.models.medicamento import Medicamento
from app.schemas.medicamento import MedicamentoCreate

def criar_medicamento(db: Session, medicamento: MedicamentoCreate):
    db_medicamento = Medicamento(**medicamento.dict())
    db.add(db_medicamento)
    db.commit()
    db.refresh(db_medicamento)
    return db_medicamento

def listar_medicamentos(db: Session):
    return db.query(Medicamento).all()