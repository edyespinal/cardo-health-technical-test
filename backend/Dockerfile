# syntax=docker/dockerfile:1
   
FROM node:16-alpine
WORKDIR /backend
ENV PORT=3000
COPY . .
RUN yarn build
RUN yarn install --production
CMD ["node", "build/src/server.js"]
EXPOSE 3000