import React, { Component } from "react";
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { connectWebSocket, setProcessState, sendWebSocketCommand} from "./actions";
import Button from '@material-ui/core/Button';
import ParameterEditor from './parameter-editor';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    position: 'relative'
  },
  haltButton: {
    margin: theme.spacing(1),
    //backgroundColor: 'deeppink'
  },
  resumeButton: {
      margin: theme.spacing(1),
    //backgroundColor: 'lime'
  },
});

const hardwareGroups = {
  "AS-LNE-1": ["GROUP-1_LINE-1"],
  "AS-LNE-2": ["GROUP-2_LINE-1"],
  "AS-LNE-3": ["GROUP-3_LINE-1"],
  "AS-PUMP-1": ["GROUP-1_PUMP-1_BODY"],
  "AS-PUMP-2": ["GROUP-2_PUMP-1_BODY"],
  "AS-PUMP-3": ["GROUP-3_PUMP-1_BODY"],
  "TRANSFER_1-2": ["GROUP-1-2"],
  "TRANSFER_2-3": ["GROUP-2-3"],
  "TRANSFER_3-S": ["GROUP-3-S"],
  "FEED-LNE": ["GROUP-FEED_LINE-1"],
  "FEED-PUMP": ["GROUP-3_PUMP-1_BODY-5"],
  "VESSEL-1_STIR": ["GROUP-1_STR-1-HEAD"],
  "VESSEL-2_STIR": ["GROUP-2_STR-1-HEAD"],
  "VESSEL-3_STIR": ["GROUP-3_STR-1-HEAD"],
  "PRODUCT_LNE": ["GROUP-SEP_LINE-1"],
};

// Define the svg elements. Object key is the svgId
// and the array is ["equipment", "command"].
const PVs = {
  "EXPN_TXT": ["metaData", "EXPERIMENT:PV"],
  "USER_PV": ["metaData", "USER:PV"],
  "STATUS_PV": ["metaData", "STATUS:PV"],
  "MODE_PV": ["metaData", "MODE:PV"],
  "GROUP-1_VESSEL-1_TJ_PV": ["TCU:1", "BATH:TEMP:PV"],
  "GROUP-1_VESSEL-1_TR_PV": ["TCU:1", "SENSOR:TEMP:PV"],
  "GROUP-2_VESSEL-1_TJ_PV": ["TCU:2", "BATH:TEMP:PV"],
  "GROUP-2_VESSEL-1_TR_PV": ["TCU:2", "SENSOR:TEMP:PV"],
  "GROUP-3_VESSEL-1_TJ_PV": ["TCU:3", "BATH:TEMP:PV"],
  "GROUP-3_VESSEL-1_TR_PV": ["TCU:3", "SENSOR:TEMP:PV"],
  "GROUP-1_STR-1_PV": ["STIR:1", "SPEED:PV"],
  "GROUP-2_STR-1_PV": ["STIR:2", "SPEED:PV"],
  "GROUP-3_STR-1_PV": ["STIR:3", "SPEED:PV"],
  "GROUP-1_PUMP-1_PV": ["PUMP:1", "RATE:PV"],
  "GROUP-2_PUMP-1_PV": ["PUMP:2", "RATE:PV"],
  "GROUP-3_PUMP-1_PV": ["PUMP:3", "RATE:PV"],
  "GROUP-3_PUMP-1_PV-0": ["TCU:1", "BATH:TEMP:PV"],
  "GROUP-FEED_BALANCE-1_PV-7-6": ["BALANCE:FEED", "MASS:PV"],
  "GROUP-FEED_BALANCE-1_PV": ["BALANCE:ANTISOLVENT", "MASS:PV"],
  "GROUP-FEED_BALANCE-1_PV-7": ["BALANCE:PRODUCT", "MASS:PV"],
  "GROUP-1_VESSEL-1_CONC_PV": ["IR:1", "CONCENTRATION:PV"],
  "GROUP-2_VESSEL-1_CONC_PV": ["IR:2", "CONCENTRATION:PV"],
  "GROUP-3_VESSEL-1_CONC_PV": ["IR:3", "CONCENTRATION:PV"],
  "GROUP-1_VESSEL-1_D50_PV": ["FBRM:1", "D50:PV"],
  "GROUP-2_VESSEL-1_D50_PV": ["FBRM:2", "D50:PV"],
  "GROUP-3_VESSEL-1_D50_PV": ["FBRM:3", "D50:PV"],
  "GROUP-1_VESSEL-1_D90_PV": ["FBRM:1", "D90:PV"],
  "GROUP-2_VESSEL-1_D90_PV": ["FBRM:2", "D90:PV"],
  "GROUP-3_VESSEL-1_D90_PV": ["FBRM:3", "D90:PV"],
  "GROUP-SEP_PRES-1_PV": ["PT:SEPARATOR", "PRESSURE:PV"],
  "GROUP-FEED_TEMP-1_PV": ["THERMOCOUPLE:FEED", "TEMP:PV"]
};
  
class ProcessMap extends Component {

  state = {
    isDrawerOpen: false,
    selectedParameter: ["STIR:1", "SPEED:PV"]
  };

  componentDidMount = () => {
    this.props.connectWebSocket("ws://10.131.72.83:1880/ws/crystallizer");
    //this.props.connectWebSocket("ws://192.168.1.2:1880/ws/crystallizer");
    //this.props.connectWebSocket("ws://192.168.1.3:1880/ws/crystallizer");
    this.getElements(hardwareGroups, PVs);
    this.addEventListeners(hardwareGroups, PVs);
    this.formatSVG(hardwareGroups, PVs);
  }

  componentDidUpdate = () => {
    this.formatSVG(hardwareGroups, PVs);
  }

