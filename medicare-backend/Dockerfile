FROM python:3.11

# Instala dependências de sistema, incluindo netcat
RUN apt-get update && apt-get install -y netcat-openbsd

# Define diretório de trabalho
WORKDIR /code

# Copia os requirements e instala as dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante da aplicação
COPY . .

# Expõe a porta do backend
EXPOSE 8000

# Copia o script que aguarda o banco
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

# Usa o script como ponto de entrada (ele chama o uvicorn depois)
CMD ["/wait-for-db.sh"]
