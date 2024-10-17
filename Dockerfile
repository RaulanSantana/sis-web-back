# Use a imagem oficial do PostgreSQL
FROM postgres:latest

# Defina a variável de ambiente para configurar o Postgres para criar o banco de dados
ENV POSTGRES_DB blog

# Copie o script SQL para criar o banco de dados
# COPY init.sql /docker-entrypoint-initdb.d/

# Defina a porta padrão para o PostgreSQL
EXPOSE 5432

FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install pm2 -g
RUN npm install concurrently -g
RUN npm install jest -g
RUN npm install

RUN apt-get update && apt-get install -y libaio1

RUN chown node:node -R /usr/src/app/node_modules

USER node
EXPOSE 8080

CMD [ "node", "server.js" ]
