from fastapi import FastAPI
from app.api.routes import residente
from app.api.routes import cuidador

app = FastAPI()

app.include_router(residente.router)
app.include_router(cuidador.router)

@app.get("/")
def read_root():
    return {"message": "Medicar Free API 🚀"}