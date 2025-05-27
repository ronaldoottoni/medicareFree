from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from app.core.database import Base

class Residente(Base):
    __tablename__= "residentes"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    data_nascimento = Column(DateTime, nullable=False)
    sexo = Column(String(1), nullable=False)  # 'M', 'F', etc.
    observacoes = Column(Text)
    data_cadastro = Column(DateTime, default=datetime.utcnow)    