from sqlalchemy.orm import Session
from app.models.cuidador import Cuidador
from app.schemas.cuidador import CuidadorCreate
from app.core.security import gerar_hash_senha


def criar_cuidador(db: Session, cuidador: CuidadorCreate):
    senha_hash = gerar_hash_senha(cuidador.senha)

    db_cuidador = Cuidador(
        nome=cuidador.nome,
        email=cuidador.email,
        telefone=cuidador.telefone,
        senha_hash=senha_hash,
    )
    db.add(db_cuidador)
    db.commit()
    db.refresh(db_cuidador)
    return db_cuidador


def listar_cuidadores(db: Session):
    return db.query(Cuidador).all()


def buscar_cuidador(db: Session, id: int):
    print(id)
    return db.query(Cuidador).filter(Cuidador.id == id).first()


def buscar_por_email(db: Session, email: str):
    return db.query(Cuidador).filter(Cuidador.email == email).first()
