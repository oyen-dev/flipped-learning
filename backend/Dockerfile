FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install 

COPY . .

ENV NODE_ENV=production
RUN npm run build

FROM node:16-alpine AS production
WORKDIR /usr/run/app
COPY --from=builder /usr/src/app/dist/* ./

CMD [ "node", "main.js" ]