FROM node:16

WORKDIR .

COPY . .

RUN npm install

RUN npm install -g sequelize-cli

EXPOSE 3000

CMD ["npm", "run", "start"]