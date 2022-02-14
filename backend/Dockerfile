FROM python:3.9-alpine

COPY . /opt/backend

WORKDIR /opt/backend

RUN pip install pipenv && \
    pipenv install

EXPOSE 8000

CMD ["pipenv", "run", "start"]
