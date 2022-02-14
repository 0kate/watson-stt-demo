FROM node:14-alpine

COPY . /opt/frontend

WORKDIR /opt/frontend

EXPOSE 3000

RUN npm install

CMD ["npm", "run", "start"]
