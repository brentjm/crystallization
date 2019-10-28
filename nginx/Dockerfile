FROM nginx

#RUN mkdir -p /usr/share/nginx/html/static
RUN apt-get update && apt-get install -y curl

#COPY nginx/example.conf /etc/nginx/conf.d/.
COPY ./app.conf /etc/nginx/conf.d/.

COPY crystallization-ui/build /usr/share/nginx/html/
