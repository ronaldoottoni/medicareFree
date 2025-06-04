from fastapi import FastAPI
from app.api.routes import residente
from app.api.routes import cuidador
from app.api.routes import medicamento
from app.api.routes import agendamento

app = FastAPI()

app.include_router(residente.router)
app.include_router(cuidador.router)
app.include_router(medicamento.router)
app.include_router(agendamento.router)

@app.get("/")
def read_root():
    return {"message": "Medicar Free API 🚀"}