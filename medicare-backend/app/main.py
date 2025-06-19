from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import residente
from app.api.routes import cuidador
from app.api.routes import medicamento
from app.api.routes import agendamento

app = FastAPI()

origins = [
    "http://localhost:3000",  # frontend dev
    # Adicione outros domínios se necessário
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,              # ou ["*"] para liberar tudo
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