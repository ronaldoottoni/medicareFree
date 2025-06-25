from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import residente, cuidador, medicamento, agendamento
from app.db.session import engine
from app.models import base

import logging

# Configuração de logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Instância do FastAPI
app = FastAPI(
    title="Medicare Free API",
    description="API para gerenciamento de residentes, cuidadores, medicamentos e agendamentos",
    version="1.0.0"
)

# CORS: permita frontends locais ou remotos se necessário
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ou ["*"] se quiser liberar geral
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclui as rotas
app.include_router(cuidador.router)
app.include_router(residente.router)
app.include_router(medicamento.router)
app.include_router(agendamento.router)

# Criação automática das tabelas no banco
@app.on_event("startup")
def on_startup():
    logger.info("🛠️ Criando tabelas no banco de dados, se não existirem...")
    base.Base.metadata.create_all(bind=engine)

# Endpoint de status
@app.get("/")
def read_root():
    return {"message": "Medicare Free API 🚀"}
