FROM influxdb:latest

RUN mkdir /docker-entrypoint-initdb.d
COPY --chown=influxdb:influxdb database_setup.iql /docker-entrypoint-initdb.d/
COPY --chown=influxdb:influxdb ./influxdb.conf /etc/influxdb/.