  handleParameterClick = (parameter) => {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen,
      selectedParameter: parameter,
    });
  }

  handleDrawerExit = () => {
    this.setState({
			isDrawerOpen: !this.state.isDrawerOpen
    });
  }

  getElements = (hardwareGroups, PVs) => {
    let svg = document.getElementById("crystallization");
    for (let group in hardwareGroups) {
      this[group] = svg.getElementById(hardwareGroups[group])
    }
    Object.keys(PVs).forEach((PV, index) => {
      this[PV] = svg.getElementById(PV);
    });
  };

  addEventListeners = (hardwareGroups, PVs) => {
    Object.keys(PVs).forEach((PV, index) => {
      this[PV].addEventListener('click', event => {
        this.handleParameterClick(PVs[PV]);
      });
    });
  };

  formatSVG = (hardwareGroups, PVs) => {
		/*
    for (let group in hardwareGroups) {
      hardwareGroups[group].forEach((element) => {
        this[element].style.stroke="red";
        this[element].style.strokeWidth="0.7";
        this[element].childNodes.forEach((x) => {
         x.style.stroke="red";
         x.style.strokeWidth="0.7";
        });
      });
    }
		*/
    let state = this.props.processState;
    Object.keys(PVs).forEach((PV, index) => {
      let equipment = PVs[PV][0];
      let command = PVs[PV][1];
      switch (PV) {
        case "EXPN_TXT":
        case "USER_PV":
        case "STATUS_PV":
        case "MODE_PV":
          this[PV].textContent = state[equipment][command];
          break;
        case "GROUP-1_VESSEL-1_TJ_PV":
        case "GROUP-2_VESSEL-1_TJ_PV":
        case "GROUP-3_VESSEL-1_TJ_PV":
        case "GROUP-1_VESSEL-1_TR_PV":
        case "GROUP-2_VESSEL-1_TR_PV":
        case "GROUP-3_VESSEL-1_TR_PV":
        case "GROUP-1_PUMP-1_PV":
        case "GROUP-2_PUMP-1_PV":
        case "GROUP-3_PUMP-1_PV":
        case "GROUP-1_VESSEL-1_CONC_PV":
        case "GROUP-2_VESSEL-1_CONC_PV":
        case "GROUP-3_VESSEL-1_CONC_PV":
        case "GROUP-FEED_TEMP-1_PV":
        case "GROUP-SEP_PRES-1_PV":
          this[PV].textContent = state[equipment][command].toFixed(1);
          break;
        case "GROUP-1_STR-1_PV":
        case "GROUP-2_STR-1_PV":
        case "GROUP-3_STR-1_PV":
        case "GROUP-FEED_BALANCE-1_PV-7-6":
        case "GROUP-FEED_BALANCE-1_PV":
        case "GROUP-FEED_BALANCE-1_PV-7":
        case "GROUP-1_VESSEL-1_D50_PV":
        case "GROUP-2_VESSEL-1_D50_PV":
        case "GROUP-3_VESSEL-1_D50_PV":
        case "GROUP-1_VESSEL-1_D90_PV":
        case "GROUP-2_VESSEL-1_D90_PV":
        case "GROUP-3_VESSEL-1_D90_PV":
          this[PV].textContent = state[equipment][command].toFixed(0);
          break;
        default:
      }
    });
  };

  render() {

    const { isDrawerOpen, selectedParameter } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>

        <div>
          <Button variant="contained" color="secondary" className={classes.haltButton} 
            aria-label="HALT process" 
            onClick={()=>{sendWebSocketCommand({
              "equipment": "CRYSTALLIZER",
              "command": "HALT"
            })}}
          >
            HALT
          </Button>
          <Button variant="contained" color="primary" className={classes.resumeButton} 
            aria-label="INITIALIZE process" 
            onClick={()=>{sendWebSocketCommand({
              "equipment": "CRYSTALLIZER",
              "command": "INITIALIZE"
            })}}
          >
            INITIALIZE
          </Button>
        </div>

        <div>


<svg height="760" id="crystallization" width="1080" version="1.1" viewBox="0 0 285.75 201.08334" xmlns="http://www.w3.org/2000/svg">
	<defs id="defs2">
		<linearGradient id="steal">
			<stop id="stop1173" style={{"stopColor":"#ffffff","stopOpacity":"1"}} offset="0"/>
			<stop id="stop1175" style={{"stopColor":"#323232","stopOpacity":"1"}} offset="1"/>
		</linearGradient>
		<linearGradient id="glass">
			<stop id="stop1046" style={{"stopColor":"#ffffff","stopOpacity":"1"}} offset="0"/>
			<stop id="stop1048" style={{"stopColor":"#3264c8","stopOpacity":"1"}} offset="1"/>
		</linearGradient>
		<linearGradient id="linearGradient1272-9" gradientTransform="matrix(0.28261624,0,0,1.5189739,79.338726,-345.94954)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-7" gradientTransform="matrix(0.26924314,0,0,0.18614163,108.23896,158.65919)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-7-3" gradientTransform="matrix(0.26878245,0,0,0.36753825,59.880723,137.27515)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-7-3-9" gradientTransform="matrix(0.28900635,0,0,0.51695736,134.6311,-212.15193)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-1-7" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.7653459,-0.0289487,0.03426299,0.71048723,83.857848,7.9465548)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-1-0" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.7653459,-0.0289487,0.03426299,0.71048723,83.619636,-40.357064)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1044-8-5-3-7" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(1.0914026,-0.01402807,0.01116904,0.34840914,25.921477,167.20603)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-0-2-3" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.71486016,0.00342069,-0.00129611,0.1078,47.781548,150.92732)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient2548" gradientTransform="matrix(0.75170943,0,0,0.74244933,-53.526139,80.74127)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1364" cx="31.805073" cy="208.40013" fx="31.805073" fy="208.40013" gradientTransform="matrix(2.1493369,0.03485004,-0.04661593,1.713824,-25.462237,-102.9643)" gradientUnits="userSpaceOnUse" r="22.277945" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1364-7" cx="31.805073" cy="208.40013" fx="31.805073" fy="208.40013" gradientTransform="matrix(2.1493369,0.03485004,-0.04661593,1.713824,-36.020295,-104.96884)" gradientUnits="userSpaceOnUse" r="22.277945" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1364-7-6" cx="31.647467" cy="208.55928" fx="31.647467" fy="208.55928" gradientTransform="matrix(2.1493369,0.03485004,-0.04661593,1.713824,-36.776607,-68.706698)" gradientUnits="userSpaceOnUse" r="22.277945" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1364-7-6-2" cx="31.647467" cy="208.55928" fx="31.647467" fy="208.55928" gradientTransform="matrix(2.1493369,0.03485004,-0.04661593,1.713824,-89.48111,-88.394015)" gradientUnits="userSpaceOnUse" r="22.277945" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1364-7-6-2-2" cx="31.647467" cy="208.55928" fx="31.647467" fy="208.55928" gradientTransform="matrix(2.1493369,0.03485004,-0.04661593,1.713824,-29.528175,-84.989275)" gradientUnits="userSpaceOnUse" r="22.277945" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1628" gradientTransform="matrix(0.6597234,0,0,0.62321209,40.109517,102.17259)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="121.2458" x2="143.08377" y1="255.30592" y2="254.50412" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1044-8-5-3-7-0" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.5577948,-0.00220548,0.00570827,0.05477651,117.89748,280.63639)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-0-2-3-7" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.21592026,0.00109922,-3.9148414e-4,0.03464097,136.79794,241.40787)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1755" gradientTransform="matrix(0.37493083,0,0,0.42020673,79.030174,214.10881)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1755-3" gradientTransform="matrix(0.37937184,0,0,0.27366529,78.215563,214.43756)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1394-8-8-7-4-0" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,29.75769,89.076018)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-4-6-4" gradientTransform="matrix(0.28228679,0,0,0.41477037,-18.308199,78.066938)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-4-6-9" gradientTransform="matrix(0.28303714,0,0,0.13417638,-19.658134,235.87089)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-8-7-4-0-1" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,156.97801,90.304923)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-4-6-4-1" gradientTransform="matrix(0.28228679,0,0,0.11763055,206.29976,-52.240199)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-4-6-4-1-2" gradientTransform="matrix(0.28228679,0,0,0.09208708,203.74841,-78.259406)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9" gradientTransform="matrix(0.28141895,0,0,0.73370358,21.509678,95.284978)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-93" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,154.43893,49.482823)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-8" gradientTransform="matrix(0.28221435,0,0,0.22072584,136.41938,-112.18967)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-8-7" gradientTransform="matrix(0.28236135,0,0,0.17254493,40.249407,160.36455)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-93-3" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,87.621544,30.773957)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-93-2" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,87.621544,49.482824)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2422" gradientTransform="matrix(0.28141895,0,0,0.12426191,231.39392,164.08283)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient2443" cx="138.44562" cy="249.0251" fx="138.44562" fy="249.0251" gradientTransform="matrix(1,0,0,1.015947,138.44562,-75.73374)" gradientUnits="userSpaceOnUse" r="8.3799295" xlinkHref="#steal"/>
		<radialGradient id="radialGradient2443-8" cx="138.44562" cy="249.0251" fx="138.44562" fy="249.0251" gradientTransform="matrix(1,0,0,1.015947,-121.19937,-23.827064)" gradientUnits="userSpaceOnUse" r="8.3799295" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2514" gradientTransform="matrix(0.28141895,0,0,0.12426191,-28.25107,215.98951)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-9-7" gradientTransform="matrix(0.28431055,0,0,0.26418822,196.084,-302.52377)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-9-7-2" gradientTransform="matrix(0.28431056,0,0,0.23862581,-294.68639,-291.17749)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-9-7-2-7" gradientTransform="matrix(0.28479107,0,0,0.09692226,-318.55088,-254.34053)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-8-7-4-0-4" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,146.95608,-156.04775)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-8-7-4-0-2" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,147.75789,-132.7953)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1521" cx="275.55487" cy="167.62898" fx="275.55487" fy="167.62898" gradientTransform="matrix(1,0,0,1.2855485,1.3363476,-35.97338)" gradientUnits="userSpaceOnUse" r="8.3799295" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1523" cx="275.55487" cy="167.62898" fx="275.55487" fy="167.62898" gradientTransform="matrix(1,0,0,1.2855485,1.3363476,-35.97338)" gradientUnits="userSpaceOnUse" r="8.3799295" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-6-3" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376346,-0.03028719,0.03329679,0.74333763,29.505159,35.511664)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-2-3" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,32.419792,72.26435)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-8-5-7" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,16.854219,72.382932)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1179-4-3" cx="-205.14154" cy="204.22151" fx="-205.14154" fy="204.22151" gradientTransform="matrix(0.24049826,0.00184288,-0.00253978,0.06553777,-53.289135,205.82138)" gradientUnits="userSpaceOnUse" r="35.972752" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1179-2-4-2" cx="-205.14154" cy="204.22151" fx="-205.14154" fy="204.22151" gradientTransform="matrix(0.24049826,0.00184288,-0.00253978,0.06553777,134.77033,206.04205)" gradientUnits="userSpaceOnUse" r="35.972752" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient944-9-6" cx="206.20508" cy="236.63559" fx="206.20508" fy="236.63559" gradientTransform="matrix(0.34927491,0.00762032,-0.00158779,0.10958575,-10.099137,121.37887)" gradientUnits="userSpaceOnUse" r="31.923616" xlinkHref="#steal"/>
		<radialGradient id="radialGradient933-9-5" cx="171.85429" cy="142.51819" fx="171.85429" fy="142.51819" gradientTransform="matrix(0.30314466,0,0,0.31787938,9.3467753,95.343768)" gradientUnits="userSpaceOnUse" r="18.268902" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1044-8-3-2" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(1.0914026,-0.01402807,0.01116904,0.34840914,25.921477,167.20603)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-5-7" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.71486016,0.00342069,-0.00129611,0.1078,47.781548,150.92732)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient2010" gradientTransform="matrix(0.2827419,0,0,0.07953425,78.764707,-89.625731)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2012" gradientTransform="matrix(0.28141895,0,0,0.63724423,35.424441,50.792955)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2014" gradientTransform="matrix(0.28303714,0,0,0.09205816,81.762544,-64.866752)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2016" gradientTransform="matrix(0.28303714,0,0,0.13417638,-1.7623707,97.166177)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2018" gradientTransform="matrix(0.30977804,0,0,0.47971832,43.870807,118.6902)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.94032" x2="169.11494" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2020" gradientTransform="matrix(1.3882216,0,0,0.12127305,-130.06659,149.48052)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2022" gradientTransform="matrix(0.37138012,0,0,0.06079653,78.036743,-75.919933)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2024" gradientTransform="matrix(0.56361435,0,0,0.03983224,47.131339,-77.229967)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2026" gradientTransform="matrix(0.37145112,0,0,0.05033792,80.839653,-65.452911)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2028" gradientTransform="matrix(0.56361435,0,0,0.03983224,49.732061,-59.872838)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2030" gradientTransform="matrix(0.75170943,0,0,0.74244933,-53.526139,80.74127)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1394-6-3-7" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376346,-0.03028719,0.03329679,0.74333763,29.505159,35.511664)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-2-3-3" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,32.419792,72.26435)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-8-5-7-5" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,16.854219,72.382932)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1179-4-3-6" cx="-205.14154" cy="204.22151" fx="-205.14154" fy="204.22151" gradientTransform="matrix(0.24049826,0.00184288,-0.00253978,0.06553777,-53.289135,205.82138)" gradientUnits="userSpaceOnUse" r="35.972752" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1179-2-4-2-2" cx="-205.14154" cy="204.22151" fx="-205.14154" fy="204.22151" gradientTransform="matrix(0.24049826,0.00184288,-0.00253978,0.06553777,134.77033,206.04205)" gradientUnits="userSpaceOnUse" r="35.972752" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient944-9-6-9" cx="206.20508" cy="236.63559" fx="206.20508" fy="236.63559" gradientTransform="matrix(0.34927491,0.00762032,-0.00158779,0.10958575,-10.099137,121.37887)" gradientUnits="userSpaceOnUse" r="31.923616" xlinkHref="#steal"/>
		<radialGradient id="radialGradient933-9-5-1" cx="171.85429" cy="142.51819" fx="171.85429" fy="142.51819" gradientTransform="matrix(0.30314466,0,0,0.31787938,9.3467753,95.343768)" gradientUnits="userSpaceOnUse" r="18.268902" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1044-8-3-2-2" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(1.0914026,-0.01402807,0.01116904,0.34840914,25.921477,167.20603)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-5-7-9" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.71486016,0.00342069,-0.00129611,0.1078,47.781548,150.92732)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1610" gradientTransform="matrix(0.2827419,0,0,0.07953425,78.764707,-89.625731)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1613" gradientTransform="matrix(0.28141895,0,0,0.63724423,35.424441,50.792955)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1620" gradientTransform="matrix(0.28303714,0,0,0.09205816,81.762544,-64.866752)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1622" gradientTransform="matrix(0.28303714,0,0,0.13417638,-1.7623707,97.166177)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1624" gradientTransform="matrix(0.30977804,0,0,0.47971832,43.870807,118.6902)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.94032" x2="169.11494" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1626" gradientTransform="matrix(1.3882216,0,0,0.12127305,-130.06659,149.48052)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1630" gradientTransform="matrix(0.37138012,0,0,0.06079653,78.036743,-75.919933)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1632" gradientTransform="matrix(0.56361435,0,0,0.03983224,47.131339,-77.229967)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1634" gradientTransform="matrix(0.37145112,0,0,0.05033792,80.839653,-65.452911)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1636" gradientTransform="matrix(0.56361435,0,0,0.03983224,49.732061,-59.872838)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1638" gradientTransform="matrix(0.75170943,0,0,0.74244933,-53.526139,80.74127)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<linearGradient id="linearGradient2952" gradientTransform="matrix(0.2827419,0,0,0.07953425,78.764707,-89.625731)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2954" gradientTransform="matrix(0.28141895,0,0,0.63724423,35.424441,50.792955)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient2956" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376346,-0.03028719,0.03329679,0.74333763,29.505159,35.511664)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2958" gradientTransform="matrix(0.28303714,0,0,0.09205816,81.762544,-64.866752)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2960" gradientTransform="matrix(0.28303714,0,0,0.13417638,-1.7623707,97.166177)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient2962" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,32.419792,72.26435)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient2964" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,16.854219,72.382932)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2966" gradientTransform="matrix(0.30977804,0,0,0.47971832,43.870807,118.6902)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.94032" x2="169.11494" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient2968" cx="-205.14154" cy="204.22151" fx="-205.14154" fy="204.22151" gradientTransform="matrix(0.24049826,0.00184288,-0.00253978,0.06553777,-53.289135,205.82138)" gradientUnits="userSpaceOnUse" r="35.972752" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient2970" cx="-205.14154" cy="204.22151" fx="-205.14154" fy="204.22151" gradientTransform="matrix(0.24049826,0.00184288,-0.00253978,0.06553777,134.77033,206.04205)" gradientUnits="userSpaceOnUse" r="35.972752" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2972" gradientTransform="matrix(1.3882216,0,0,0.12127305,-130.06659,149.48052)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2974" gradientTransform="matrix(0.37138012,0,0,0.06079653,78.036743,-75.919933)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient2976" cx="206.20508" cy="236.63559" fx="206.20508" fy="236.63559" gradientTransform="matrix(0.34927491,0.00762032,-0.00158779,0.10958575,-10.099137,121.37887)" gradientUnits="userSpaceOnUse" r="31.923616" xlinkHref="#steal"/>
		<radialGradient id="radialGradient2978" cx="171.85429" cy="142.51819" fx="171.85429" fy="142.51819" gradientTransform="matrix(0.30314466,0,0,0.31787938,9.3467753,95.343768)" gradientUnits="userSpaceOnUse" r="18.268902" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2980" gradientTransform="matrix(0.56361435,0,0,0.03983224,47.131339,-77.229967)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2982" gradientTransform="matrix(0.37145112,0,0,0.05033792,80.839653,-65.452911)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2984" gradientTransform="matrix(0.56361435,0,0,0.03983224,49.732061,-59.872838)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient2986" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(1.0914026,-0.01402807,0.01116904,0.34840914,25.921477,167.20603)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient2988" gradientTransform="matrix(0.75170943,0,0,0.74244933,-53.526139,80.74127)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<radialGradient id="radialGradient2990" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.71486016,0.00342069,-0.00129611,0.1078,47.781548,150.92732)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient944-9-6-7" cx="206.20508" cy="236.63559" fx="206.20508" fy="236.63559" gradientTransform="matrix(0.34927491,0.00762032,-0.00158779,0.10958575,-10.099137,121.37887)" gradientUnits="userSpaceOnUse" r="31.923616" xlinkHref="#steal"/>
		<radialGradient id="radialGradient933-9-5-5" cx="171.85429" cy="142.51819" fx="171.85429" fy="142.51819" gradientTransform="matrix(0.30314466,0,0,0.31787938,9.3467753,95.343768)" gradientUnits="userSpaceOnUse" r="18.268902" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1395" gradientTransform="matrix(0.37138012,0,0,0.06079653,78.036743,-75.919933)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1397" gradientTransform="matrix(0.56361435,0,0,0.03983224,47.131339,-77.229967)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1399" gradientTransform="matrix(0.37145112,0,0,0.05033792,80.839653,-65.452911)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1401" gradientTransform="matrix(0.56361435,0,0,0.03983224,49.732061,-59.872838)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1937" gradientTransform="matrix(0.6597234,0,0,0.62321209,40.109517,102.17259)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="121.2458" x2="143.08377" y1="255.30592" y2="254.50412" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1044-8-5-3-7-0-2" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.5577948,-0.00220548,0.00570827,0.05477651,117.89748,280.63639)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-0-2-3-7-5" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.21592026,0.00109922,-3.9148414e-4,0.03464097,136.79794,241.40787)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient2025" gradientTransform="matrix(0.37493083,0,0,0.42020673,79.030174,214.10881)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<linearGradient id="linearGradient2027" gradientTransform="matrix(0.37937184,0,0,0.27366529,78.215563,214.43756)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<linearGradient id="linearGradient2078" gradientTransform="matrix(0.6597234,0,0,0.62321209,40.109517,102.17259)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="121.2458" x2="143.08377" y1="255.30592" y2="254.50412" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1044-8-5-3-7-0-7" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.5577948,-0.00220548,0.00570827,0.05477651,117.89748,280.63639)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-0-2-3-7-50" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.21592026,0.00109922,-3.9148414e-4,0.03464097,136.79794,241.40787)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient2150" gradientTransform="matrix(0.37493083,0,0,0.42020673,79.030174,214.10881)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<linearGradient id="linearGradient2152" gradientTransform="matrix(0.37937184,0,0,0.27366529,78.215563,214.43756)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1394-8-1-7-0" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.7653459,-0.0289487,0.03426299,0.71048723,83.857848,7.9465548)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-1-0-6" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.7653459,-0.0289487,0.03426299,0.71048723,83.619636,-40.357064)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2705" gradientTransform="matrix(0.26924314,0,0,0.18614163,108.23896,158.65919)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2707" gradientTransform="matrix(0.26878245,0,0,0.36753825,59.880723,137.27515)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2709" gradientTransform="matrix(0.28900635,0,0,0.51695736,134.6311,-212.15193)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-1-7-9" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.7653459,-0.0289487,0.03426299,0.71048723,83.857848,7.9465548)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-1-0-3" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.7653459,-0.0289487,0.03426299,0.71048723,83.619636,-40.357064)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2749" gradientTransform="matrix(0.26924314,0,0,0.18614163,108.23896,158.65919)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2751" gradientTransform="matrix(0.26878245,0,0,0.36753825,59.880723,137.27515)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2753" gradientTransform="matrix(0.28900635,0,0,0.51695736,134.6311,-212.15193)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1044-8-5-3-7-0-2-3" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.5577948,-0.00220548,0.00570827,0.05477651,117.89748,280.63639)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-0-2-3-7-5-5" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.21592026,0.00109922,-3.9148414e-4,0.03464097,136.79794,241.40787)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1320" gradientTransform="matrix(0.37493083,0,0,0.42020673,79.030174,214.10881)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1322" gradientTransform="matrix(0.37937184,0,0,0.27366529,78.215563,214.43756)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1324" gradientTransform="matrix(0.6597234,0,0,0.62321209,40.109517,102.17259)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="121.2458" x2="143.08377" y1="255.30592" y2="254.50412" xlinkHref="#steal"/>
		<linearGradient id="linearGradient5243" gradientTransform="matrix(0.67001671,0,0,1.0003733,28.806937,-0.10115254)" gradientUnits="userSpaceOnUse" x1="118.14691" x2="74.056938" y1="287.93042" y2="236.15202" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2606" gradientTransform="matrix(0.67001671,0,0,1.0003733,28.806937,-0.10115254)" gradientUnits="userSpaceOnUse" x1="118.14691" x2="77.113525" y1="287.93042" y2="241.12379" xlinkHref="#steal"/>
		<linearGradient id="linearGradient2649" gradientTransform="matrix(0.67001671,0,0,1.0003733,28.806937,-0.10115254)" gradientUnits="userSpaceOnUse" x1="118.14691" x2="74.493591" y1="287.93042" y2="235.85956" xlinkHref="#steal"/>
	</defs>
	<g id="processMap" transform="translate(0,-95.91665)">
		<g id="GROUP-3-S" style={{"display":"inline"}} transform="matrix(0.93835151,0,0,1,127.44332,1.4978853)">
			<rect height="17.548052" id="GROUP-1-2_PIPE-1-4" style={{"opacity":"1","fill":"url(#linearGradient2749)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01119344","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.6427233" ry="0.13816881" x="150.34566" y="180.36888"/>
			<rect height="34.648781" id="GROUP-1-2_PIPE-2-52" style={{"opacity":"1","fill":"url(#linearGradient2751)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01571525","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.638202" ry="0.27281553" x="101.91537" y="180.14111"/>
			<rect height="48.734901" id="GROUP-1-2_PIPE-3-5" style={{"opacity":"1","fill":"url(#linearGradient2753)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01932638","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.8367074" ry="0.383726" transform="rotate(90)" x="179.82858" y="-151.85905"/>
			<rect height="3.7176752" id="GROUP-1-2_JOINT-1-4" style={{"opacity":"1","fill":"url(#radialGradient1394-8-1-7-9)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00652979","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.2450147" ry="0.029272005" transform="rotate(90)" x="179.20241" y="-105.07278"/>
			<rect height="3.7176752" id="GROUP-1-2_JOINT-2-7" style={{"opacity":"1","fill":"url(#radialGradient1394-8-1-0-3)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00652979","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.2450147" ry="0.029272005" transform="rotate(90)" x="178.9648" y="-153.37637"/>
		</g>
		<g id="GROUP-2-3" style={{"display":"inline"}} transform="translate(59.990202,1.4871406)">
			<rect height="17.548052" id="GROUP-1-2_PIPE-1-5" style={{"opacity":"1","fill":"url(#linearGradient2705)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01119344","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.6427233" ry="0.13816881" x="150.34566" y="180.36888"/>
			<rect height="34.648781" id="GROUP-1-2_PIPE-2-5" style={{"opacity":"1","fill":"url(#linearGradient2707)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01571525","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.638202" ry="0.27281553" x="101.91537" y="180.14111"/>
			<rect height="48.734901" id="GROUP-1-2_PIPE-3-4" style={{"opacity":"1","fill":"url(#linearGradient2709)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01932638","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.8367074" ry="0.383726" transform="rotate(90)" x="179.82858" y="-151.85905"/>
			<rect height="3.7176752" id="GROUP-1-2_JOINT-1-7" style={{"opacity":"1","fill":"url(#radialGradient1394-8-1-7-0)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00652979","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.2450147" ry="0.029272005" transform="rotate(90)" x="179.20241" y="-105.07278"/>
			<rect height="3.7176752" id="GROUP-1-2_JOINT-2-6" style={{"opacity":"1","fill":"url(#radialGradient1394-8-1-0-6)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00652979","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.2450147" ry="0.029272005" transform="rotate(90)" x="178.9648" y="-153.37637"/>
		</g>
		<g id="GROUP-1-2" style={{"display":"inline"}} transform="translate(-2.6458334,1.5875)">
			<rect height="17.548052" id="GROUP-1-2_PIPE-1" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01119344","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.6427233" ry="0.13816881" x="150.34566" y="180.36888"/>
			<rect height="34.648781" id="GROUP-1-2_PIPE-2" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-7-3)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01571525","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.638202" ry="0.27281553" x="101.91537" y="180.14111"/>
			<rect height="48.734901" id="GROUP-1-2_PIPE-3" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-7-3-9)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01932638","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.8367074" ry="0.383726" transform="rotate(90)" x="179.82858" y="-151.85905"/>
			<rect height="3.7176752" id="GROUP-1-2_JOINT-1" style={{"opacity":"1","fill":"url(#radialGradient1394-8-1-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00652979","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.2450147" ry="0.029272005" transform="rotate(90)" x="179.20241" y="-105.07278"/>
			<rect height="3.7176752" id="GROUP-1-2_JOINT-2" style={{"opacity":"1","fill":"url(#radialGradient1394-8-1-0)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00652979","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.2450147" ry="0.029272005" transform="rotate(90)" x="178.9648" y="-153.37637"/>
		</g>
		<g id="EXPERIMENT_DETAILS" style={{"display":"inline"}}>
			<text id="EXPN_TXT" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="52.048267" y="104.80789" xmlSpace="preserve">
				<tspan id="EXPN_SPAN" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="52.048267" y="104.80789">Experiment Name</tspan>
			</text>
			<text id="USER_PV" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="73.425278" y="116.38148" xmlSpace="preserve">
				<tspan id="USER_NAME_TXT" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="73.425278" y="116.38148">
					<tspan id="tspan2540" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start"}}>User Name</tspan>
				</tspan>
			</text>
			<text id="STATUS_PV" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="230.17146" y="103.69965" xmlSpace="preserve">
				<tspan id="tspan2538-8" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="230.17146" y="103.69965">
					<tspan id="tspan2542-5" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}}>Halted</tspan>
				</tspan>
			</text>
			<text id="INFO_USER" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="53.018925" y="116.68414" xmlSpace="preserve">
				<tspan id="tspan2538-5" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="53.018925" y="116.68414">User:</tspan>
			</text>
			<text id="STATUS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="204.09576" y="103.67435" xmlSpace="preserve">
				<tspan id="tspan2538-8-3" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="204.09576" y="103.67435">Status:</tspan>
			</text>
			<text id="MODE" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="203.80319" y="112.1588" xmlSpace="preserve">
				<tspan id="tspan1304" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="203.80319" y="112.1588">Mode:</tspan>
			</text>
			<text id="MODE_PV" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="230.46402" y="112.18408" xmlSpace="preserve">
				<tspan id="tspan1310" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="230.46402" y="112.18408">
					SIMULATION
					<tspan id="tspan1308" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555582px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}}/>
				</tspan>
			</text>
		</g>
		<g id="GROUP-SEP" style={{"display":"inline"}}>
			<g id="GROUP-SEP_LINE-1" transform="translate(1.0690781)">
				<rect height="24.905706" id="GROUP-SEP_LINE-1_PIPE-3" style={{"opacity":"1","fill":"url(#linearGradient1272-9-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01370322","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.790616" ry="0.19610104" transform="rotate(90)" x="240.54715" y="-271.71155"/>
				<rect height="22.495872" id="GROUP-SEP_LINE-1_PIPE-1" style={{"opacity":"1","fill":"url(#linearGradient1272-9-7-2)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01302341","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7906163" ry="0.17712663" transform="scale(-1)" x="-250.22324" y="-263.34665"/>
				<rect height="9.1371126" id="GROUP-SEP_LINE-1_PIPE-2" style={{"opacity":"1","fill":"url(#linearGradient1272-9-7-2-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00830701","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7953329" ry="0.071943238" transform="scale(-1)" x="-274.0126" y="-243.03653"/>
				<rect height="3.8895674" id="GROUP-SEP_LINE-1_JOINT-1" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8-7-4-0-4)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="239.61253" y="-274.29245"/>
				<rect height="3.8895674" id="GROUP-SEP_LINE-1_JOINT-2" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8-7-4-0-2)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="240.41434" y="-251.03998"/>
			</g>
			<g id="GROUP-SEP_VESSEL-1" style={{"opacity":"0.53800001"}} transform="matrix(0.36286688,0,0,0.78056726,241.28319,60.786851)">
				<ellipse id="GROUP-SEP_VESSEL-1_BOTTOM" style={{"opacity":"1","fill":"url(#radialGradient1044-8-5-3-7)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03752039","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.306549" cy="212.05258" rx="22.572357" ry="11.281204"/>
				<rect height="46.036709" id="GROUP-SEP_VESSEL-1_MIDDLE" style={{"opacity":"1","fill":"url(#linearGradient2548)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="45.204529" ry="0.3312327" x="63.603817" y="165.32137"/>
				<ellipse id="GROUP-SEP_VESSEL-1_TOP" style={{"opacity":"1","fill":"url(#radialGradient1044-0-2-3)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.206085" cy="165.22214" rx="22.418076" ry="3.4891102"/>
			</g>
			<g id="GROUP-SEP_PRES-1">
				<text id="GROUP-SEP_PRES-1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="277.5621" y="161.47189" xmlSpace="preserve">
					<tspan id="GROUP-SEP_PRES-1_PV_SPAN" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="277.5621" y="161.47189">.3</tspan>
				</text>
				<rect height="11.714491" id="GROUP-SEP_PRES-1_STEM" style={{"opacity":"1","fill":"url(#linearGradient2422)","fillOpacity":"1","stroke":"url(#radialGradient1521)","strokeWidth":"0.00935008","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7622337" ry="0.092236854" x="275.40491" y="178.57544"/>
				<ellipse id="GROUP-SEP_PRES-1_GAUGE" style={{"opacity":"1","fill":"url(#radialGradient2443)","fillOpacity":"1","stroke":"url(#radialGradient1523)","strokeWidth":"5","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="276.8912" cy="177.26256" rx="5.8799295" ry="6.0135641"/>
				<text id="GROUP-SEP_PRES-1_SYMBOL" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"3.52777767px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="274.75311" y="179.66867" xmlSpace="preserve">
					<tspan id="tspan1456" style={{"fontSize":"7.05555534px","strokeWidth":"0.26458332"}} x="274.75311" y="179.66867">P</tspan>
				</text>
				<text id="GROUP-SEP_PRES-1_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="272.6149" y="168.97787" xmlSpace="preserve">
					<tspan id="tspan1492" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="272.6149" y="168.97787">bar</tspan>
				</text>
			</g>
		</g>
		<g id="GROUP_AS" style={{"display":"inline"}} transform="translate(0,1.0583334)">
			<g id="GROUP-AS_LINE-1">
				<rect height="143.19759" id="LNE_0_PIP_2" style={{"opacity":"1","fill":"url(#linearGradient1272-9)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.03275996","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7739856" ry="1.1275007" transform="rotate(90)" x="123.5369" y="-168.79201"/>
				<rect height="3.8895674" id="LNE_0_JNT_1" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8-7-4-0)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="122.41415" y="-29.168674"/>
				<rect height="39.101471" id="LNE_0_PIP_1" style={{"opacity":"1","fill":"url(#linearGradient1272-4-6-4)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01710876","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7707517" ry="0.30787483" x="25.838514" y="126.44128"/>
			</g>
			<g id="GROUP-AS_VESSEL-1-9" style={{"display":"inline"}} transform="matrix(0.59063705,0,0,0.38967741,-60.601167,61.393163)">
				<ellipse id="GROUP-FEED_VESSEL-1_BOTTOM-2" style={{"opacity":"0.53800001","fill":"url(#radialGradient1044-8-5-3-7-0-2)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01063567","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="148.75914" cy="287.68719" rx="11.536296" ry="1.7736187"/>
				<rect height="26.055563" id="GROUP-FEED_VESSEL-1_MIDDLE-2" style={{"opacity":"0.53800001","fill":"url(#linearGradient2025)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01984619","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="22.546705" ry="0.18746896" x="137.45117" y="261.97873"/>
				<ellipse id="GROUP-FEED_VESSEL-1_TOP-8" style={{"opacity":"0.53800001","fill":"url(#radialGradient1044-0-2-3-7-5)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01163725","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="148.40388" cy="246.0014" rx="6.7712774" ry="1.1212076"/>
				<path id="GROUP-FEED_VESSEL-1_NECK-9" style={{"opacity":"0.53800001","fill":"url(#linearGradient2027)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01611063","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} d="m 143.04904,245.73901 11.21622,-0.031 c 2.73094,-0.008 -1.56566,3.85347 -0.89687,5.01255 l 6.77393,11.73991 c 0.0373,0.0647 -0.11668,0.12209 -0.26162,0.12209 h -22.29054 c -0.14493,0 -0.29369,-0.0561 -0.26161,-0.12209 l 5.67914,-11.67648 c 0.52127,-1.07176 -3.21454,-5.03593 0.0413,-5.04494 z"/>
			</g>
			<g id="GROUP-AS_BALANCE-1-2" style={{"display":"inline"}} transform="matrix(-0.8264498,0,0,0.67595624,126.68189,-0.67501205)">
				<path id="GROUP-FEED_BALANCE-1_TOP-6" style={{"opacity":"1","fill":"#646464","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"4.03632736","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 144.42489,266.4696 c -0.0755,0.15017 0.0648,0.11981 -0.20685,0.11904 l -48.255247,-0.13595 c 1.633005,-3.83858 2.033695,-4.24226 3.091508,-6.19002 -4.335387,-0.0308 33.330439,0.14661 41.756049,0.0837 2.13925,3.17448 2.78727,5.42397 3.61454,6.12322 z"/>
				<rect height="9.7320528" id="GROUP-FEED_BALANCE-1_BASE-1" style={{"opacity":"1","fill":"#969696","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"5.32075834","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="48.874153" ry="0.49032953" x="95.773827" y="266.2088"/>
				<rect height="5.6632299" id="GROUP-FEED_BALANCE-1_HEAD-8" style={{"opacity":"1","fill":"url(#linearGradient1937)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"3.20603967","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="25.038004" ry="0.36395186" x="107.81791" y="257.95102"/>
				<text id="GROUP-FEED_BALANCE-1_PV-7" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.55185556px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.35292405"}} transform="scale(-0.92315535,1.0832413)" x="-141.87679" y="252.44141" xmlSpace="preserve">
					<tspan id="tspan1236-9" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.55185556px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.35292405"}} x="-141.87679" y="252.44141">200</tspan>
				</text>
				<text id="GROUP-FEED_BALANCE-1_PV_UNITS-2" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.66389179px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.35292405"}} transform="scale(-0.92315535,1.0832413)" x="-123.13824" y="251.74274" xmlSpace="preserve">
					<tspan id="tspan1240-0" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.66389179px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.35292405"}} x="-123.13824" y="251.74274">g</tspan>
				</text>
			</g>
		</g>
		<g id="GROUP_PRODUCT" transform="translate(283.21305,144.39935)">
			<g id="GROUP-PRODUCT_VESSEL-1-9-6" style={{"display":"inline"}} transform="matrix(0.98134672,0,0,0.82462055,-178.51343,-97.442401)">
				<ellipse id="GROUP-FEED_VESSEL-1_BOTTOM-2-2" style={{"opacity":"0.53800001","fill":"url(#radialGradient1044-8-5-3-7-0-2-3)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01063567","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="148.75914" cy="287.68719" rx="11.536296" ry="1.7736187"/>
				<rect height="26.055563" id="GROUP-FEED_VESSEL-1_MIDDLE-2-9" style={{"opacity":"0.53800001","fill":"url(#linearGradient1320)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01984619","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="22.546705" ry="0.18746896" x="137.45117" y="261.97873"/>
				<ellipse id="GROUP-FEED_VESSEL-1_TOP-8-1" style={{"opacity":"0.53800001","fill":"url(#radialGradient1044-0-2-3-7-5-5)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01163725","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="148.40388" cy="246.0014" rx="6.7712774" ry="1.1212076"/>
				<path id="GROUP-FEED_VESSEL-1_NECK-9-2" style={{"opacity":"0.53800001","fill":"url(#linearGradient1322)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01611063","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} d="m 143.04904,245.73901 11.21622,-0.031 c 2.73094,-0.008 -1.56566,3.85347 -0.89687,5.01255 l 6.77393,11.73991 c 0.0373,0.0647 -0.11668,0.12209 -0.26162,0.12209 h -22.29054 c -0.14493,0 -0.29369,-0.0561 -0.26161,-0.12209 l 5.67914,-11.67648 c 0.52127,-1.07176 -3.21454,-5.03593 0.0413,-5.04494 z"/>
			</g>
			<g id="GROUP-PRODUCT_BALANCE-1-2-7" style={{"display":"inline"}} transform="matrix(-0.95527542,0,0,0.67595624,82.713508,-34.20545)">
				<path id="GROUP-FEED_BALANCE-1_TOP-6-0" style={{"opacity":"1","fill":"#646464","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"4.03632736","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 144.42489,266.4696 c -0.0755,0.15017 0.0648,0.11981 -0.20685,0.11904 l -48.255247,-0.13595 c 1.633005,-3.83858 2.033695,-4.24226 3.091508,-6.19002 -4.335387,-0.0308 33.330439,0.14661 41.756049,0.0837 2.13925,3.17448 2.78727,5.42397 3.61454,6.12322 z"/>
				<rect height="9.7320528" id="GROUP-FEED_BALANCE-1_BASE-1-9" style={{"opacity":"1","fill":"#969696","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"5.32075834","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="48.874153" ry="0.49032953" x="95.773827" y="266.2088"/>
				<rect height="5.6632299" id="GROUP-FEED_BALANCE-1_HEAD-8-3" style={{"opacity":"1","fill":"url(#linearGradient1324)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"3.20603967","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="25.038004" ry="0.36395186" x="107.81791" y="257.95102"/>
				<text id="GROUP-FEED_BALANCE-1_PV-7-6" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.02421188px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.35292405"}} transform="scale(-0.92315535,1.0832413)" x="-140.07663" y="252.44141" xmlSpace="preserve">
					<tspan id="tspan1236-9-0" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.02421188px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.35292405"}} x="-140.07663" y="252.44141">200</tspan>
				</text>
				<text id="GROUP-FEED_BALANCE-1_PV_UNITS-2-6" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.26815891px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.35292405"}} transform="scale(-0.92315535,1.0832413)" x="-121.22089" y="251.74272" xmlSpace="preserve">
					<tspan id="tspan1240-0-2" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.26815891px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.35292405"}} x="-121.22089" y="251.74272">g</tspan>
				</text>
			</g>
		</g>
		<g id="GROUP-FEED" style={{"display":"inline"}}>
			<g id="GROUP-FEED_BOX">
				<rect height="36.55027" id="GROUP-FEED_BOX_BACK" style={{"opacity":"0.5","fill":"url(#radialGradient1364)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"6.98173237","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="50.108997" ry="0.5839923" x="7.9552302" y="237.29741"/>
				<path id="GROUP-FEED_BOX_TOP" style={{"opacity":"0.5","fill":"url(#radialGradient1364-7)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"6.98173285","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 8.1283092,237.96557 49.9359208,-0.66816 6.057902,7.01696 -62.5709739,0.53454 z"/>
				<path id="GROUP-FEED_BOX_BOTTOM" style={{"opacity":"0.5","fill":"url(#radialGradient1364-7-6)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"6.98173332","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 8.4104917,273.4259 48.8974273,0.13365 7.442564,16.63867 -62.5709721,1e-5 z"/>
				<path id="GROUP-FEED_BOX_LEFT" style={{"opacity":"0.5","fill":"url(#radialGradient1364-7-6-2)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"6.98173332","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 2.0922045,244.65141 7.011366,-6.81536 -0.8654108,36.68388 -5.1074548,15.23438 z"/>
				<path id="GROUP-FEED_BOX_RIGHT" style={{"opacity":"0.5","fill":"url(#radialGradient1364-7-6-2-2)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"6.98173332","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 64.122132,244.31437 -5.796767,-6.81536 -0.865411,36.95115 5.96985,15.23438 z"/>
			</g>
			<g id="GROUP-FEED_BALANCE-1" transform="matrix(-0.81209421,0,0,0.69207958,124.82122,93.555264)">
				<path id="GROUP-FEED_BALANCE-1_TOP" style={{"opacity":"1","fill":"#646464","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"4.03632736","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 144.42489,266.4696 c -0.0755,0.15017 0.0648,0.11981 -0.20685,0.11904 l -48.255247,-0.13595 c 1.633005,-3.83858 2.033695,-4.24226 3.091508,-6.19002 -4.335387,-0.0308 33.330439,0.14661 41.756049,0.0837 2.13925,3.17448 2.78727,5.42397 3.61454,6.12322 z"/>
				<rect height="9.7320528" id="GROUP-FEED_BALANCE-1_BASE" style={{"opacity":"1","fill":"#969696","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"5.32075834","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="48.874153" ry="0.49032953" x="95.773827" y="266.2088"/>
				<rect height="5.6632299" id="GROUP-FEED_BALANCE-1_HEAD" style={{"opacity":"1","fill":"url(#linearGradient1628)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"3.20603967","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="25.038004" ry="0.36395186" x="107.81791" y="257.95102"/>
				<text id="GROUP-FEED_BALANCE-1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"7.52904654px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.35292405"}} transform="scale(-0.92315535,1.0832413)" x="-140.31578" y="252.44141" xmlSpace="preserve">
					<tspan id="tspan1236" style={{"strokeWidth":"0.35292405"}} x="-140.31578" y="252.44141">200</tspan>
				</text>
				<text id="GROUP-FEED_BALANCE-1_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64678478px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.35292405"}} transform="scale(-0.92315535,1.0832413)" x="-121.22089" y="251.74272" xmlSpace="preserve">
					<tspan id="tspan1240" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64678478px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.35292405"}} x="-121.22089" y="251.74272">g</tspan>
				</text>
			</g>
			<g id="GROUP-FEED_PUMP-1-3" style={{"display":"inline"}} transform="translate(-13.095706,111.33038)">
				<g id="GROUP-3_PUMP-1_BODY-5">
					<rect height="5.7314448" id="GROUP-3_PUMP-1_PIPE-EXIT-6" style={{"opacity":"1","fill":"url(#linearGradient1395)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6452367" ry="0.045127906" transform="rotate(90)" x="136.1167" y="-68.829254"/>
					<path id="GROUP-3_PUMP-1_BASE-2" style={{"opacity":"1","fill":"url(#radialGradient944-9-6-7)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 54.576604,147.85483 5.272647,-6.53233 c 1.075497,-1.33245 2.465942,-1.58902 3.737011,0.0324 l 5.10532,6.96156 c 1.551803,2.14522 -3.94149,1.09922 -7.144182,1.29727 -2.488394,-0.28155 -9.174428,1.07264 -6.970796,-1.75889 z"/>
					<ellipse id="GROUP-3_PUMP-1_CENTER-9" style={{"opacity":"1","fill":"url(#radialGradient933-9-5-5)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="61.443485" cy="140.64735" rx="4.7802582" ry="4.9886556"/>
					<rect height="3.7550869" id="GROUP-3_PUMP-1_JOINT-EXIT-1" style={{"opacity":"1","fill":"url(#linearGradient1397)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="135.27472" y="-72.584343"/>
					<rect height="4.7454853" id="GROUP-3_PUMP-1_PIPE-INLET-2" style={{"opacity":"1","fill":"url(#linearGradient1399)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6459339" ry="0.037364718" transform="rotate(90)" x="138.93073" y="-59.582016"/>
					<rect height="3.7550869" id="GROUP-3_PUMP-1_JOINT-INLET-7" style={{"opacity":"1","fill":"url(#linearGradient1401)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="137.87543" y="-55.227211"/>
				</g>
				<text id="GROUP-3_PUMP-1_PV-0" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="56.228001" y="151.76965" xmlSpace="preserve">
					<tspan id="GROUP-3_PUMP-1_PV_SPAN-9" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="56.228001" y="151.76965">3.0</tspan>
				</text>
				<text id="GROUP-3_PUMP-1_PV_UNITS-3" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="55.303055" y="158.54007" xmlSpace="preserve">
					<tspan id="GROUP-3_PUMP-1_PV_UNITS_SPAN-6" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="55.303055" y="158.54007">ml/min</tspan>
				</text>
			</g>
			<g id="GROUP-FEED_LINE-1">
				<rect height="8.6812878" id="GROUP-FEED_LINE-1_PIPE-1" style={{"opacity":"1","fill":"url(#linearGradient1272-4-6-4-1-2)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00806147","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7707517" ry="0.068354197" transform="rotate(90)" x="247.89513" y="-67.519363"/>
				<rect height="69.168129" id="GROUP-FEED_LINE-1_PIPE-2" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.0227199","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7622337" ry="0.54461187" x="65.520668" y="180.85654"/>
				<rect height="3.8895674" id="GROUP-FEED_LINE-1_JOINT-1" style={{"opacity":"1","fill":"url(#radialGradient1394-93)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="247.09541" y="-68.762169"/>
				<rect height="20.808395" id="GROUP-FEED_LINE-1_PIPE-3" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-8)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01247917","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.770041" ry="0.16383989" transform="rotate(90)" x="180.55476" y="-86.446503"/>
				<rect height="16.266256" id="GROUP-FEED_LINE-1_PIPE-4" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-8-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01103629","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7714839" ry="0.12807627" x="84.407776" y="180.48839"/>
				<rect height="3.8895674" id="GROUP-FEED_LINE-1_JOINT-2" style={{"opacity":"1","fill":"url(#radialGradient1394-93-3)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="180.27803" y="-87.471039"/>
				<rect height="3.8895674" id="GROUP-FEED_LINE-1_JOINT-3" style={{"opacity":"1","fill":"url(#radialGradient1394-93-2)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="180.27803" y="-68.762169"/>
				<rect height="12.649153" id="GROUP-FEED_LINE-1_PIPE-5" style={{"opacity":"1","fill":"url(#linearGradient1272-4-6-9)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00974382","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781167" ry="0.099596143" x="24.605921" y="251.51965"/>
				<rect height="11.089335" id="GROUP-FEED_LINE-1_PIPE-6" style={{"opacity":"1","fill":"url(#linearGradient1272-4-6-4-1)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00911119","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7707517" ry="0.087314539" transform="rotate(90)" x="250.44635" y="-38.521034"/>
				<rect height="3.8895674" id="GROUP-FEED_LINE-1_JOINT-4" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8-7-4-0-1)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="249.63438" y="-27.939762"/>
			</g>
			<g id="GROUP-FEED_TEMP-1">
				<rect height="11.714491" id="GROUP-FEED_TEMP-1_STEM" style={{"opacity":"1","fill":"url(#linearGradient2514)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00935008","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7622337" ry="0.092236854" x="15.759933" y="230.48212"/>
				<ellipse id="GROUP-FEED_TEMP-1_GAUGE" style={{"opacity":"1","fill":"url(#radialGradient2443-8)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"5","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="17.246231" cy="229.16924" rx="5.8799295" ry="6.0135641"/>
				<text id="GROUP-FEED_TEMP-1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="14.570376" y="212.44939" xmlSpace="preserve">
					<tspan id="stir_1_value-3-4-4-0" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="14.570376" y="212.44939">60</tspan>
				</text>
				<text id="GROUP-FEED_TEMP-1_SYMBOL" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"3.52777767px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="14.967094" y="231.78621" xmlSpace="preserve">
					<tspan id="tspan1452" style={{"fontSize":"7.05555534px","strokeWidth":"0.26458332"}} x="14.967094" y="231.78621">T</tspan>
				</text>
				<text id="GROUP-FEED_TEMP-1_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="15.057282" y="221.78175" xmlSpace="preserve">
					<tspan id="tspan1466" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="15.057282" y="221.78175">C</tspan>
				</text>
			</g>
			<g id="GROUP-FEED_VESSEL-1" transform="matrix(0.59063704,0,0,0.38967742,-61.454419,159.65775)">
				<ellipse id="GROUP-FEED_VESSEL-1_BOTTOM" style={{"opacity":"0.53800001","fill":"url(#radialGradient1044-8-5-3-7-0)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01063567","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="148.75914" cy="287.68719" rx="11.536296" ry="1.7736187"/>
				<rect height="26.055563" id="GROUP-FEED_VESSEL-1_MIDDLE" style={{"opacity":"0.53800001","fill":"url(#linearGradient1755)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01984619","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="22.546705" ry="0.18746896" x="137.45117" y="261.97873"/>
				<ellipse id="GROUP-FEED_VESSEL-1_TOP" style={{"opacity":"0.53800001","fill":"url(#radialGradient1044-0-2-3-7)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01163725","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="148.40388" cy="246.0014" rx="6.7712774" ry="1.1212076"/>
				<path id="GROUP-FEED_VESSEL-1_NECK" style={{"opacity":"0.53800001","fill":"url(#linearGradient1755-3)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01611063","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} d="m 143.04904,245.73901 11.21622,-0.031 c 2.73094,-0.008 -1.56566,3.85347 -0.89687,5.01255 l 6.77393,11.73991 c 0.0373,0.0647 -0.11668,0.12209 -0.26162,0.12209 h -22.29054 c -0.14493,0 -0.29369,-0.0561 -0.26161,-0.12209 l 5.67914,-11.67648 c 0.52127,-1.07176 -3.21454,-5.03593 0.0413,-5.04494 z"/>
			</g>
		</g>
		<g id="GROUP-3" style={{"display":"inline"}} transform="translate(124.66295,1.2341279)">
			<g id="GROUP-3_LINE-1" transform="translate(-1.3363476,13.229169)">
				<rect height="7.4978986" id="GROUP-3_PIPE-1" style={{"opacity":"1","fill":"url(#linearGradient2010)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00749793","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7752192" ry="0.059036504" transform="rotate(90)" x="122.98256" y="-80.349632"/>
				<rect height="60.074654" id="GROUP-3_PIPE-2" style={{"opacity":"1","fill":"url(#linearGradient2012)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.02117381","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7622337" ry="0.47301227" x="79.435432" y="125.11451"/>
				<rect height="3.8895671" id="GROUP-3_JOINT-5" style={{"opacity":"1","fill":"url(#radialGradient1394-6-3)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="122.16164" y="-82.73333"/>
				<rect height="8.6785603" id="GROUP-3_PIPE-3" style={{"opacity":"1","fill":"url(#linearGradient2014)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00807091","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781169" ry="0.068332724" transform="rotate(90)" x="126.02658" y="-54.130058"/>
				<rect height="12.649153" id="GROUP-3_PIPE-4" style={{"opacity":"1","fill":"url(#linearGradient2016)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00974382","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781167" ry="0.099596143" x="42.50169" y="112.81506"/>
				<rect height="3.8895674" id="GROUP-3_JOINT-6" style={{"opacity":"1","fill":"url(#radialGradient1394-8-2-3)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="125.07626" y="-45.980667"/>
				<rect height="3.8895674" id="GROUP-3_JOINT-1" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8-5-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="109.5107" y="-45.862087"/>
			</g>
			<g id="GROUP-3_STR-1">
				<rect height="45.22427" id="GROUP-3_STR-1_SHAFT" style={{"opacity":"1","fill":"url(#linearGradient2018)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01927474","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.0405886" ry="0.35608414" x="92.316826" y="174.63969"/>
				<ellipse id="GROUP-3_STR-1-IMPELLOR-1" style={{"opacity":"1","fill":"url(#radialGradient1179-4-3)","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.02426012","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="-99.941978" cy="218.82756" rx="7.8176227" ry="1.7806129" transform="scale(-1,1)"/>
				<ellipse id="GROUP-3_STR-1-IMPELLOR-2" style={{"opacity":"1","fill":"url(#radialGradient1179-2-4-2)","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.02426012","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="88.117485" cy="219.04822" rx="7.8176227" ry="1.7806129"/>
				<rect height="11.43272" id="GROUP-3_STR-1-HEAD" style={{"opacity":"1","fill":"url(#linearGradient2020)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.02051547","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="13.625921" ry="0.090018265" x="87.03669" y="163.62456"/>
				<text id="GROUP-3_STR-1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254733","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="89.303398" y="155.53604" xmlSpace="preserve">
					<tspan id="STR-1_PV_SPAN" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254733","strokeOpacity":"0"}} x="89.303398" y="155.53604">100</tspan>
				</text>
				<text id="GROUP-3_STR-1_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="88.252106" y="162.60638" xmlSpace="preserve">
					<tspan id="STR-1_PV_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="88.252106" y="162.60638">RPM</tspan>
				</text>
			</g>
			<g id="GROUP-3_CHILLER-1" transform="translate(-11.207853,0.87769441)">
				<rect height="48.584194" id="GROUP-3_CHILLER-1_UNIT" style={{"opacity":"1","fill":"url(#linearGradient2649)","fillOpacity":"1","stroke":"#010001","strokeWidth":"1","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="23.130896" ry="1.1833168" x="86.242126" y="246.66946"/>
				<path id="GROUP-3_CHILLER-1_WAVE-1" style={{"fill":"none","stroke":"#000000","strokeWidth":"0.84863865","strokeLinecap":"butt","strokeLinejoin":"miter","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 86.600311,279.9494 c 6.314141,-9.24352 5.393334,-11.62043 11.312844,-4.48972 3.946355,6.07432 7.498045,10.29993 11.444395,-0.26408"/>
				<path id="GROUP-3_CHILLER-1_WAVE-2" style={{"fill":"none","stroke":"#000000","strokeWidth":"0.83829516","strokeLinecap":"butt","strokeLinejoin":"miter","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 86.596721,284.08965 c 6.154701,-9.2532 5.257146,-11.63261 11.027188,-4.49442 3.846701,6.08069 7.308711,10.31073 11.155411,-0.26437"/>
				<path id="GROUP-3_CHILLER-1_WAVE-3" style={{"fill":"none","stroke":"#000000","strokeWidth":"0.838175","strokeLinecap":"butt","strokeLinejoin":"miter","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 86.545112,288.27974 c 6.153926,-9.25173 5.256484,-11.63075 11.025786,-4.49371 3.846212,6.07972 7.307792,10.30909 11.154002,-0.26431"/>
				<rect height="2.3350008" id="GROUP-3_CHILLER-1_WINDOW-1" style={{"opacity":"1","fill":"#64ad64","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.10553259","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="19.596434" ry="1.1675004" x="87.940659" y="250.77722"/>
				<rect height="4.9713459" id="GROUP-3_CHILLER-1_WINDOW-2" style={{"opacity":"1","fill":"#64ad64","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.10228741","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="19.59968" ry="1.1697271" x="88.063705" y="256.04178"/>
			</g>
			<g id="GROUP-3_PUMP-1">
				<g id="GROUP-3_PUMP-1_BODY">
					<rect height="5.7314448" id="GROUP-3_PUMP-1_PIPE-EXIT" style={{"opacity":"1","fill":"url(#linearGradient2022)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6452367" ry="0.045127906" transform="rotate(90)" x="136.1167" y="-68.829254"/>
					<path id="GROUP-3_PUMP-1_BASE" style={{"opacity":"1","fill":"url(#radialGradient944-9-6)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 54.576604,147.85483 5.272647,-6.53233 c 1.075497,-1.33245 2.465942,-1.58902 3.737011,0.0324 l 5.10532,6.96156 c 1.551803,2.14522 -3.94149,1.09922 -7.144182,1.29727 -2.488394,-0.28155 -9.174428,1.07264 -6.970796,-1.75889 z"/>
					<ellipse id="GROUP-3_PUMP-1_CENTER" style={{"opacity":"1","fill":"url(#radialGradient933-9-5)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="61.443485" cy="140.64735" rx="4.7802582" ry="4.9886556"/>
					<rect height="3.7550869" id="GROUP-3_PUMP-1_JOINT-EXIT" style={{"opacity":"1","fill":"url(#linearGradient2024)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="135.27472" y="-72.584343"/>
					<rect height="4.7454853" id="GROUP-3_PUMP-1_PIPE-INLET" style={{"opacity":"1","fill":"url(#linearGradient2026)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6459339" ry="0.037364718" transform="rotate(90)" x="138.93073" y="-59.582016"/>
					<rect height="3.7550869" id="GROUP-3_PUMP-1_JOINT-INLET" style={{"opacity":"1","fill":"url(#linearGradient2028)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="137.87543" y="-55.227211"/>
				</g>
				<text id="GROUP-3_PUMP-1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="55.631622" y="151.76965" xmlSpace="preserve">
					<tspan id="GROUP-3_PUMP-1_PV_SPAN" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="55.631622" y="151.76965">3.0</tspan>
				</text>
				<text id="GROUP-3_PUMP-1_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="54.537285" y="158.54007" xmlSpace="preserve">
					<tspan id="GROUP-3_PUMP-1_PV_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="54.537285" y="158.54007">ml/min</tspan>
				</text>
			</g>
			<g id="GROUP-3_VESSEL-1">
				<g id="GROUP-3_VESSEL-1_BODY" style={{"opacity":"0.53800001"}} transform="matrix(0.82308662,0,0,0.78040362,23.488899,61.965513)">
					<ellipse id="GROUP-3_VESSEL-1_BOTTOM" style={{"opacity":"1","fill":"url(#radialGradient1044-8-3-2)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03752039","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.306549" cy="212.05258" rx="22.572357" ry="11.281204"/>
					<rect height="46.036709" id="GROUP-3_VESSEL-1_MIDDLE" style={{"opacity":"1","fill":"url(#linearGradient2030)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="45.204529" ry="0.3312327" x="63.603817" y="165.32137"/>
					<ellipse id="GROUP-3_VESSEL-1_TOP" style={{"opacity":"1","fill":"url(#radialGradient1044-5-7)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.206085" cy="165.22214" rx="22.418076" ry="3.4891102"/>
				</g>
				<text id="GROUP-3_VESSEL-1_TJ_PV" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254734","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="73.339394" y="210.11211" xmlSpace="preserve">
					<tspan id="GROUP-3_VESSEL-1_TJ_PV_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","stroke":"#323232","strokeWidth":"0.23254734","strokeOpacity":"0"}} x="73.339394" y="210.11211">70</tspan>
				</text>
				<text id="GROUP-3_VESSEL-1_TJ_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="73.930153" y="218.43529" xmlSpace="preserve">
					<tspan id="GROUP-3_VESSEL-1_TJ_PV_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="73.930153" y="218.43529">Tj C</tspan>
				</text>
				<text id="GROUP-3_VESSEL-1_TR_PV" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254736","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="82.161919" y="201.16623" xmlSpace="preserve">
					<tspan id="GROUP-3_VESSEL-1_TR_PV_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","stroke":"#323232","strokeWidth":"0.23254736","strokeOpacity":"0"}} x="82.161919" y="201.16623">50</tspan>
				</text>
				<text id="GROUP-3_VESSEL-1_TR_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="82.26387" y="209.62077" xmlSpace="preserve">
					<tspan id="GROUP-3_VESSEL-1_TR_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="82.26387" y="209.62077">Tr C</tspan>
				</text>
				<text id="GROUP-3_VESSEL-1_CONC_PV" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="87.098145" y="228.30254" xmlSpace="preserve">
					<tspan id="tspan1235" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="87.098145" y="228.30254">12.2</tspan>
				</text>
				<text id="GROUP-3_VESSEL-1_CONC_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="88.610291" y="232.96748" xmlSpace="preserve">
					<tspan id="GROUP-3_VESSEL-1_CONC_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="88.610291" y="232.96748">mg/L</tspan>
				</text>
			</g>
		</g>
		<g id="GROUP-2" style={{"display":"inline"}} transform="translate(60.232276,0.69958846)">
			<g id="GROUP-2_LINE-1" transform="translate(-1.3363476,13.229169)">
				<rect height="7.4978986" id="GROUP-2_PIPE-1" style={{"opacity":"1","fill":"url(#linearGradient1610)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00749793","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7752192" ry="0.059036504" transform="rotate(90)" x="122.98256" y="-80.349632"/>
				<rect height="60.074654" id="GROUP-2_PIPE-2" style={{"opacity":"1","fill":"url(#linearGradient1613)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.02117381","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7622337" ry="0.47301227" x="79.435432" y="125.11451"/>
				<rect height="3.8895671" id="GROUP-2_JOINT-5" style={{"opacity":"1","fill":"url(#radialGradient1394-6-3-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="122.16164" y="-82.73333"/>
				<rect height="8.6785603" id="GROUP-2_PIPE-3" style={{"opacity":"1","fill":"url(#linearGradient1620)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00807091","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781169" ry="0.068332724" transform="rotate(90)" x="126.02658" y="-54.130058"/>
				<rect height="12.649153" id="GROUP-2_PIPE-4" style={{"opacity":"1","fill":"url(#linearGradient1622)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00974382","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781167" ry="0.099596143" x="42.50169" y="112.81506"/>
				<rect height="3.8895674" id="GROUP-2_JOINT-6" style={{"opacity":"1","fill":"url(#radialGradient1394-8-2-3-3)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="125.07626" y="-45.980667"/>
				<rect height="3.8895674" id="GROUP-2_JOINT-1" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8-5-7-5)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="109.5107" y="-45.862087"/>
			</g>
			<g id="GROUP-2_STR-1">
				<rect height="45.22427" id="GROUP-2_STR-1_SHAFT" style={{"opacity":"1","fill":"url(#linearGradient1624)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01927474","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.0405886" ry="0.35608414" x="92.316826" y="174.63969"/>
				<ellipse id="GROUP-2_STR-1-IMPELLOR-1" style={{"opacity":"1","fill":"url(#radialGradient1179-4-3-6)","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.02426012","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="-99.941978" cy="218.82756" rx="7.8176227" ry="1.7806129" transform="scale(-1,1)"/>
				<ellipse id="GROUP-2_STR-1-IMPELLOR-2" style={{"opacity":"1","fill":"url(#radialGradient1179-2-4-2-2)","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.02426012","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="88.117485" cy="219.04822" rx="7.8176227" ry="1.7806129"/>
				<rect height="11.43272" id="GROUP-2_STR-1-HEAD" style={{"opacity":"1","fill":"url(#linearGradient1626)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.02051547","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="13.625921" ry="0.090018265" x="87.03669" y="163.62456"/>
				<text id="GROUP-2_STR-1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254733","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="89.005211" y="155.53604" xmlSpace="preserve">
					<tspan id="tspan2097" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254733","strokeOpacity":"0"}} x="89.005211" y="155.53604">100</tspan>
				</text>
				<text id="GROUP-2_STR-1_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="87.666977" y="162.60638" xmlSpace="preserve">
					<tspan id="tspan2101" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="87.666977" y="162.60638">RPM</tspan>
				</text>
			</g>
			<g id="GROUP-2_CHILLER-1" transform="translate(-5.9416491,1.1702614)">
				<rect height="48.584194" id="GROUP-2_CHILLER-1_UNIT" style={{"opacity":"1","fill":"url(#linearGradient2606)","fillOpacity":"1","stroke":"#010001","strokeWidth":"1","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="23.130896" ry="1.1833168" x="86.242126" y="246.66946"/>
				<path id="GROUP-2_CHILLER-1_WAVE-1" style={{"fill":"none","stroke":"#000000","strokeWidth":"0.84863865","strokeLinecap":"butt","strokeLinejoin":"miter","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 86.600311,279.9494 c 6.314141,-9.24352 5.393334,-11.62043 11.312844,-4.48972 3.946355,6.07432 7.498045,10.29993 11.444395,-0.26408"/>
				<path id="GROUP-2_CHILLER-1_WAVE-2" style={{"fill":"none","stroke":"#000000","strokeWidth":"0.83829516","strokeLinecap":"butt","strokeLinejoin":"miter","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 86.596721,284.08965 c 6.154701,-9.2532 5.257146,-11.63261 11.027188,-4.49442 3.846701,6.08069 7.308711,10.31073 11.155411,-0.26437"/>
				<path id="GROUP-2_CHILLER-1_WAVE-3" style={{"fill":"none","stroke":"#000000","strokeWidth":"0.838175","strokeLinecap":"butt","strokeLinejoin":"miter","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 86.545112,288.27974 c 6.153926,-9.25173 5.256484,-11.63075 11.025786,-4.49371 3.846212,6.07972 7.307792,10.30909 11.154002,-0.26431"/>
				<rect height="2.3350008" id="GROUP-2_CHILLER-1_WINDOW-1" style={{"opacity":"1","fill":"#64ad64","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.10553259","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="19.596434" ry="1.1675004" x="87.940659" y="250.77722"/>
				<rect height="4.9713459" id="GROUP-2_CHILLER-1_WINDOW-2" style={{"opacity":"1","fill":"#64ad64","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.10228741","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="19.59968" ry="1.1697271" x="88.063705" y="256.04178"/>
			</g>
			<g id="GROUP-2_PUMP-1">
				<g id="GROUP-2_PUMP-1_BODY">
					<rect height="5.7314448" id="GROUP-2_PUMP-1_PIPE-EXIT" style={{"opacity":"1","fill":"url(#linearGradient1630)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6452367" ry="0.045127906" transform="rotate(90)" x="136.1167" y="-68.829254"/>
					<path id="GROUP-2_PUMP-1_BASE" style={{"opacity":"1","fill":"url(#radialGradient944-9-6-9)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 54.576604,147.85483 5.272647,-6.53233 c 1.075497,-1.33245 2.465942,-1.58902 3.737011,0.0324 l 5.10532,6.96156 c 1.551803,2.14522 -3.94149,1.09922 -7.144182,1.29727 -2.488394,-0.28155 -9.174428,1.07264 -6.970796,-1.75889 z"/>
					<ellipse id="GROUP-2_PUMP-1_CENTER" style={{"opacity":"1","fill":"url(#radialGradient933-9-5-1)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="61.443485" cy="140.64735" rx="4.7802582" ry="4.9886556"/>
					<rect height="3.7550869" id="GROUP-2_PUMP-1_JOINT-EXIT" style={{"opacity":"1","fill":"url(#linearGradient1632)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="135.27472" y="-72.584343"/>
					<rect height="4.7454853" id="GROUP-2_PUMP-1_PIPE-INLET" style={{"opacity":"1","fill":"url(#linearGradient1634)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6459339" ry="0.037364718" transform="rotate(90)" x="138.93073" y="-59.582016"/>
					<rect height="3.7550869" id="GROUP-2_PUMP-1_JOINT-INLET" style={{"opacity":"1","fill":"url(#linearGradient1636)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="137.87543" y="-55.227211"/>
				</g>
				<text id="GROUP-2_PUMP-1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="56.228001" y="152.34375" xmlSpace="preserve">
					<tspan id="GROUP-2_PUMP-1_PV_SPAN" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="56.228001" y="152.34375">3.0</tspan>
				</text>
				<text id="GROUP-2_PUMP-1_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="54.829853" y="159.41777" xmlSpace="preserve">
					<tspan id="GROUP-2_PUMP-1_PV_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="54.829853" y="159.41777">ml/min</tspan>
				</text>
			</g>
			<g id="GROUP-2_VESSEL-1">
				<g id="GROUP-2_VESSEL-1_BODY" style={{"opacity":"0.53800001"}} transform="matrix(0.82308662,0,0,0.78040362,23.488899,61.965513)">
					<ellipse id="GROUP-2_VESSEL-1_BOTTOM" style={{"opacity":"1","fill":"url(#radialGradient1044-8-3-2-2)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03752039","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.306549" cy="212.05258" rx="22.572357" ry="11.281204"/>
					<rect height="46.036709" id="GROUP-2_VESSEL-1_MIDDLE" style={{"opacity":"1","fill":"url(#linearGradient1638)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="45.204529" ry="0.3312327" x="63.603817" y="165.32137"/>
					<ellipse id="GROUP-2_VESSEL-1_TOP" style={{"opacity":"1","fill":"url(#radialGradient1044-5-7-9)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.206085" cy="165.22214" rx="22.418076" ry="3.4891102"/>
				</g>
				<text id="GROUP-2_VESSEL-1_TJ_PV" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254734","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="73.339394" y="210.11211" xmlSpace="preserve">
					<tspan id="GROUP-2_VESSEL-1_TJ_PV_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","stroke":"#323232","strokeWidth":"0.23254734","strokeOpacity":"0"}} x="73.339394" y="210.11211">70</tspan>
				</text>
				<text id="GROUP-2_VESSEL-1_TJ_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="73.637589" y="218.43529" xmlSpace="preserve">
					<tspan id="GROUP-2_VESSEL-1_TJ_PV_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="73.637589" y="218.43529">Tj C</tspan>
				</text>
				<text id="GROUP-2_VESSEL-1_TR_PV" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254736","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="83.354683" y="200.87918" xmlSpace="preserve">
					<tspan id="GROUP-2_VESSEL-1_TR_PV_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","stroke":"#323232","strokeWidth":"0.23254736","strokeOpacity":"0"}} x="83.354683" y="200.87918">50</tspan>
				</text>
				<text id="GROUP-2_VESSEL-1_TR_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="84.311836" y="209.03563" xmlSpace="preserve">
					<tspan id="GROUP-2_VESSEL-1_TR_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="84.311836" y="209.03563">Tr C</tspan>
				</text>
				<text id="GROUP-2_VESSEL-1_CONC_PV" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="85.635315" y="228.59509" xmlSpace="preserve">
					<tspan id="tspan2131" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="85.635315" y="228.59509">12.2</tspan>
				</text>
				<text id="GROUP-2_VESSEL-1_CONC_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="85.977196" y="233.26004" xmlSpace="preserve">
					<tspan id="GROUP-2_VESSEL-1_CONC_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="85.977196" y="233.26004">mg/L</tspan>
				</text>
			</g>
		</g>
		<g id="GROUP-1" style={{"display":"inline"}} transform="translate(0.09663279,1.2341275)">
			<g id="GROUP-1_LINE-1" transform="translate(-1.3363476,13.229169)">
				<rect height="7.4978986" id="GROUP-1_PIPE-1" style={{"opacity":"1","fill":"url(#linearGradient2952)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00749793","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7752192" ry="0.059036504" transform="rotate(90)" x="122.98256" y="-80.349632"/>
				<rect height="60.074654" id="GROUP-1_PIPE-2" style={{"opacity":"1","fill":"url(#linearGradient2954)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.02117381","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7622337" ry="0.47301227" x="79.435432" y="125.11451"/>
				<rect height="3.8895671" id="GROUP-1_JOINT-5" style={{"opacity":"1","fill":"url(#radialGradient2956)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="122.16164" y="-82.73333"/>
				<rect height="8.6785603" id="GROUP-1_PIPE-3" style={{"opacity":"1","fill":"url(#linearGradient2958)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00807091","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781169" ry="0.068332724" transform="rotate(90)" x="126.02658" y="-54.130058"/>
				<rect height="12.649153" id="GROUP-1_PIPE-4" style={{"opacity":"1","fill":"url(#linearGradient2960)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00974382","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781167" ry="0.099596143" x="42.50169" y="112.81506"/>
				<rect height="3.8895674" id="GROUP-1_JOINT-6" style={{"opacity":"1","fill":"url(#radialGradient2962)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="125.07626" y="-45.980667"/>
				<rect height="3.8895674" id="GROUP-1_JOINT-1" style={{"opacity":"1","fill":"url(#radialGradient2964)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="109.5107" y="-45.862087"/>
			</g>
			<g id="GROUP-1_STR-1">
				<rect height="45.22427" id="GROUP-1_STR-1_SHAFT" style={{"opacity":"1","fill":"url(#linearGradient2966)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01927474","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.0405886" ry="0.35608414" x="92.316826" y="174.63969"/>
				<ellipse id="GROUP-1_STR-1-IMPELLOR-1" style={{"opacity":"1","fill":"url(#radialGradient2968)","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.02426012","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="-99.941978" cy="218.82756" rx="7.8176227" ry="1.7806129" transform="scale(-1,1)"/>
				<ellipse id="GROUP-1_STR-1-IMPELLOR-2" style={{"opacity":"1","fill":"url(#radialGradient2970)","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.02426012","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="88.117485" cy="219.04822" rx="7.8176227" ry="1.7806129"/>
				<rect height="11.43272" id="GROUP-1_STR-1-HEAD" style={{"opacity":"1","fill":"url(#linearGradient2972)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.02051547","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="13.625921" ry="0.090018265" x="87.03669" y="163.62456"/>
				<text id="GROUP-1_STR-1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254733","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="89.89978" y="155.53604" xmlSpace="preserve">
					<tspan id="tspan2910" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254733","strokeOpacity":"0"}} x="89.89978" y="155.53604">100</tspan>
				</text>
				<text id="GROUP-1_STR-1_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="88.837242" y="162.31383" xmlSpace="preserve">
					<tspan id="tspan2914" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="88.837242" y="162.31383">RPM</tspan>
				</text>
			</g>
			<g id="GROUP-1_PUMP-1">
				<g id="GROUP-1_PUMP-1_BODY">
					<rect height="5.7314448" id="GROUP-1_PUMP-1_PIPE-EXIT" style={{"opacity":"1","fill":"url(#linearGradient2974)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6452367" ry="0.045127906" transform="rotate(90)" x="136.1167" y="-68.829254"/>
					<path id="GROUP-1_PUMP-1_BASE" style={{"opacity":"1","fill":"url(#radialGradient2976)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 54.576604,147.85483 5.272647,-6.53233 c 1.075497,-1.33245 2.465942,-1.58902 3.737011,0.0324 l 5.10532,6.96156 c 1.551803,2.14522 -3.94149,1.09922 -7.144182,1.29727 -2.488394,-0.28155 -9.174428,1.07264 -6.970796,-1.75889 z"/>
					<ellipse id="GROUP-1_PUMP-1_CENTER" style={{"opacity":"1","fill":"url(#radialGradient2978)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="61.443485" cy="140.64735" rx="4.7802582" ry="4.9886556"/>
					<rect height="3.7550869" id="GROUP-1_PUMP-1_JOINT-EXIT" style={{"opacity":"1","fill":"url(#linearGradient2980)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="135.27472" y="-72.584343"/>
					<rect height="4.7454853" id="GROUP-1_PUMP-1_PIPE-INLET" style={{"opacity":"1","fill":"url(#linearGradient2982)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6459339" ry="0.037364718" transform="rotate(90)" x="138.93073" y="-59.582016"/>
					<rect height="3.7550869" id="GROUP-1_PUMP-1_JOINT-INLET" style={{"opacity":"1","fill":"url(#linearGradient2984)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="137.87543" y="-55.227211"/>
				</g>
				<text id="GROUP-1_PUMP-1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","opacity":"0.92000002","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="55.92981" y="152.0567" xmlSpace="preserve">
					<tspan id="GROUP-1_PUMP-1_PV_SPAN" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="55.92981" y="152.0567">3.0</tspan>
				</text>
				<text id="GROUP-1_PUMP-1_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="54.537285" y="159.12521" xmlSpace="preserve">
					<tspan id="GROUP-1_PUMP-1_PV_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="54.537285" y="159.12521">ml/min</tspan>
				</text>
			</g>
			<g id="GROUP-1_VESSEL-1">
				<g id="GROUP-1_VESSEL-1_BODY" style={{"opacity":"0.53800001"}} transform="matrix(0.82308662,0,0,0.78040362,23.488899,61.965513)">
					<ellipse id="GROUP-1_VESSEL-1_BOTTOM" style={{"opacity":"1","fill":"url(#radialGradient2986)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03752039","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.306549" cy="212.05258" rx="22.572357" ry="11.281204"/>
					<rect height="46.036709" id="GROUP-1_VESSEL-1_MIDDLE" style={{"opacity":"1","fill":"url(#linearGradient2988)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="45.204529" ry="0.3312327" x="63.603817" y="165.32137"/>
					<ellipse id="GROUP-1_VESSEL-1_TOP" style={{"opacity":"1","fill":"url(#radialGradient2990)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.206085" cy="165.22214" rx="22.418076" ry="3.4891102"/>
				</g>
				<text id="GROUP-1_VESSEL-1_TJ_PV" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254734","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="73.339394" y="210.11211" xmlSpace="preserve">
					<tspan id="GROUP-1_VESSEL-1_TJ_PV_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","stroke":"#323232","strokeWidth":"0.23254734","strokeOpacity":"0"}} x="73.339394" y="210.11211">70</tspan>
				</text>
				<text id="GROUP-1_VESSEL-1_TJ_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="73.052452" y="218.43529" xmlSpace="preserve">
					<tspan id="GROUP-1_VESSEL-1_TJ_PV_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="73.052452" y="218.43529">Tj C</tspan>
				</text>
				<text id="GROUP-1_VESSEL-1_TR_PV" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254736","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="83.951065" y="199.15688" xmlSpace="preserve">
					<tspan id="GROUP-1_VESSEL-1_TR_PV_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","stroke":"#323232","strokeWidth":"0.23254736","strokeOpacity":"0"}} x="83.951065" y="199.15688">50</tspan>
				</text>
				<text id="GROUP-1_VESSEL-1_TR_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="82.848999" y="207.57281" xmlSpace="preserve">
					<tspan id="GROUP-1_VESSEL-1_TR_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="82.848999" y="207.57281">Tr C</tspan>
				</text>
				<text id="GROUP-1_VESSEL-1_CONC_PV" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="85.927879" y="228.30254" xmlSpace="preserve">
					<tspan id="tspan2943" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"5.64444447px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="85.927879" y="228.30254">12.2</tspan>
				</text>
				<text id="GROUP-1_VESSEL-1_CONC_PV_UNITS" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","lineHeight":"1.25","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","letterSpacing":"0px","wordSpacing":"0px","writingMode":"lr-tb","textAnchor":"start","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="85.977196" y="232.67491" xmlSpace="preserve">
					<tspan id="GROUP-1_VESSEL-1_CONC_UNITS_SPAN" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"4.23333359px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Normal'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}} x="85.977196" y="232.67491">mg/L</tspan>
				</text>
			</g>
			<g id="GROUP-1_CHILLER-1" transform="translate(-7.6067327,0.58513333)">
				<rect height="48.584194" id="GROUP-1_CHILLER-1_UNIT" style={{"opacity":"1","fill":"url(#linearGradient5243)","fillOpacity":"1","stroke":"#010001","strokeWidth":"1","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="23.130896" ry="1.1833168" x="86.242126" y="246.66946"/>
				<path id="GROUP-1_CHILLER-1_WAVE-1" style={{"fill":"none","stroke":"#000000","strokeWidth":"0.84863865","strokeLinecap":"butt","strokeLinejoin":"miter","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 86.600311,279.9494 c 6.314141,-9.24352 5.393334,-11.62043 11.312844,-4.48972 3.946355,6.07432 7.498045,10.29993 11.444395,-0.26408"/>
				<path id="GROUP-1_CHILLER-1_WAVE-2" style={{"fill":"none","stroke":"#000000","strokeWidth":"0.83829516","strokeLinecap":"butt","strokeLinejoin":"miter","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 86.596721,284.08965 c 6.154701,-9.2532 5.257146,-11.63261 11.027188,-4.49442 3.846701,6.08069 7.308711,10.31073 11.155411,-0.26437"/>
				<path id="GROUP-1_CHILLER-1_WAVE-3" style={{"fill":"none","stroke":"#000000","strokeWidth":"0.838175","strokeLinecap":"butt","strokeLinejoin":"miter","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 86.545112,288.27974 c 6.153926,-9.25173 5.256484,-11.63075 11.025786,-4.49371 3.846212,6.07972 7.307792,10.30909 11.154002,-0.26431"/>
				<rect height="2.3350008" id="GROUP-1_CHILLER-1_WINDOW-1" style={{"opacity":"1","fill":"#64ad64","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.10553259","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="19.596434" ry="1.1675004" x="87.940659" y="250.77722"/>
				<rect height="4.9713459" id="GROUP-1_CHILLER-1_WINDOW-2" style={{"opacity":"1","fill":"#64ad64","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.10228741","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="19.59968" ry="1.1697271" x="88.063705" y="256.04178"/>
			</g>
		</g>
		<text id="GROUP-1_VESSEL-1_D50_PV_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"10.58333397px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458335"}} x="106.49426" y="203.08611" xmlSpace="preserve">
			<tspan id="tspan3094" style={{"fontSize":"4.23333359px","strokeWidth":"0.26458335"}} x="106.49426" y="203.08611">D50 μm</tspan>
		</text>
		<text id="GROUP-1_VESSEL-1_D50_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"4.93888903px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458335"}} x="106.2017" y="198.11246" xmlSpace="preserve">
			<tspan id="tspan3102" style={{"fontSize":"5.64444447px","strokeWidth":"0.26458335"}} x="106.2017" y="198.11246">200</tspan>
		</text>
		<text id="GROUP-1_VESSEL-1_D90_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"4.93888903px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458335"}} x="105.76651" y="211.57721" xmlSpace="preserve">
			<tspan id="tspan3102-6" style={{"fontSize":"5.64444494px","strokeWidth":"0.26458335"}} x="105.76651" y="211.57721">200</tspan>
		</text>
		<text id="GROUP-1_VESSEL-1_D90_PV_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"10.58333397px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458335"}} x="105.66534" y="216.21201" xmlSpace="preserve">
			<tspan id="tspan3094-7" style={{"fontSize":"4.23333359px","strokeWidth":"0.26458335"}} x="105.66534" y="216.21201">D90 μm</tspan>
		</text>
		<text id="GROUP-2_VESSEL-1_D50_PV_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"10.58333397px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458335"}} x="168.98163" y="200.37175" xmlSpace="preserve">
			<tspan id="tspan3094-9" style={{"fontSize":"4.23333359px","strokeWidth":"0.26458335"}} x="168.98163" y="200.37175">D50 μm</tspan>
		</text>
		<text id="GROUP-2_VESSEL-1_D50_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"4.93888903px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458335"}} x="168.68906" y="195.3981" xmlSpace="preserve">
			<tspan id="tspan3102-4" style={{"fontSize":"5.64444494px","strokeWidth":"0.26458335"}} x="168.68906" y="195.3981">200</tspan>
		</text>
		<text id="GROUP-2_VESSEL-1_D90_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"4.93888903px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458335"}} x="168.25388" y="208.86285" xmlSpace="preserve">
			<tspan id="tspan3102-6-5" style={{"fontSize":"5.64444494px","strokeWidth":"0.26458335"}} x="168.25388" y="208.86285">200</tspan>
		</text>
		<text id="GROUP-2_VESSEL-1_D90_PV_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"10.58333397px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458335"}} x="168.15269" y="213.49765" xmlSpace="preserve">
			<tspan id="tspan3094-7-1" style={{"fontSize":"4.23333359px","strokeWidth":"0.26458335"}} x="168.15269" y="213.49765">D90 μm</tspan>
		</text>
		<text id="GROUP-3_VESSEL-1_D50_PV_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"10.58333397px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458335"}} x="230.42061" y="202.12714" xmlSpace="preserve">
			<tspan id="tspan3094-8" style={{"fontSize":"4.23333359px","strokeWidth":"0.26458335"}} x="230.42061" y="202.12714">D50 μm</tspan>
		</text>
		<text id="GROUP-3_VESSEL-1_D50_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"4.93888903px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458335"}} x="230.12804" y="197.15349" xmlSpace="preserve">
			<tspan id="tspan3102-60" style={{"fontSize":"5.64444494px","strokeWidth":"0.26458335"}} x="230.12804" y="197.15349">200</tspan>
		</text>
		<text id="GROUP-3_VESSEL-1_D90_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"4.93888903px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458335"}} x="229.69286" y="210.61824" xmlSpace="preserve">
			<tspan id="tspan3102-6-4" style={{"fontSize":"5.64444494px","strokeWidth":"0.26458335"}} x="229.69286" y="210.61824">200</tspan>
		</text>
		<text id="GROUP-3_VESSEL-1_D90_PV_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"10.58333397px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458335"}} x="229.59167" y="215.25304" xmlSpace="preserve">
			<tspan id="tspan3094-7-9" style={{"fontSize":"4.23333359px","strokeWidth":"0.26458335"}} x="229.59167" y="215.25304">D90 μm</tspan>
		</text>
	</g>
</svg>


        </div>
        <ParameterEditor
          isDrawerOpen={isDrawerOpen}
          handleDrawerExit={this.handleDrawerExit}
					selectedParameter={selectedParameter}
          sendWebSocketCommand={sendWebSocketCommand}
        />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  processState: state.processState,
});

const mapDispatchToProps = {
  connectWebSocket,
  setProcessState,
  sendWebSocketCommand
};

ProcessMap.propTypes = {
  connectWebSocket: PropTypes.func.isRequired,
  setProcessState: PropTypes.func.isRequired,
  processState: PropTypes.object.isRequired,
  sendWebSocketCommand: PropTypes.func.isRequired,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {name: 'ProcessMap'})
)(ProcessMap);
