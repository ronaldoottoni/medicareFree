from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.cuidador import Cuidador
from app.schemas.cuidador import CuidadorCreate, CuidadorUpdate
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
    return db.query(Cuidador).filter(Cuidador.id == id).first()


def buscar_por_email(db: Session, email: str):
    return db.query(Cuidador).filter(Cuidador.email == email).first()


def atualizar_cuidador(db: Session, id: int, dados: CuidadorUpdate):
    cuidador = buscar_cuidador(db, id)
    if not cuidador:
        raise HTTPException(status_code=404, detail="Cuidador não encontrado")

    for campo, valor in dados.model_dump(exclude_unset=True).items():
        setattr(cuidador, campo, valor)

    db.commit()
    db.refresh(cuidador)
    return cuidador


def excluir_cuidador(db: Session, id: int) -> bool:
    cuidador = buscar_cuidador(db, id)
    if not cuidador:
        return False

    db.delete(cuidador)
    db.commit()
    return True
