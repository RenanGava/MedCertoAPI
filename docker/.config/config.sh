#!/bin/bash

yarn install
yarn build

echo Instalação das dependencias e build da Api Pronto!
sleep 5

echo Realizando as Migrações do Banco de dados e Aplicando e aplicando a Config do Prisma
sleep 5

yarn prisma generate
yarn prisma migrate deploy


echo Iniciando a API
sleep 5

if [ "$NODE_ENV" = "production" ]; then
  echo "Ambiente de produção"
  yarn start
else
  echo "Ambiente de dev"
  yarn dev
fi
# Pega o mesmo ID do processo iniciado pelo docker.
exec "$@"