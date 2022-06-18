FROM node:14.14.0-alpine3.12 as common-build-stage

WORKDIR /app

COPY package.json ./

COPY ./ ./

RUN npm install

RUN npm run build

CMD ["node", "run", "start"]