FROM node:18.18.0


WORKDIR /app


COPY package*.json ./


RUN npm ci


RUN npm install -g typeorm ts-node


COPY . .

RUN npm run build


EXPOSE 3001

CMD npm run typeorm migration:run && npm run start:prod

FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install; npm i -g typeorm ts-node

COPY . .

EXPOSE 3001

CMD npm run typeorm migration:run

ENTRYPOINT ["npm", "run", "start:dev"]
