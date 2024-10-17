# ;-------------;
# ; Build stage ;
# ;-------------;
FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN npm run build
# ;---------------;
FROM nginx:stable-alpine as runtime

COPY --from=builder /app/dist/restaurantto-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
