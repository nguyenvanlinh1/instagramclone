FROM node:lts-alpine as build

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build


FROM nginx:mainline-alpine3.20-slim

WORKDIR /app

COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 2002

CMD [ "nginx", "-g", "daemon off;" ]

