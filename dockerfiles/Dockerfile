FROM node:22-alpine3.20 

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .


EXPOSE 3000
EXPOSE 5173

CMD [ "npm","run","dev" ]