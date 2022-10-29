FROM node:10-alpine
RUN apk update
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src /app/src

RUN ls -a

RUN npm install
RUN npm run build

EXPOSE 8000

CMD [ "node", "./dist/main.js" ]