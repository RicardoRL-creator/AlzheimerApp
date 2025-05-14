# Use uma imagem Node.js LTS
FROM node:18-alpine AS development

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Instale o Expo CLI globalmente no container, se necessário para comandos específicos
# RUN npm install -g expo-cli

# Copie o restante do código do projeto para o diretório de trabalho
COPY . .

# Exponha as portas necessárias para o Expo Metro Bundler e DevTools
EXPOSE 8081
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Comando padrão para iniciar o servidor de desenvolvimento Expo
# O '--host lan' é o valor aceito pela CLI para escutar em todas as interfaces
CMD ["npx", "expo", "start", "--host", "lan"]
