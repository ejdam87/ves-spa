FROM python:3.7-alpine

WORKDIR /usr/src/app

RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add jpeg-dev zlib-dev libjpeg

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN apk del build-deps

COPY . .
EXPOSE 5000
ENV FLASK_APP=main.py
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]
