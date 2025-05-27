from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.core.database import Base

class Cuidador(Base):
    __tablename__ = "cuidadores"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    senha_hash = Column(String(60), nullable=False)
    telefone = Column(String(15), nullable=True)
    data_cadastro = Column(DateTime, default=datetime.utcnow)
    