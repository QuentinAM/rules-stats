FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install --prefix ./server
RUN npm install
RUN npm run build
COPY . .
EXPOSE 3000
CMD ["node", "server/index.mjs"]