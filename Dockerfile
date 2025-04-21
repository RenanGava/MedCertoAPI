FROM bitnami/node

ARG PORT
ARG NODE_ENV
ARG DATABASE_URL

# Define O Diretório Principal do App
WORKDIR /app

# Copia os Arquivos Necessários para o App Funcionar
COPY . .
COPY ../../tsconfig.json .
COPY ../../package.json .
COPY ../../yarn.lock .

RUN chmod +x ./docker/.config/config.sh

ENTRYPOINT ["bash", "./docker/.config/config.sh"]



