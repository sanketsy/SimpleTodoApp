FROM node
COPY . /app
WORKDIR /app
RUN apk update
RUN apk add npm
RUN npm i express
RUN npm i mongoose
RUN npm i mustache-express
CMD npm run test