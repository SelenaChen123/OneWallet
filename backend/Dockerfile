FROM python:3.9

ENV FLASK_APP server
ENV FLASK_ENV development

WORKDIR /backend

COPY . .

RUN pip install -r requirements.txt && \
    python init_db.py

EXPOSE 5000

ENTRYPOINT [ "python" ]

CMD [ "server.py" ]
