FROM node:25.6.1-alpine3.22 AS builder
WORKDIR /app
COPY package*.json ./
#RUN npm install -g @angular/cli
#RUN npm install
COPY . /app
#RUN npm run build -- --configuration=production --output-path=public-build-folder


FROM nginx:alpine
COPY --from=builder /app/dist/balance/browser /var/www/front
COPY ./deploy/nginx/vhosts.public.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



