FROM node:16.13.2-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
RUN npm ci
# RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]
