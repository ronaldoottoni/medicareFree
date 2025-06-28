#!/bin/sh

echo "⏳ Aguardando o banco de dados em $MYSQL_HOST:$MYSQL_PORT..."

# Espera o banco responder
while ! nc -z $MYSQL_HOST $MYSQL_PORT; do
  sleep 1
done

echo "✅ Banco de dados disponível. Iniciando o backend..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
