FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install; npm i -g typeorm ts-node

COPY . .

EXPOSE 3001

CMD npm run typeorm migration:run

ENTRYPOINT ["npm", "run", "start:dev"]
