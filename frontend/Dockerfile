FROM node:14-slim

WORKDIR /frontend

COPY . .

RUN npm i

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD [ "start" ]
