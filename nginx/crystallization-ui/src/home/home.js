import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CrystallizationImage from "./crystallization_module.png";
import ProcessMapImage from "./process_map.png";
import GrafanaDashboardImage from "./grafana_dashboard.png";
import JupyterImage from "./jupyter.png";
import NodeRedImage from "./nodered.png";

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    position: 'relative',
    margin: '20px',
  },
  image: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});


class Home extends Component {

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.container}>
          <div style={{"display": "flex", "flexDirection": "column", "width": "40%"}}>
            <h2>Crystallization controller suite</h2>
            <p>
              The crystallization software suite provides tools for running the
              crystallizer module.  The goal of the software is to make access,
              control, and deployment of the hardware simple for new users,
              while also providing advanced tools to extend the flexibility of
              both hardware and data analysis. The software is rigorously 
              version controlled (Git), and secured via reverse proxy with outside
              connectivity using TSL (final version). The software suite consists of
              approximately ten services (Docker containers) - accessible via a
              web browser that provide interactive computer control, automatic
              databasing, advanced dashboarding, multilangual mathematical scripting,
              and graphical equipment/data/analysis connectivity. 
            </p>
            <List>
              <ListItem button>
                <ListItemText>
                  An interactive <Link to='/ProcessMap'> graphical process user interface </Link>
                  that displays realtime values of the module equipment. The
                  process interface also provides user inputs to enter setpoints
                  for the process equipment. The process map provides the easiest method
                  for a new user to visualize the current process conditions and enter new
                  conditions.
                  <img src={ProcessMapImage} alt="process map" className={classes.image} />
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>
                  An interactive 
                  <a href="http://10.131.0.175/grafana/d/H_NNUD-Wz/crystallization?orgId=1" target="_blank" rel="noopener noreferrer"> dashboard </a>
                  that provides realtime plots of all data recorded into a time series database
                  (InfluxDB). Furthemore, the dashboard allows each user to define and save
                  custom plots, which can be shared with other users through web links. The
                  dashboard also provides a set of mathematical tools, such as averaging
                  over time, taking derivatives, and can be extended to read from other database
                  sources. (user: grafana  password: juyfteBR6BC5L5oqwq4m)
                  <img src={GrafanaDashboardImage} alt="Grafana dashboard" className={classes.image} />
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>
                  A <a href="http://10.131.0.175:8889" target="_blank" rel="noopener noreferrer"> scripting notebook service </a>
                  (JupyterLab) that provides users owned (and sharable)
                  notebooks that can be programmed in various languages (e.g.
                  Python, Octave, R, Matlab, ...) to read data directly from
                  the process or the databases; perform high level mathematical
                  analysis, and update equipment setpoints from advanced
                  control algorithms. (password: jxjkS9xK9sV62kCRkBGD)
                  <img src={JupyterImage} alt="Jupyter" className={classes.image} />
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>
                  A 
                  <a href="http://10.131.0.175:1881" target="_blank" rel="noopener noreferrer"> "drag-n-drop" interface </a>
                  that provides automation extensions, such as building
                  sequences, delayed timing, process notifications (e.g.
                  email, text message, or phone call alerts of process
                  conditions). This interface provides numeous methods to
                  connect to most services, such as OSI PI database, SQL
                  databases, Amazon Web services, Microsoft Azure services,
                  Google Cloud services. In addition, many user define
                  connections have been defined, such as connecting to new
                  pieces of equipment to the module with no programming (to
                  understand the hardware aspect of equipment connectivity,
                  please see the hardware section). (user: admin    password: Wn3a8HV2cRTPTWynXUYN)
                  <img src={NodeRedImage} alt="Node Red" className={classes.image} />
                </ListItemText>
              </ListItem>
            </List>
         </div>
         <div style={{"display": "flex", "flexDirection": "column", "width": "40%", "marginLeft": "50px", "marginTop": "100px"}}>
          <img src={CrystallizationImage} alt="crystallization module" className={classes.image} />
          <p style={{"textAlign": "center"}}>
            <em>Crystallization Module</em>
          </p>
          <p> The automation on the crystallization module is accomplished by
            converting all equipment IO to Ethernet based communication. This
            allows equipment to be added or removed by simply physically
            connecting the equipment controller to the master network using
            hardwired Ethernet or wireless Ethernet (i.e. "plug-n-play").
          </p>
          Examples of equipment - controller pairing includes:
            <ul>
              <li>hardwired TCP/IP BSD style sockets to DSub9 RS232 for IKA stirrers (Lantronix).</li>
              <li>wireless TCP/IP BSD style sockets to DSub9 RS232 for Julabo TCUs.</li>
              <li>hardwired Modbus TCP/IP slave PLC to analog pumps, valves, and thermocouple (Horner PLC).</li>
              <li>hardwired OPC UA to Mettler Toledo infrared spectrometer and FBRM.</li>
            </ul>
          Supported communication from the controlling software includes:
          <ul>
            <li>TCP</li>
            <li>UDP</li>
            <li>MQTT</li>
            <li>OPC UA</li>
            <li>Ethernet/IP (Allen Bradley, Rockwell PLCs)</li>
            <li>WebSocket</li>
            <li>GE Predix</li>
            <li>HTTP (OSI PI Soft Web API)</li>
            <li>RFC1006 (Siemens SIMATIC s7 series)</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, {name: 'Home'})(Home);
