# syntax=docker/dockerfile:1
   
FROM node:16-alpine
WORKDIR /frontend
ENV VITE_API_URL="http://localhost:3000/v1/api"
ENV VITE_PLACEHOLDER_IMAGE="/static/img/placeholder-image.png"
COPY . .
RUN yarn build
RUN yarn install --production
EXPOSE 3000