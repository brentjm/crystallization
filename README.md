# Docker containers to automate laboratory equipment - specifically for a crystallization setup. 
Builds Docker containers (Mosquitto, Node-RED, PostgreSQL, InfluxDB, Grafana,
Jupyter) and configures them for a laboratory crystallization setup.

## Overview
* *docker-compose.yml*:
  * Creates services with volumes and network based off of the general
  container services from 
  [git repository here](https://github.com/brentjm/web-app-docker-services)
    * Mosquitto
    * Node-RED
    * PostgreSQL
    * InfluxDB
    * Grafana
    * Jupyter

# Author

**Brent Maranzano**

# License

This project is licensed under the MIT License - see the LICENSE file for details
