FROM nginx

#RUN mkdir -p /usr/share/nginx/html/static
RUN apt-get update && apt-get install -y curl

#COPY nginx/example.conf /etc/nginx/conf.d/.
COPY ./app.conf /etc/nginx/conf.d/.

COPY html/index.html /usr/share/nginx/html/.
