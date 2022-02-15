#stage 1
FROM node:latest as node
WORKDIR /usr/app
COPY ["package.json", "package-lock.json", "tsconfig.json", "tsconfig.app.json", "tsconfig.spec.json", "/src/environments/environment.prod.ts", "./"]
RUN npm ci
COPY ["angular.json", "ngsw-config.json", "tailwind.config.js", "./"]
COPY ./src ./src
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /usr/app/dist/HotelReservaties /usr/share/nginx/html