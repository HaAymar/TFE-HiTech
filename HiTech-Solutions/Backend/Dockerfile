# FROM node:18.18.0 as build
# WORKDIR /app
# COPY package*.json .
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:18.18.0 
# WORKDIR /app
# COPY package.json .
# RUN npm install --only=production
# COPY --from=build /app/dist ./dist
# CMD npm run start:prod
FROM node:18.18.0 AS build
WORKDIR /app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Liste les fichiers dans le répertoire /app pour débogage
RUN ls -la

# Installe les dépendances npm
RUN npm install

COPY . .

RUN npm run build

FROM node:18.18.0 
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package.json .
RUN npm install --only=production
CMD ["npm", "run", "start:prod"]
