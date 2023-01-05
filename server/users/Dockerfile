FROM node:16.15.1

WORKDIR server/users/

ENV PORT=4001

COPY package.json package-lock.json /server/users/

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "run", "start"]