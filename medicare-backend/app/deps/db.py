from app.core.database import Sessionlocal
from sqlalchemy.orm import Session
from fastapi import Depends

def get_db():
    db = Sessionlocal()
    try:
        yield db
    finally:
        db.close()