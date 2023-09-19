FROM node:alpine
WORKDIR /app
COPY package*.json ./
COPY src/ ./src/
RUN yarn install
CMD ["yarn", "start"]
