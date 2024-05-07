FROM node:18.18.0 as build-stage


WORKDIR /app


COPY package*.json ./
RUN npm ci


COPY . .
RUN npm run build


FROM nginx as production-stage


RUN apt update && \
    apt install -y nano


COPY --from=build-stage /app/build /usr/share/nginx/html


COPY ./nginx/default.conf /etc/nginx/conf.d/


EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
