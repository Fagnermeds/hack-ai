FROM python:3.10-slim

RUN apt-get update && apt-get install -y libpq-dev

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080

CMD ["python3", "server.py"]