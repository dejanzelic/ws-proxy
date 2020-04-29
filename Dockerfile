FROM node:10
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install

EXPOSE 8080

CMD [ "node", "proxy.js" ]