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
    print(id)
    return db.query(Cuidador).filter(Cuidador.id == id).first()


def buscar_por_email(db: Session, email: str):
    return db.query(Cuidador).filter(Cuidador.email == email).first()


def atualizar_cuidador(db: Session, id: int, dados: CuidadorUpdate):
    db_cuidador = db.query(Cuidador).filter(Cuidador.id == id).first()
    if not db_cuidador:
        raise HTTPException(status_code=404, detail="Cuidador não encontrado")

    for campo, valor in dados.model_dump(exclude_unset=True).items():
        setattr(db_cuidador, campo, valor)

    db.commit()
    db.refresh(db_cuidador)
    return db_cuidador


def excluir_cuidador(db: Session, id: int) -> bool:
    cuidador = db.query(Cuidador).filter(Cuidador.id == id).first()
    if not cuidador:
        return False

    db.delete(cuidador)
    db.commit()
    return True

