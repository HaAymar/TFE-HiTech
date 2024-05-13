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


# Copie des fichiers package.json et package-lock.json
# Étape de build
FROM node:18.18.0 AS build
WORKDIR /app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./
RUN npm install

# Copie du reste des fichiers du projet
COPY . .

# Compilation de l'application
RUN npm run build

# Étape de production
FROM node:18.18.0
WORKDIR /app

# Copie des artefacts de build de l'étape précédente
COPY --from=build /app/dist ./dist

# Copie de package.json depuis l'étape de build
COPY --from=build /app/package.json ./

# Installation des dépendances de production uniquement
RUN npm install --only=production

# Commande pour démarrer l'application
CMD ["npm", "run", "start:prod"]
