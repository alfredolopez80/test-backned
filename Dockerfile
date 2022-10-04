FROM node:17.8.0 as base

WORKDIR /src
COPY package*.json /
EXPOSE 8000

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . .
CMD [ "npm", "run", "start" ]
