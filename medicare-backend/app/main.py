from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import residente
from app.api.routes import cuidador
from app.api.routes import medicamento
from app.api.routes import agendamento
import logging

app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # Adicione outros domínios se necessário
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["*"] para liberar tudo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cuidador.router)
app.include_router(residente.router)
app.include_router(medicamento.router)
app.include_router(agendamento.router)


@app.get("/")
def read_root():
    return {"message": "Medicar Free API 🚀"}
