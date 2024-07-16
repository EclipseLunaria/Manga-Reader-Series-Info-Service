FROM node:22-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npx tsc


EXPOSE ${PORT}

CMD ["npm", "start"]