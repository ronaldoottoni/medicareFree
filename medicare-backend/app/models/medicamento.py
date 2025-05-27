from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from app.core.database import Base

class Medicamento(Base):
    __tablename__ = "medicamentos"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    descricao = Column(Text)
    tipo = Column(String(50))
    observacoes = Column(Text)
    data_cadastro = Column(DateTime, default=datetime.utcnow)