FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY keep_alive.py .

CMD ["python", "keep_alive.py"]