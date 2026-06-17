FROM node:24-alpine

WORKDIR /app

# Copia os arquivos de dependências primeiro (otimiza o cache do Docker)
COPY package*.json ./

RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta padrão (5173 para Vite ou 8080 para Vue CLI)
EXPOSE 3000

# Executa o comando de desenvolvimento liberando o host para a rede do Docker
CMD ["npm", "run", "dev"]
