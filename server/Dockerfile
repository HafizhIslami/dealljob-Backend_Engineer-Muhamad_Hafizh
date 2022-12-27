FROM node:16.13

WORKDIR server/services/users

ENV PORT=4001

COPY package.json package-lock.json /server/services/users/

RUN npm install && npm cache clean --force

COPY ./ ./

CMD ["npm", "run", "start"]