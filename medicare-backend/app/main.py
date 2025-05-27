from fastapi import FastAPI
from app.api.routes import residente

app = FastAPI()

app.include_router(residente.router)

@app.get("/")
def read_root():
    return {"message": "Medicar Free API 🚀"}