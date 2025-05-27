from app.core.database import Base, engine
from app.models import cuidador, residente, medicamento, agendamento

def create_tables():
    """Create all tables in the database."""
    Base.metadata.create_all(bind=engine)
    print("✅ Tabelas criadas com sucesso.")

if __name__ == "__main__":
    create_tables()