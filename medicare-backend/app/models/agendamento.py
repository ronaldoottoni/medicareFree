from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class Agendamento(Base):
    __tablename__ = "agendamentos"

    id = Column(Integer, primary_key=True, index=True)
    id_residente = Column(Integer, ForeignKey("residentes.id"), nullable=False)
    id_medicamento = Column(Integer, ForeignKey("medicamentos.id"), nullable=False)
    id_cuidador = Column(Integer, ForeignKey("cuidadores.id"), nullable=False)
    horario = Column(DateTime, nullable=False)
    dose = Column(String(50), nullable=False)
    observacoes = Column(Text)
    status = Column(String(20), default="pendente")  # 'pendente', 'concluido', 'cancelado'
    data_registro = Column(DateTime, default=datetime.utcnow)
    
    residente = relationship("Residente")
    medicamento = relationship("Medicamento")
    cuidador = relationship("Cuidador") 