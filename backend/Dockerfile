FROM node:16-alpine 

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install 

COPY . .

ENV NODE_ENV=production
CMD [ "node", "src/index.js" ]