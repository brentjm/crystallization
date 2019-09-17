FROM nodered/node-red-docker

USER node-red
COPY --chown=node-red:node-red settings.js /data/.
COPY --chown=node-red:node-red flows.json /data/.
COPY --chown=node-red:node-red flows_cred.json /data/.

RUN npm install node-red-dashboard \
    node-red-contrib-opcua \
    node-red-contrib-cip-ethernet-ip \
    node-red-contrib-modbus \
    node-red-contrib-postgres-multi \
    node-red-contrib-influxdb \
    node-red-contrib-osisoft-web-api \
    node-red-node-twilio \
    node-red-node-email \
    node-red-contrib-machine-learning \
    node-red-contrib-machine-learning \
    node-red-contrib-chartjs
