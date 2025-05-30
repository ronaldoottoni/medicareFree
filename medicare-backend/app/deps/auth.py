from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from app.core.security import verificar_token
from app.core.database import Sessionlocal
from app.models.cuidador import Cuidador
from sqlalchemy.orm import Session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="cuidadores/login")


def get_db():
    db = Sessionlocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> Cuidador:
    payload = verificar_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Token inválido")
    user = db.query(Cuidador).filter(Cuidador.email == payload["sub"]).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user
