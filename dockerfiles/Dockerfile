FROM node:22-alpine3.20 

WORKDIR /app

ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true
ENV WDS_SOCKET_PORT=0

COPY package.json package.json

RUN npm install

COPY . .


EXPOSE 3000
EXPOSE 5173

CMD [ "npm","run","dev" ]