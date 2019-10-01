import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    position: 'relative'
  },
});

const groups = {
  "PMP_1": ["PMP_1_BODY"],
  "PMP_2": ["PMP_2_BODY"],
  "PMP_3": ["PMP_3_BODY"],
  "AS_LNE_1": ["SYS_1_LNE"],
  "AS_LNE_2": ["SYS_2_LNE"],
  "AS_LNE_3": ["SYS_3_LNE"],
  "TRANSFER_LN_1-2": ["LN_1-2"],
  "TRANSFER_LN_2-3": ["LN_2-3"],
  "TRANSFER_LN_3-SEP": ["LN_3-S"],
}
  

class ProcessMap extends Component {

  componentDidMount = () => {
    this.getElements();
    this.formatSVG();
  }

  componentDidUpdate = () => {
    this.formatSVG();
  }

  getElements = () => {
    let svg = document.getElementById("svg8");
    for (let group in groups) {
      groups[group].forEach((x) => {
        this[x] = svg.querySelector('[id^="' + x + '"]');
        console.log(this[x]);
      });
    }
  };

  formatSVG = () => {

    // PMPs
    for (let group in groups) {
      groups[group].forEach((element) => {
        this[element].style.stroke="red";
        this[element].style.strokeWidth="0.7";
        this[element].childNodes.forEach((x) => {
          x.style.stroke="red";
          x.style.strokeWidth="0.7";
        });
      });
    }
  };

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.container}>

<svg height="760" id="svg8" width="1080" version="1.1" viewBox="0 0 285.75 201.08334" xmlns="http://www.w3.org/2000/svg">
	<defs id="defs2">
		<linearGradient id="steal">
			<stop id="stop1173" style={{"stopColor":"#ffffff","stopOpacity":"1"}} offset="0"/>
			<stop id="stop1175" style={{"stopColor":"#323232","stopOpacity":"1"}} offset="1"/>
		</linearGradient>
		<linearGradient id="glass">
			<stop id="stop1046" style={{"stopColor":"#ffffff","stopOpacity":"1"}} offset="0"/>
			<stop id="stop1048" style={{"stopColor":"#3264c8","stopOpacity":"1"}} offset="1"/>
		</linearGradient>
		<linearGradient id="linearGradient972" gradientTransform="matrix(0.75170943,0,0,0.74244933,-53.526139,80.74127)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.71486016,0.00342069,-0.00129611,0.1078,47.781548,150.92732)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-8" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(1.0914026,-0.01402807,0.01116904,0.34840914,25.921477,167.20603)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1111" gradientTransform="matrix(0.30977804,0,0,0.47971832,43.870807,118.6902)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.94032" x2="169.11494" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1179" cx="-205.14154" cy="204.22151" fx="-205.14154" fy="204.22151" gradientTransform="matrix(0.24049826,0.00184288,-0.00253978,0.06553777,-53.289135,205.82138)" gradientUnits="userSpaceOnUse" r="35.972752" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1179-2" cx="-205.14154" cy="204.22151" fx="-205.14154" fy="204.22151" gradientTransform="matrix(0.24049826,0.00184288,-0.00253978,0.06553777,134.77033,206.04205)" gradientUnits="userSpaceOnUse" r="35.972752" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1271" gradientTransform="matrix(1.3882216,0,0,0.12127305,-130.06659,149.48052)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient933" cx="171.85429" cy="142.51819" fx="171.85429" fy="142.51819" gradientTransform="matrix(0.30314466,0,0,0.31787938,9.3467753,95.343768)" gradientUnits="userSpaceOnUse" r="18.268902" xlinkHref="#steal"/>
		<radialGradient id="radialGradient944" cx="206.20508" cy="236.63559" fx="206.20508" fy="236.63559" gradientTransform="matrix(0.34927491,0.00762032,-0.00158779,0.10958575,-10.099137,121.37887)" gradientUnits="userSpaceOnUse" r="31.923616" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1018" gradientTransform="matrix(0.37138012,0,0,0.06079653,78.036743,-75.919933)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1093" gradientTransform="matrix(0.56361435,0,0,0.03983224,47.131339,-77.229967)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1018-8" gradientTransform="matrix(0.37145112,0,0,0.05033792,80.839653,-65.452911)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1093-8" gradientTransform="matrix(0.56361435,0,0,0.03983224,49.732061,-59.872838)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272" gradientTransform="matrix(0.2827419,0,0,0.07953425,78.764707,-89.625731)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376346,-0.03028719,0.03329679,0.74333763,29.505159,35.511664)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8" gradientTransform="matrix(0.28141895,0,0,0.63724423,35.424441,50.792955)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-4" gradientTransform="matrix(0.28303714,0,0,0.09205816,81.762544,-64.866752)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,32.419792,72.26435)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-4-6" gradientTransform="matrix(0.28303714,0,0,0.13417638,-1.7623707,97.166177)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-9" gradientTransform="matrix(0.28261624,0,0,1.5935766,79.338726,-361.68343)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-8" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,16.854219,72.382932)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-7" gradientTransform="matrix(0.28169198,0,0,0.18089251,118.82542,148.39185)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-7-3" gradientTransform="matrix(0.28169198,0,0,0.18089251,68.153531,148.16832)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-7-3-9" gradientTransform="matrix(0.28085648,0,0,0.54085963,125.04135,-227.54296)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-1-7" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,75.699879,2.7320956)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-1-0" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,75.468385,-47.804911)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1044-8-5-3-7" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(1.0914026,-0.01402807,0.01116904,0.34840914,25.921477,167.20603)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-0-2-3" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.71486016,0.00342069,-0.00129611,0.1078,47.781548,150.92732)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient2548" gradientTransform="matrix(0.75170943,0,0,0.74244933,-53.526139,80.74127)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1364" cx="31.805073" cy="208.40013" fx="31.805073" fy="208.40013" gradientTransform="matrix(2.1493369,0.03485004,-0.04661593,1.713824,-25.462237,-102.9643)" gradientUnits="userSpaceOnUse" r="22.277945" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1364-7" cx="31.805073" cy="208.40013" fx="31.805073" fy="208.40013" gradientTransform="matrix(2.1493369,0.03485004,-0.04661593,1.713824,-36.020295,-104.96884)" gradientUnits="userSpaceOnUse" r="22.277945" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1364-7-6" cx="31.647467" cy="208.55928" fx="31.647467" fy="208.55928" gradientTransform="matrix(2.1493369,0.03485004,-0.04661593,1.713824,-36.776607,-68.706698)" gradientUnits="userSpaceOnUse" r="22.277945" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1364-7-6-2" cx="31.647467" cy="208.55928" fx="31.647467" fy="208.55928" gradientTransform="matrix(2.1493369,0.03485004,-0.04661593,1.713824,-89.48111,-88.394015)" gradientUnits="userSpaceOnUse" r="22.277945" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1364-7-6-2-2" cx="31.647467" cy="208.55928" fx="31.647467" fy="208.55928" gradientTransform="matrix(2.1493369,0.03485004,-0.04661593,1.713824,-29.528175,-84.989275)" gradientUnits="userSpaceOnUse" r="22.277945" xlinkHref="#glass"/>
		<radialGradient id="radialGradient944-8" cx="206.20508" cy="236.63559" fx="206.20508" fy="236.63559" gradientTransform="matrix(0.34927491,0.00762032,-0.00158779,0.10958575,-23.37668,232.43038)" gradientUnits="userSpaceOnUse" r="31.923616" xlinkHref="#steal"/>
		<radialGradient id="radialGradient933-8" cx="171.85429" cy="142.51819" fx="171.85429" fy="142.51819" gradientTransform="matrix(0.30314466,0,0,0.31787939,-3.9307677,206.39528)" gradientUnits="userSpaceOnUse" r="18.268902" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1612" gradientTransform="matrix(0.37138013,0,0,0.06079653,189.08825,-62.64239)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1614" gradientTransform="matrix(0.56361436,0,0,0.03983224,158.18285,-63.952424)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1616" gradientTransform="matrix(0.37145113,0,0,0.05033792,191.89116,-52.175368)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1618" gradientTransform="matrix(0.56361436,0,0,0.03983224,160.78357,-46.595295)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1628" gradientTransform="matrix(0.6597234,0,0,0.62321209,40.109517,102.17259)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="121.2458" x2="143.08377" y1="255.30592" y2="254.50412" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1044-8-5-3-7-0" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.5577948,-0.00220548,0.00570827,0.05477651,117.89748,280.63639)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-0-2-3-7" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.21592026,0.00109922,-3.9148414e-4,0.03464097,136.79794,241.40787)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1755" gradientTransform="matrix(0.37493083,0,0,0.42020673,79.030174,214.10881)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1755-3" gradientTransform="matrix(0.37937184,0,0,0.27366529,78.215563,214.43756)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1628-6" gradientTransform="matrix(0.53575755,0,0,0.43131236,-92.994874,66.127562)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="121.2458" x2="143.08377" y1="255.30592" y2="254.50412" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1044-8-5-3-7-0-6" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.5577948,-0.00220548,0.00570827,0.05477651,117.89748,280.63639)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-0-2-3-7-7" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.21592026,0.00109922,-3.9148414e-4,0.03464097,136.79794,241.40787)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1882" gradientTransform="matrix(0.37493083,0,0,0.42020673,79.030174,214.10881)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1884" gradientTransform="matrix(0.37937184,0,0,0.27366529,78.215563,214.43756)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
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
		<radialGradient id="radialGradient1044-8-5-3-7-0-6-5" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.5577948,-0.00220548,0.00570827,0.05477651,117.89748,280.63639)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1882-5" gradientTransform="matrix(0.37493083,0,0,0.42020673,79.030174,214.10881)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-0-2-3-7-7-0" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.21592026,0.00109922,-3.9148414e-4,0.03464097,136.79794,241.40787)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1884-6" gradientTransform="matrix(0.37937184,0,0,0.27366529,78.215563,214.43756)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1628-6-0" gradientTransform="matrix(0.68348631,0,0,0.43131236,-331.53656,173.97149)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="121.2458" x2="143.08377" y1="255.30592" y2="254.50412" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-9-7" gradientTransform="matrix(0.28431055,0,0,0.26418822,196.084,-302.52377)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-9-7-2" gradientTransform="matrix(0.28431056,0,0,0.23862581,-294.68639,-291.17749)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-9-7-2-7" gradientTransform="matrix(0.28479107,0,0,0.09692226,-318.55088,-254.34053)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-8-7-4-0-4" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,146.95608,-156.04775)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-8-7-4-0-2" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,147.75789,-132.7953)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1521" cx="275.55487" cy="167.62898" fx="275.55487" fy="167.62898" gradientTransform="matrix(1,0,0,1.2855485,1.3363476,-35.97338)" gradientUnits="userSpaceOnUse" r="8.3799295" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1523" cx="275.55487" cy="167.62898" fx="275.55487" fy="167.62898" gradientTransform="matrix(1,0,0,1.2855485,1.3363476,-35.97338)" gradientUnits="userSpaceOnUse" r="8.3799295" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-6" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376346,-0.03028719,0.03329679,0.74333763,29.505159,35.511664)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-2" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,32.419792,72.26435)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-8-5" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,16.854219,72.382932)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1179-4" cx="-205.14154" cy="204.22151" fx="-205.14154" fy="204.22151" gradientTransform="matrix(0.24049826,0.00184288,-0.00253978,0.06553777,-53.289135,205.82138)" gradientUnits="userSpaceOnUse" r="35.972752" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1179-2-4" cx="-205.14154" cy="204.22151" fx="-205.14154" fy="204.22151" gradientTransform="matrix(0.24049826,0.00184288,-0.00253978,0.06553777,134.77033,206.04205)" gradientUnits="userSpaceOnUse" r="35.972752" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient944-9" cx="206.20508" cy="236.63559" fx="206.20508" fy="236.63559" gradientTransform="matrix(0.34927491,0.00762032,-0.00158779,0.10958575,-10.099137,121.37887)" gradientUnits="userSpaceOnUse" r="31.923616" xlinkHref="#steal"/>
		<radialGradient id="radialGradient933-9" cx="171.85429" cy="142.51819" fx="171.85429" fy="142.51819" gradientTransform="matrix(0.30314466,0,0,0.31787938,9.3467753,95.343768)" gradientUnits="userSpaceOnUse" r="18.268902" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1044-8-3" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(1.0914026,-0.01402807,0.01116904,0.34840914,25.921477,167.20603)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<radialGradient id="radialGradient1044-5" cx="53.988441" cy="130.89197" fx="53.988441" fy="130.89197" gradientTransform="matrix(0.71486016,0.00342069,-0.00129611,0.1078,47.781548,150.92732)" gradientUnits="userSpaceOnUse" r="31.637804" xlinkHref="#glass"/>
		<linearGradient id="linearGradient1615" gradientTransform="matrix(0.2827419,0,0,0.07953425,78.764707,-89.625731)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1617" gradientTransform="matrix(0.28141895,0,0,0.63724423,35.424441,50.792955)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1619" gradientTransform="matrix(0.28303714,0,0,0.09205816,81.762544,-64.866752)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1621" gradientTransform="matrix(0.28303714,0,0,0.13417638,-1.7623707,97.166177)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1623" gradientTransform="matrix(0.30977804,0,0,0.47971832,43.870807,118.6902)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.94032" x2="169.11494" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1625" gradientTransform="matrix(1.3882216,0,0,0.12127305,-130.06659,149.48052)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1627" gradientTransform="matrix(0.37138012,0,0,0.06079653,78.036743,-75.919933)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1629" gradientTransform="matrix(0.56361435,0,0,0.03983224,47.131339,-77.229967)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1631" gradientTransform="matrix(0.37145112,0,0,0.05033792,80.839653,-65.452911)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1633" gradientTransform="matrix(0.56361435,0,0,0.03983224,49.732061,-59.872838)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1635" gradientTransform="matrix(0.75170943,0,0,0.74244933,-53.526139,80.74127)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="185.11778" x2="231.02084" y1="145.19087" y2="145.1909" xlinkHref="#glass"/>
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
		<linearGradient id="linearGradient1272-8-9-7-9" gradientTransform="matrix(0.28169198,0,0,0.18089251,118.82542,148.39185)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-7-3-5" gradientTransform="matrix(0.28169198,0,0,0.18089251,68.153531,148.16832)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-7-3-9-1" gradientTransform="matrix(0.28085648,0,0,0.54085963,125.04135,-227.54296)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-1-7-0" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,75.699879,2.7320956)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-1-0-3" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.74376345,-0.03028719,0.03329679,0.74333763,75.468385,-47.804911)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-7-9-7" gradientTransform="matrix(0.26924314,0,0,0.18614163,225.15756,159.77475)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-7-3-5-9" gradientTransform="matrix(0.26924314,0,0,0.18614163,192.76118,159.812)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<linearGradient id="linearGradient1272-8-9-7-3-9-1-7" gradientTransform="matrix(0.28933534,0,0,0.35822758,135.6936,-310.55944)" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="161.41066" x2="167.97995" y1="163.76614" y2="163.76614" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-1-7-0-5" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.7653459,-0.0289487,0.03426299,0.71048723,85.24068,-125.00821)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
		<radialGradient id="radialGradient1394-8-1-0-3-9" cx="134.11076" cy="-150.99216" fx="134.11076" fy="-150.99216" gradientTransform="matrix(0.7653459,-0.0289487,0.03426299,0.71048723,84.735199,-157.27566)" gradientUnits="userSpaceOnUse" r="3.9301419" spreadMethod="reflect" xlinkHref="#steal"/>
	</defs>
	<g id="process" transform="translate(0,-95.91665)">
		<g id="LN_3-S" transform="translate(-0.52916667,-1.0583333)">
			<rect height="17.548052" id="rect1081-8-4-3-7-6-9-3-8-8" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-7-9-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01119344","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.6427233" ry="0.13816881" x="267.26425" y="181.48444"/>
			<rect height="17.548052" id="rect1081-8-4-3-7-6-9-3-7-86-5" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-7-3-5-9)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01119344","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.6427238" ry="0.13816881" x="234.86789" y="181.52168"/>
			<rect height="33.771038" id="rect1081-8-4-3-7-6-9-3-7-8-0-3" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-7-3-9-1-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01609718","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.8399367" ry="0.2659044" transform="rotate(90)" x="180.94254" y="-268.77927"/>
			<rect height="3.7176752" id="rect1081-8-4-32-8-19-9-4-3" style={{"opacity":"1","fill":"url(#radialGradient1394-8-1-7-0-5)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00652979","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.2450147" ry="0.029272005" transform="rotate(90)" x="180.58525" y="-238.02754"/>
			<rect height="3.7176752" id="rect1081-8-4-32-8-19-8-6-8" style={{"opacity":"1","fill":"url(#radialGradient1394-8-1-0-3-9)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00652979","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.2450147" ry="0.029272005" transform="rotate(90)" x="180.08035" y="-270.29498"/>
		</g>
		<g id="LN_2-3" transform="matrix(0.95580689,0,0,1.0290179,62.673086,6.0078012)">
			<rect height="17.053204" id="rect1081-8-4-3-7-6-9-3-8" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-7-9)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.0112867","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7649136" ry="0.1342725" x="162.87898" y="169.48933"/>
			<rect height="17.053204" id="rect1081-8-4-3-7-6-9-3-7-86" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-7-3-5)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.0112867","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.764914" ry="0.1342725" x="112.2071" y="169.26579"/>
			<rect height="50.988232" id="rect1081-8-4-3-7-6-9-3-7-8-0" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-7-3-9-1)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.0194874","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7567134" ry="0.40146813" transform="rotate(90)" x="168.96428" y="-164.46236"/>
			<rect height="3.8895674" id="rect1081-8-4-32-8-19-9-4" style={{"opacity":"1","fill":"url(#radialGradient1394-8-1-7-0)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="168.35576" y="-115.51285"/>
			<rect height="3.8895674" id="rect1081-8-4-32-8-19-8-6" style={{"opacity":"1","fill":"url(#radialGradient1394-8-1-0-3)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="168.12485" y="-166.04984"/>
		</g>
		<g id="LN_1-2" transform="matrix(0.95580689,0,0,1.0290179,-5.335199,5.9613171)">
			<rect height="17.053204" id="rect1081-8-4-3-7-6-9-3" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.0112867","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7649136" ry="0.1342725" x="162.87898" y="169.48933"/>
			<rect height="17.053204" id="rect1081-8-4-3-7-6-9-3-7" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-7-3)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.0112867","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.764914" ry="0.1342725" x="112.2071" y="169.26579"/>
			<rect height="50.988232" id="rect1081-8-4-3-7-6-9-3-7-8" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-7-3-9)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.0194874","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7567134" ry="0.40146813" transform="rotate(90)" x="168.96428" y="-164.46236"/>
			<rect height="3.8895674" id="rect1081-8-4-32-8-19-9" style={{"opacity":"1","fill":"url(#radialGradient1394-8-1-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="168.35576" y="-115.51285"/>
			<rect height="3.8895674" id="rect1081-8-4-32-8-19-8" style={{"opacity":"1","fill":"url(#radialGradient1394-8-1-0)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="168.12485" y="-166.04984"/>
		</g>
		<g id="EXPERIMENT_DETAILS">
			<text id="EXPN_TXT" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"3.52777767px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="65.213768" y="105.10046" xmlSpace="preserve">
				<tspan id="EXPN_SPAN" style={{"fontSize":"7.05555534px","strokeWidth":"0.26458332"}} x="65.213768" y="105.10046">Experiment Name</tspan>
			</text>
			<text id="USER_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"3.52777767px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="87.649109" y="117.20321" xmlSpace="preserve">
				<tspan id="USER_NAME_TXT" style={{"fontSize":"7.05555534px","strokeWidth":"0.26458332"}} x="87.649109" y="117.20321">
					<tspan id="tspan2540" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555534px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start"}}>User Name</tspan>
				</tspan>
			</text>
			<text id="STATUS_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"3.52777767px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="140.82669" y="290.30121" xmlSpace="preserve">
				<tspan id="tspan2538-8" style={{"fontSize":"7.05555534px","strokeWidth":"0.26458332"}} x="140.82669" y="290.30121">
					<tspan id="tspan2542-5" style={{"fontStyle":"italic","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"7.05555534px","fontFamily":"sans-serif","InkscapeFontSpecification":"'sans-serif, Italic'","fontVariantLigatures":"normal","fontVariantCaps":"normal","fontVariantNumeric":"normal","fontFeatureSettings":"normal","textAlign":"start","writingMode":"lr-tb","textAnchor":"start","strokeWidth":"0.26458332"}}>Halted</tspan>
				</tspan>
			</text>
			<text id="INFO_USER" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"3.52777767px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="66.184425" y="116.97671" xmlSpace="preserve">
				<tspan id="tspan2538-5" style={{"fontSize":"7.05555534px","strokeWidth":"0.26458332"}} x="66.184425" y="116.97671">User:</tspan>
			</text>
			<text id="STATUS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"3.52777767px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="113.69267" y="289.74673" xmlSpace="preserve">
				<tspan id="tspan2538-8-3" style={{"fontSize":"7.05555534px","strokeWidth":"0.26458332"}} x="113.69267" y="289.74673">Status:</tspan>
			</text>
		</g>
		<g id="SYS_SEP">
			<g id="PROD_LNE" transform="translate(1.0690781)">
				<rect height="24.905706" id="rect1081-8-4-3-7-2-1" style={{"opacity":"1","fill":"url(#linearGradient1272-9-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01370322","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.790616" ry="0.19610104" transform="rotate(90)" x="240.54715" y="-271.71155"/>
			</g>
			<rect height="22.495872" id="rect1081-8-4-3-7-2-1-8" style={{"opacity":"1","fill":"url(#linearGradient1272-9-7-2)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01302341","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7906163" ry="0.17712663" transform="scale(-1)" x="-250.22324" y="-263.34665"/>
			<rect height="9.1371126" id="rect1081-8-4-3-7-2-1-8-2" style={{"opacity":"1","fill":"url(#linearGradient1272-9-7-2-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00830701","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7953329" ry="0.071943238" transform="scale(-1)" x="-274.0126" y="-243.03653"/>
			<rect height="3.8895674" id="rect1081-8-4-32-8-1-9-1-2-91" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8-7-4-0-4)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="239.61253" y="-274.29245"/>
			<rect height="3.8895674" id="rect1081-8-4-32-8-1-9-1-2-6" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8-7-4-0-2)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="240.41434" y="-251.03998"/>
			<g id="SEP_VSL" style={{"opacity":"0.53800001"}} transform="matrix(0.36286688,0,0,0.78056726,241.28319,60.786851)">
				<ellipse id="path1036-2-4-6-4" style={{"opacity":"1","fill":"url(#radialGradient1044-8-5-3-7)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03752039","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.306549" cy="212.05258" rx="22.572357" ry="11.281204"/>
				<rect height="46.036709" id="rect956-0-0-3" style={{"opacity":"1","fill":"url(#linearGradient2548)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="45.204529" ry="0.3312327" x="63.603817" y="165.32137"/>
				<ellipse id="path1036-6-4-7" style={{"opacity":"1","fill":"url(#radialGradient1044-0-2-3)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.206085" cy="165.22214" rx="22.418076" ry="3.4891102"/>
			</g>
			<g id="SEP_PT">
				<text id="PT_1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="268.31824" y="165.77763" xmlSpace="preserve">
					<tspan id="stir_1_value-3-4-4" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="268.31824" y="165.77763">.3</tspan>
				</text>
				<rect height="11.714491" id="rect1081-8-4-3-7-6-5-5" style={{"opacity":"1","fill":"url(#linearGradient2422)","fillOpacity":"1","stroke":"url(#radialGradient1521)","strokeWidth":"0.00935008","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7622337" ry="0.092236854" x="275.40491" y="178.57544"/>
				<ellipse id="path2435" style={{"opacity":"1","fill":"url(#radialGradient2443)","fillOpacity":"1","stroke":"url(#radialGradient1523)","strokeWidth":"5","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="276.8912" cy="177.26256" rx="5.8799295" ry="6.0135641"/>
				<text id="SEP_PRES" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"3.52777767px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="274.75311" y="179.66867" xmlSpace="preserve">
					<tspan id="tspan1456" style={{"fontSize":"7.05555534px","strokeWidth":"0.26458332"}} x="274.75311" y="179.66867">P</tspan>
				</text>
				<text id="SEP_PRES_PV_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="272.6149" y="168.97787" xmlSpace="preserve">
					<tspan id="tspan1492" style={{"strokeWidth":"0.26458332"}} x="272.6149" y="168.97787">bar</tspan>
				</text>
			</g>
		</g>
		<g id="SYS_PROD">
			<g id="PROD_VSL" transform="matrix(1.0075597,0,0,0.7373534,98.072195,69.25834)">
				<ellipse id="path1036-2-4-6-4-0-0-5" style={{"opacity":"0.53800001","fill":"url(#radialGradient1044-8-5-3-7-0-6-5)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01063567","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="148.75914" cy="287.68719" rx="11.536296" ry="1.7736187"/>
				<rect height="26.055563" id="rect956-0-0-3-3-4-8" style={{"opacity":"0.53800001","fill":"url(#linearGradient1882-5)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01984619","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="22.546705" ry="0.18746896" x="137.45117" y="261.97873"/>
				<ellipse id="path1036-6-4-7-3-8-5" style={{"opacity":"0.53800001","fill":"url(#radialGradient1044-0-2-3-7-7-0)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01163725","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="148.40388" cy="246.0014" rx="6.7712774" ry="1.1212076"/>
				<path id="rect956-0-0-3-3-2-7-5" style={{"opacity":"0.53800001","fill":"url(#linearGradient1884-6)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01611063","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} d="m 143.04904,245.73901 11.21622,-0.031 c 2.73094,-0.008 -1.56566,3.85347 -0.89687,5.01255 l 6.77393,11.73991 c 0.0373,0.0647 -0.11668,0.12209 -0.26162,0.12209 h -22.29054 c -0.14493,0 -0.29369,-0.0561 -0.26161,-0.12209 l 5.67914,-11.67648 c 0.52127,-1.07176 -3.21454,-5.03593 0.0413,-5.04494 z"/>
			</g>
			<g id="PROD_BAL">
				<text id="PROD_BAL_PV_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="251.94794" y="291.57907" xmlSpace="preserve">
					<tspan id="tspan1460-6-2" style={{"fontSize":"5.64444447px","strokeWidth":"0.26458332"}} x="251.94794" y="291.57907">g</tspan>
					<tspan id="tspan1464-2-8" style={{"fontSize":"5.64444447px","strokeWidth":"0.26458332"}} x="251.94794" y="298.63461"/>
				</text>
				<path id="rect1654-9-6-8" style={{"opacity":"1","fill":"#646464","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"3.41781354","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 223.4638,287.6781 c 0.0782,0.10393 -0.0671,0.0829 0.2143,0.0824 l 49.99338,-0.0941 c -1.69183,-2.6566 -2.10695,-2.93598 -3.20287,-4.28398 4.49155,-0.0213 -34.53098,0.10146 -43.26008,0.0579 -2.2163,2.197 -2.88766,3.75382 -3.74473,4.23776 z"/>
				<rect height="6.7353549" id="rect1654-0-2" style={{"opacity":"1","fill":"#969696","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"4.50542259","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="50.634575" ry="0.33934706" transform="scale(-1,1)" x="-273.86725" y="287.49759"/>
				<rect height="3.9194057" id="rect1620-4-1" style={{"opacity":"1","fill":"url(#linearGradient1628-6-0)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"2.71475649","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="25.939859" ry="0.25188366" transform="scale(-1,1)" x="-261.38934" y="281.78256"/>
				<text id="PROD_BAL_TXT" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="240.1163" y="287.02225" xmlSpace="preserve">
					<tspan id="stir_1_value-3-4-2-1-9-7" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="240.1163" y="287.02225">200</tspan>
				</text>
				<text id="PROD_BAL_PV_UNITS-3" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="253.28427" y="291.84634" xmlSpace="preserve">
					<tspan id="tspan1460-6-0" style={{"fontSize":"5.64444447px","strokeWidth":"0.26458332"}} x="253.28427" y="291.84634">g</tspan>
					<tspan id="tspan1464-2-1" style={{"fontSize":"5.64444447px","strokeWidth":"0.26458332"}} x="253.28427" y="298.90189"/>
				</text>
			</g>
		</g>
		<g id="SYS_AS">
			<g id="LNE_ANTISOLVENT">
				<rect height="150.23058" id="LNE_0_PIP_2" style={{"opacity":"1","fill":"url(#linearGradient1272-9)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.0335548","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7739856" ry="1.1828766" transform="rotate(90)" x="123.5369" y="-175.825"/>
				<rect height="3.8895674" id="LNE_0_JNT_1" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8-7-4-0)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="122.41415" y="-29.168674"/>
				<rect height="39.101471" id="LNE_0_PIP_1" style={{"opacity":"1","fill":"url(#linearGradient1272-4-6-4)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01710876","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7707517" ry="0.30787483" x="25.838514" y="126.44128"/>
			</g>
			<g id="VSL_ANTISOLVENT" transform="matrix(0.59063705,0,0,0.38967741,-60.708108,61.518453)">
				<ellipse id="VSL_BASE" style={{"opacity":"0.53800001","fill":"url(#radialGradient1044-8-5-3-7-0-6)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01063567","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="148.75914" cy="287.68719" rx="11.536296" ry="1.7736187"/>
				<rect height="26.055563" id="VSL_MIDDLE" style={{"opacity":"0.53800001","fill":"url(#linearGradient1882)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01984619","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="22.546705" ry="0.18746896" x="137.45117" y="261.97873"/>
				<ellipse id="VSL_TOP" style={{"opacity":"0.53800001","fill":"url(#radialGradient1044-0-2-3-7-7)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01163725","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="148.40388" cy="246.0014" rx="6.7712774" ry="1.1212076"/>
				<path id="VSL_NECK" style={{"opacity":"0.53800001","fill":"url(#linearGradient1884)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01611063","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} d="m 143.04904,245.73901 11.21622,-0.031 c 2.73094,-0.008 -1.56566,3.85347 -0.89687,5.01255 l 6.77393,11.73991 c 0.0373,0.0647 -0.11668,0.12209 -0.26162,0.12209 h -22.29054 c -0.14493,0 -0.29369,-0.0561 -0.26161,-0.12209 l 5.67914,-11.67648 c 0.52127,-1.07176 -3.21454,-5.03593 0.0413,-5.04494 z"/>
			</g>
			<g id="AS_BAL">
				<path id="BAL_TOP" style={{"opacity":"1","fill":"#646464","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"3.02599072","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 8.2809645,179.83417 c 0.061313,0.10393 -0.052624,0.0829 0.1679817,0.0824 l 39.1878058,-0.0941 c -1.326154,-2.6566 -1.651552,-2.93598 -2.510595,-4.28398 3.520742,-0.0213 -27.067457,0.10146 -33.909846,0.0579 -1.7372721,2.197 -2.2635253,3.75382 -2.9353465,4.23776 z"/>
				<rect height="6.7353549" id="BAL_BASE" style={{"opacity":"1","fill":"#969696","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"3.98891473","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="39.690414" ry="0.33934706" transform="scale(-1,1)" x="-47.790211" y="179.65367"/>
				<rect height="3.9194057" id="BAL_HEAD" style={{"opacity":"1","fill":"url(#linearGradient1628-6)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"2.40353322","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="20.333218" ry="0.25188366" transform="scale(-1,1)" x="-38.009281" y="173.93863"/>
				<text id="AS_BAL_PV_TXT" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="19.510675" y="184.74678" xmlSpace="preserve">
					<tspan id="tspan1100" style={{"strokeWidth":"0.26458332"}} x="19.510675" y="184.74678">300</tspan>
				</text>
				<text id="AS_BAL_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.06820965px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.23757231"}} transform="scale(0.89791118,1.1136959)" x="37.274326" y="165.16624" xmlSpace="preserve">
					<tspan id="tspan1108" style={{"strokeWidth":"0.23757231"}} x="37.274326" y="165.16624">g</tspan>
				</text>
			</g>
		</g>
		<g id="SYS_FEED">
			<g id="BOX">
				<rect height="36.55027" id="BOX_BACK" style={{"opacity":"0.5","fill":"url(#radialGradient1364)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"6.98173237","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="50.108997" ry="0.5839923" x="7.9552302" y="237.29741"/>
				<path id="BOX_TOP" style={{"opacity":"0.5","fill":"url(#radialGradient1364-7)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"6.98173285","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 8.1283092,237.96557 49.9359208,-0.66816 6.057902,7.01696 -62.5709739,0.53454 z"/>
				<path id="BOX_BOTTOM" style={{"opacity":"0.5","fill":"url(#radialGradient1364-7-6)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"6.98173332","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 8.4104917,273.4259 48.8974273,0.13365 7.442564,16.63867 -62.5709721,1e-5 z"/>
				<path id="BOX_LEFT" style={{"opacity":"0.5","fill":"url(#radialGradient1364-7-6-2)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"6.98173332","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 2.0922045,244.65141 7.011366,-6.81536 -0.8654108,36.68388 -5.1074548,15.23438 z"/>
				<path id="BOX_RIGHT" style={{"opacity":"0.5","fill":"url(#radialGradient1364-7-6-2-2)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"6.98173332","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 64.122132,244.31437 -5.796767,-6.81536 -0.865411,36.95115 5.96985,15.23438 z"/>
			</g>
			<g id="FEED_BAL" transform="matrix(-0.81209421,0,0,0.69207958,124.82122,93.555264)">
				<path id="FEED_BAL_TOP" style={{"opacity":"1","fill":"#646464","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"4.03632736","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 144.42489,266.4696 c -0.0755,0.15017 0.0648,0.11981 -0.20685,0.11904 l -48.255247,-0.13595 c 1.633005,-3.83858 2.033695,-4.24226 3.091508,-6.19002 -4.335387,-0.0308 33.330439,0.14661 41.756049,0.0837 2.13925,3.17448 2.78727,5.42397 3.61454,6.12322 z"/>
				<rect height="9.7320528" id="FEED_BAL_BASE" style={{"opacity":"1","fill":"#969696","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"5.32075834","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="48.874153" ry="0.49032953" x="95.773827" y="266.2088"/>
				<rect height="5.6632299" id="FEED_BAL_HEAD" style={{"opacity":"1","fill":"url(#linearGradient1628)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"3.20603967","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} width="25.038004" ry="0.36395186" x="107.81791" y="257.95102"/>
			</g>
			<g id="VSL_FEED" transform="matrix(0.59063704,0,0,0.38967742,-61.454419,159.65775)">
				<ellipse id="path1036-2-4-6-4-0" style={{"opacity":"0.53800001","fill":"url(#radialGradient1044-8-5-3-7-0)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01063567","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="148.75914" cy="287.68719" rx="11.536296" ry="1.7736187"/>
				<rect height="26.055563" id="rect956-0-0-3-3" style={{"opacity":"0.53800001","fill":"url(#linearGradient1755)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01984619","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="22.546705" ry="0.18746896" x="137.45117" y="261.97873"/>
				<ellipse id="path1036-6-4-7-3" style={{"opacity":"0.53800001","fill":"url(#radialGradient1044-0-2-3-7)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01163725","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="148.40388" cy="246.0014" rx="6.7712774" ry="1.1212076"/>
				<path id="rect956-0-0-3-3-2" style={{"opacity":"0.53800001","fill":"url(#linearGradient1755-3)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.01611063","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} d="m 143.04904,245.73901 11.21622,-0.031 c 2.73094,-0.008 -1.56566,3.85347 -0.89687,5.01255 l 6.77393,11.73991 c 0.0373,0.0647 -0.11668,0.12209 -0.26162,0.12209 h -22.29054 c -0.14493,0 -0.29369,-0.0561 -0.26161,-0.12209 l 5.67914,-11.67648 c 0.52127,-1.07176 -3.21454,-5.03593 0.0413,-5.04494 z"/>
			</g>
			<g id="SYS_FEED_LN">
				<rect height="8.6812878" id="AS_PIP_1" style={{"opacity":"1","fill":"url(#linearGradient1272-4-6-4-1-2)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00806147","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7707517" ry="0.068354197" transform="rotate(90)" x="247.89513" y="-67.519363"/>
				<rect height="69.168129" id="AS_PIP_2" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.0227199","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7622337" ry="0.54461187" x="65.520668" y="180.85654"/>
				<rect height="3.8895674" id="AS_PIP_3" style={{"opacity":"1","fill":"url(#radialGradient1394-93)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="247.09541" y="-68.762169"/>
				<rect height="20.808395" id="AS_PIP_4" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-8)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01247917","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.770041" ry="0.16383989" transform="rotate(90)" x="180.55476" y="-86.446503"/>
				<rect height="16.266256" id="AS_PIP_5" style={{"opacity":"1","fill":"url(#linearGradient1272-8-9-8-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01103629","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7714839" ry="0.12807627" x="84.407776" y="180.48839"/>
				<rect height="3.8895674" id="AS_PIP_6" style={{"opacity":"1","fill":"url(#radialGradient1394-93-3)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="180.27803" y="-87.471039"/>
				<rect height="3.8895674" id="AS_PIP_7" style={{"opacity":"1","fill":"url(#radialGradient1394-93-2)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="180.27803" y="-68.762169"/>
				<rect height="12.649153" id="rect1081-8-4-3-7-4-7-30" style={{"opacity":"1","fill":"url(#linearGradient1272-4-6-9)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00974382","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781167" ry="0.099596143" x="24.605921" y="251.51965"/>
				<rect height="11.089335" id="rect1081-8-4-3-7-4-7-3-9" style={{"opacity":"1","fill":"url(#linearGradient1272-4-6-4-1)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00911119","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7707517" ry="0.087314539" transform="rotate(90)" x="250.44635" y="-38.521034"/>
				<rect height="3.8895674" id="rect1081-8-4-32-8-1-9-1-2-9" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8-7-4-0-1)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="249.63438" y="-27.939762"/>
			</g>
			<text id="SYS_FEED_BAL" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="17.951832" y="277.48743" xmlSpace="preserve">
				<tspan id="BAL_FEED_PV_TXT" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="17.951832" y="277.48743">400</tspan>
			</text>
			<text id="FEED_BAL_PV_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="32.51965" y="281.95737" xmlSpace="preserve">
				<tspan id="tspan1460-6" style={{"fontSize":"5.64444447px","strokeWidth":"0.26458332"}} x="32.51965" y="281.95737">g</tspan>
				<tspan id="tspan1464-2" style={{"fontSize":"5.64444447px","strokeWidth":"0.26458332"}} x="32.51965" y="289.01291"/>
			</text>
			<g id="PMP_FEED">
				<rect height="5.7314448" id="rect1081-8-4-83" style={{"opacity":"1","fill":"url(#linearGradient1612)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00751309","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6452367" ry="0.045127906" transform="rotate(90)" x="247.1682" y="-55.551716"/>
				<path id="rect935-8" style={{"opacity":"1","fill":"url(#radialGradient944-8)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"1.46906936","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} d="m 41.299061,258.90634 5.272647,-6.53232 c 1.075497,-1.33245 2.465942,-1.58903 3.737011,0.0324 l 5.10532,6.96157 c 1.551803,2.14521 -3.94149,1.09921 -7.144182,1.29726 -2.488394,-0.28154 -9.174428,1.07264 -6.970796,-1.75889 z"/>
				<ellipse id="path925-3" style={{"opacity":"1","fill":"url(#radialGradient933-8)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"1.57534111","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="48.165943" cy="251.69887" rx="4.7802582" ry="4.9886556"/>
				<rect height="3.7550869" id="rect1081-8-4-8-33" style={{"opacity":"1","fill":"url(#linearGradient1614)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00749166","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="246.32622" y="-59.306801"/>
				<rect height="4.7454853" id="rect1081-8-4-3-8" style={{"opacity":"1","fill":"url(#linearGradient1616)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00683704","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6459339" ry="0.037364718" transform="rotate(90)" x="249.98224" y="-46.304474"/>
				<rect height="3.7550869" id="rect1081-8-4-8-3-0" style={{"opacity":"1","fill":"url(#linearGradient1618)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00749166","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="248.92694" y="-41.949669"/>
				<text id="PMP_FEED_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="38.235855" y="261.49142" xmlSpace="preserve">
					<tspan id="PMP_FEED_PV_TXT" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="38.235855" y="261.49142">5.2</tspan>
				</text>
				<text id="text1230" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="47.306705" y="266.26401" xmlSpace="preserve">
					<tspan id="tspan1228" style={{"strokeWidth":"0.26458332"}} x="47.306705" y="266.26401">ml/min</tspan>
				</text>
			</g>
			<g id="TEMP_FEED">
				<rect height="11.714491" id="rect1081-8-4-3-7-6-5-5-6" style={{"opacity":"1","fill":"url(#linearGradient2514)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00935008","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7622337" ry="0.092236854" x="15.759933" y="230.48212"/>
				<ellipse id="path2435-0" style={{"opacity":"1","fill":"url(#radialGradient2443-8)","fillOpacity":"1","stroke":"#6d5232","strokeWidth":"5","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="17.246231" cy="229.16924" rx="5.8799295" ry="6.0135641"/>
				<text id="TEMP_1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="7.7690563" y="216.18103" xmlSpace="preserve">
					<tspan id="stir_1_value-3-4-4-0" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="7.7690563" y="216.18103">60</tspan>
				</text>
				<text id="FEED_TEMP" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"3.52777767px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="14.967094" y="231.78621" xmlSpace="preserve">
					<tspan id="tspan1452" style={{"fontSize":"7.05555534px","strokeWidth":"0.26458332"}} x="14.967094" y="231.78621">T</tspan>
				</text>
				<text id="FEED_TEMP_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="17.105249" y="220.02635" xmlSpace="preserve">
					<tspan id="tspan1466" style={{"strokeWidth":"0.26458332"}} x="17.105249" y="220.02635">C</tspan>
				</text>
			</g>
		</g>
		<g id="SYS_1">
			<g id="SYS_1_LNE" transform="translate(-1.3363476,13.229169)">
				<rect height="7.4978986" id="LNE_1_PIP_3" style={{"opacity":"1","fill":"url(#linearGradient1272)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00749793","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7752192" ry="0.059036504" transform="rotate(90)" x="122.98256" y="-80.349632"/>
				<rect height="60.074654" id="LNE_1_PIP_4" style={{"opacity":"1","fill":"url(#linearGradient1272-8)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.02117381","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7622337" ry="0.47301227" x="79.435432" y="125.11451"/>
				<rect height="3.8895671" id="LNE_1_JNT_3" style={{"opacity":"1","fill":"url(#radialGradient1394)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="122.16164" y="-82.73333"/>
				<rect height="8.6785603" id="LNE_1_PIP_2" style={{"opacity":"1","fill":"url(#linearGradient1272-4)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00807091","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781169" ry="0.068332724" transform="rotate(90)" x="126.02658" y="-54.130058"/>
				<rect height="12.649153" id="LNE_1_PIP_1" style={{"opacity":"1","fill":"url(#linearGradient1272-4-6)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00974382","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781167" ry="0.099596143" x="42.50169" y="112.81506"/>
				<rect height="3.8895674" id="LNE_1_JNT_2" style={{"opacity":"1","fill":"url(#radialGradient1394-8)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="125.07626" y="-45.980667"/>
				<rect height="3.8895674" id="LNE_1_JNT_1" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="109.5107" y="-45.862087"/>
			</g>
			<g id="SYS_1_STR">
				<rect height="45.22427" id="STR_1_SHAFT" style={{"opacity":"1","fill":"url(#linearGradient1111)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01927474","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.0405886" ry="0.35608414" x="92.316826" y="174.63969"/>
				<ellipse id="STR_1_IMPELLOR_1" style={{"opacity":"1","fill":"url(#radialGradient1179)","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.02426012","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="-99.941978" cy="218.82756" rx="7.8176227" ry="1.7806129" transform="scale(-1,1)"/>
				<ellipse id="STR_1_IMPELLOR_2" style={{"opacity":"1","fill":"url(#radialGradient1179-2)","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.02426012","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="88.117485" cy="219.04822" rx="7.8176227" ry="1.7806129"/>
				<rect height="11.43272" id="STR_1_HEAD" style={{"opacity":"1","fill":"url(#linearGradient1271)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.02051547","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="13.625921" ry="0.090018265" x="87.03669" y="163.62456"/>
				<text id="STR_1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254733","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="87.514259" y="158.40654" xmlSpace="preserve">
					<tspan id="STR_1_PV_TXT" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254733","strokeOpacity":"0"}} x="87.514259" y="158.40654">100</tspan>
				</text>
				<text id="STR_1_PV_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="98.784508" y="161.14355" xmlSpace="preserve">
					<tspan id="tspan1466-1" style={{"strokeWidth":"0.26458332"}} x="98.784508" y="161.14355">RPM</tspan>
				</text>
			</g>
			<g id="SYS_1_PMP">
				<text id="PMP_1_PV" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="46.685932" y="152.91785" xmlSpace="preserve">
					<tspan id="PMP_1_PV_TXT" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="46.685932" y="152.91785">3.0</tspan>
				</text>
				<rect height="5.7314448" id="PMP_1_PIP_EXIT" style={{"opacity":"1","fill":"url(#linearGradient1018)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6452367" ry="0.045127906" transform="rotate(90)" x="136.1167" y="-68.829254"/>
				<path id="PMP_1_BASE" style={{"opacity":"1","fill":"url(#radialGradient944)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 54.576604,147.85483 5.272647,-6.53233 c 1.075497,-1.33245 2.465942,-1.58902 3.737011,0.0324 l 5.10532,6.96156 c 1.551803,2.14522 -3.94149,1.09922 -7.144182,1.29727 -2.488394,-0.28155 -9.174428,1.07264 -6.970796,-1.75889 z"/>
				<ellipse id="PMP_1_BODY" style={{"opacity":"1","fill":"url(#radialGradient933)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="61.443485" cy="140.64735" rx="4.7802582" ry="4.9886556"/>
				<rect height="3.7550869" id="PMP_1_CLMP_EXIT" style={{"opacity":"1","fill":"url(#linearGradient1093)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="135.27472" y="-72.584343"/>
				<rect height="4.7454853" id="PMP_1_PIP_INLET" style={{"opacity":"1","fill":"url(#linearGradient1018-8)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6459339" ry="0.037364718" transform="rotate(90)" x="138.93073" y="-59.582016"/>
				<rect height="3.7550869" id="PMP_1_CLMP_INLET" style={{"opacity":"1","fill":"url(#linearGradient1093-8)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="137.87543" y="-55.227211"/>
				<text id="PMP_1_PV_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="57.462952" y="155.61441" xmlSpace="preserve">
					<tspan id="tspan1488" style={{"strokeWidth":"0.26458332"}} x="57.462952" y="155.61441">ml/min</tspan>
				</text>
			</g>
			<g id="SYS_1_VSL">
				<g id="VSL_BODY_1" style={{"opacity":"0.53800001"}} transform="matrix(0.82308662,0,0,0.78040362,23.488899,61.965513)">
					<ellipse id="VSL_1_BOTTOM" style={{"opacity":"1","fill":"url(#radialGradient1044-8)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03752039","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.306549" cy="212.05258" rx="22.572357" ry="11.281204"/>
					<rect height="46.036709" id="VSL_1_MIDDLE" style={{"opacity":"1","fill":"url(#linearGradient972)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="45.204529" ry="0.3312327" x="63.603817" y="165.32137"/>
					<ellipse id="VSL_1_TOP" style={{"opacity":"1","fill":"url(#radialGradient1044)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.206085" cy="165.22214" rx="22.418076" ry="3.4891102"/>
				</g>
				<text id="VSL_1_TJ" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.58113575px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254734","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="110.11425" y="209.32542" xmlSpace="preserve">
					<tspan id="VSL_1_TJ_TXT" style={{"fontSize":"5.58113575px","stroke":"#323232","strokeWidth":"0.23254734","strokeOpacity":"0"}} x="110.11425" y="209.32542">70</tspan>
				</text>
				<text id="VSL_1_CONC" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"6.3499999px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="80.661682" y="228.88766" xmlSpace="preserve">
					<tspan id="tspan1331" style={{"fontSize":"5.64444447px","strokeWidth":"0.26458332"}} x="80.661682" y="228.88766">12.2</tspan>
				</text>
				<text id="VSL_1_TR" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.58113575px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254736","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="97.442459" y="200.40436" xmlSpace="preserve">
					<tspan id="VSL_1_TR_TXT" style={{"fontSize":"5.58113575px","stroke":"#323232","strokeWidth":"0.23254736","strokeOpacity":"0"}} x="97.442459" y="200.40436">50</tspan>
				</text>
				<text id="CONC_1_PV_UNITS" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="96.217026" y="228.57898" xmlSpace="preserve">
					<tspan id="tspan1496" style={{"strokeWidth":"0.26458332"}} x="96.217026" y="228.57898">mg/L</tspan>
				</text>
				<text id="VSL_1_TR_UNITS-2" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="103.34956" y="204.16319" xmlSpace="preserve">
					<tspan id="tspan1466-5" style={{"strokeWidth":"0.26458332"}} x="103.34956" y="204.16319">C</tspan>
				</text>
				<text id="VSL_1_TR_UNITS-2-0" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="115.86287" y="213.24498" xmlSpace="preserve">
					<tspan id="tspan1466-5-9" style={{"strokeWidth":"0.26458332"}} x="115.86287" y="213.24498">C</tspan>
				</text>
			</g>
		</g>
		<g id="SYS_2" transform="translate(66.382078,0.16504916)">
			<g id="SYS_2_LNE" transform="translate(-1.3363476,13.229169)">
				<rect height="7.4978986" id="LNE_1_PIP_3-9" style={{"opacity":"1","fill":"url(#linearGradient1615)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00749793","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7752192" ry="0.059036504" transform="rotate(90)" x="122.98256" y="-80.349632"/>
				<rect height="60.074654" id="LNE_1_PIP_4-4" style={{"opacity":"1","fill":"url(#linearGradient1617)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.02117381","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7622337" ry="0.47301227" x="79.435432" y="125.11451"/>
				<rect height="3.8895671" id="LNE_1_JNT_3-3" style={{"opacity":"1","fill":"url(#radialGradient1394-6)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="122.16164" y="-82.73333"/>
				<rect height="8.6785603" id="LNE_1_PIP_2-5" style={{"opacity":"1","fill":"url(#linearGradient1619)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00807091","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781169" ry="0.068332724" transform="rotate(90)" x="126.02658" y="-54.130058"/>
				<rect height="12.649153" id="LNE_1_PIP_1-1" style={{"opacity":"1","fill":"url(#linearGradient1621)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00974382","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781167" ry="0.099596143" x="42.50169" y="112.81506"/>
				<rect height="3.8895674" id="LNE_1_JNT_2-7" style={{"opacity":"1","fill":"url(#radialGradient1394-8-2)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="125.07626" y="-45.980667"/>
				<rect height="3.8895674" id="LNE_1_JNT_1-4" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8-5)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="109.5107" y="-45.862087"/>
			</g>
			<g id="SYS_2_STR">
				<rect height="45.22427" id="STR_1_SHAFT-1" style={{"opacity":"1","fill":"url(#linearGradient1623)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01927474","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.0405886" ry="0.35608414" x="92.316826" y="174.63969"/>
				<ellipse id="STR_1_IMPELLOR_1-4" style={{"opacity":"1","fill":"url(#radialGradient1179-4)","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.02426012","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="-99.941978" cy="218.82756" rx="7.8176227" ry="1.7806129" transform="scale(-1,1)"/>
				<ellipse id="STR_1_IMPELLOR_2-6" style={{"opacity":"1","fill":"url(#radialGradient1179-2-4)","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.02426012","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="88.117485" cy="219.04822" rx="7.8176227" ry="1.7806129"/>
				<rect height="11.43272" id="STR_1_HEAD-9" style={{"opacity":"1","fill":"url(#linearGradient1625)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.02051547","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="13.625921" ry="0.090018265" x="87.03669" y="163.62456"/>
				<text id="STR_1_PV-4" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254733","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="87.514259" y="158.40654" xmlSpace="preserve">
					<tspan id="STR_1_PV_TXT-2" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254733","strokeOpacity":"0"}} x="87.514259" y="158.40654">100</tspan>
				</text>
				<text id="STR_1_PV_UNITS-2" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="98.784508" y="161.14355" xmlSpace="preserve">
					<tspan id="tspan1466-1-6" style={{"strokeWidth":"0.26458332"}} x="98.784508" y="161.14355">RPM</tspan>
				</text>
			</g>
			<g id="SYS_2_PMP">
				<text id="PMP_1_PV-1" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="46.685932" y="152.91785" xmlSpace="preserve">
					<tspan id="PMP_1_PV_TXT-2" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="46.685932" y="152.91785">3.0</tspan>
				</text>
				<rect height="5.7314448" id="PMP_1_PIP_EXIT-8" style={{"opacity":"1","fill":"url(#linearGradient1627)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6452367" ry="0.045127906" transform="rotate(90)" x="136.1167" y="-68.829254"/>
				<path id="PMP_1_BASE-8" style={{"opacity":"1","fill":"url(#radialGradient944-9)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 54.576604,147.85483 5.272647,-6.53233 c 1.075497,-1.33245 2.465942,-1.58902 3.737011,0.0324 l 5.10532,6.96156 c 1.551803,2.14522 -3.94149,1.09922 -7.144182,1.29727 -2.488394,-0.28155 -9.174428,1.07264 -6.970796,-1.75889 z"/>
				<ellipse id="PMP_2_BODY-9" style={{"opacity":"1","fill":"url(#radialGradient933-9)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="61.443485" cy="140.64735" rx="4.7802582" ry="4.9886556"/>
				<rect height="3.7550869" id="PMP_1_CLMP_EXIT-2" style={{"opacity":"1","fill":"url(#linearGradient1629)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="135.27472" y="-72.584343"/>
				<rect height="4.7454853" id="PMP_1_PIP_INLET-8" style={{"opacity":"1","fill":"url(#linearGradient1631)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6459339" ry="0.037364718" transform="rotate(90)" x="138.93073" y="-59.582016"/>
				<rect height="3.7550869" id="PMP_1_CLMP_INLET-8" style={{"opacity":"1","fill":"url(#linearGradient1633)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="137.87543" y="-55.227211"/>
				<text id="PMP_1_PV_UNITS-8" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="57.462952" y="155.61441" xmlSpace="preserve">
					<tspan id="tspan1488-6" style={{"strokeWidth":"0.26458332"}} x="57.462952" y="155.61441">ml/min</tspan>
				</text>
			</g>
			<g id="SYS_2_VSL">
				<g id="VSL_BODY_1-3" style={{"opacity":"0.53800001"}} transform="matrix(0.82308662,0,0,0.78040362,23.488899,61.965513)">
					<ellipse id="VSL_1_BOTTOM-8" style={{"opacity":"1","fill":"url(#radialGradient1044-8-3)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03752039","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.306549" cy="212.05258" rx="22.572357" ry="11.281204"/>
					<rect height="46.036709" id="VSL_1_MIDDLE-3" style={{"opacity":"1","fill":"url(#linearGradient1635)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="45.204529" ry="0.3312327" x="63.603817" y="165.32137"/>
					<ellipse id="VSL_1_TOP-3" style={{"opacity":"1","fill":"url(#radialGradient1044-5)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.206085" cy="165.22214" rx="22.418076" ry="3.4891102"/>
				</g>
				<text id="VSL_1_TJ-3" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.58113575px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254734","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="110.11425" y="209.32542" xmlSpace="preserve">
					<tspan id="VSL_1_TJ_TXT-8" style={{"fontSize":"5.58113575px","stroke":"#323232","strokeWidth":"0.23254734","strokeOpacity":"0"}} x="110.11425" y="209.32542">70</tspan>
				</text>
				<text id="VSL_1_CONC-0" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"6.3499999px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="80.661682" y="228.88766" xmlSpace="preserve">
					<tspan id="tspan1331-4" style={{"fontSize":"5.64444447px","strokeWidth":"0.26458332"}} x="80.661682" y="228.88766">12.2</tspan>
				</text>
				<text id="VSL_1_TR-7" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.58113575px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254736","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="97.442459" y="200.40436" xmlSpace="preserve">
					<tspan id="VSL_1_TR_TXT-6" style={{"fontSize":"5.58113575px","stroke":"#323232","strokeWidth":"0.23254736","strokeOpacity":"0"}} x="97.442459" y="200.40436">50</tspan>
				</text>
				<text id="CONC_1_PV_UNITS-8" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="96.217026" y="228.57898" xmlSpace="preserve">
					<tspan id="tspan1496-9" style={{"strokeWidth":"0.26458332"}} x="96.217026" y="228.57898">mg/L</tspan>
				</text>
				<text id="VSL_1_TR_UNITS-2-06" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="103.34956" y="204.16319" xmlSpace="preserve">
					<tspan id="tspan1466-5-8" style={{"strokeWidth":"0.26458332"}} x="103.34956" y="204.16319">C</tspan>
				</text>
				<text id="VSL_1_TR_UNITS-2-0-7" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="115.86287" y="213.24498" xmlSpace="preserve">
					<tspan id="tspan1466-5-9-9" style={{"strokeWidth":"0.26458332"}} x="115.86287" y="213.24498">C</tspan>
				</text>
			</g>
		</g>
		<g id="SYS_3" transform="translate(131.61196,-0.1022197)">
			<g id="SYS_3_LNE" transform="translate(-1.3363476,13.229169)">
				<rect height="7.4978986" id="LNE_1_PIP_3-9-0" style={{"opacity":"1","fill":"url(#linearGradient2010)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00749793","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7752192" ry="0.059036504" transform="rotate(90)" x="122.98256" y="-80.349632"/>
				<rect height="60.074654" id="LNE_1_PIP_4-4-4" style={{"opacity":"1","fill":"url(#linearGradient2012)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.02117381","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7622337" ry="0.47301227" x="79.435432" y="125.11451"/>
				<rect height="3.8895671" id="LNE_1_JNT_3-3-1" style={{"opacity":"1","fill":"url(#radialGradient1394-6-3)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="122.16164" y="-82.73333"/>
				<rect height="8.6785603" id="LNE_1_PIP_2-5-0" style={{"opacity":"1","fill":"url(#linearGradient2014)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00807091","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781169" ry="0.068332724" transform="rotate(90)" x="126.02658" y="-54.130058"/>
				<rect height="12.649153" id="LNE_1_PIP_1-1-4" style={{"opacity":"1","fill":"url(#linearGradient2016)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00974382","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="2.7781167" ry="0.099596143" x="42.50169" y="112.81506"/>
				<rect height="3.8895674" id="LNE_1_JNT_2-7-8" style={{"opacity":"1","fill":"url(#radialGradient1394-8-2-3)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="125.07626" y="-45.980667"/>
				<rect height="3.8895674" id="LNE_1_JNT_1-4-7" style={{"opacity":"1","fill":"url(#radialGradient1394-8-8-5-7)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.00658419","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="4.1253071" ry="0.030625438" transform="rotate(90)" x="109.5107" y="-45.862087"/>
			</g>
			<g id="SYS_3_STR">
				<rect height="45.22427" id="STR_1_SHAFT-1-8" style={{"opacity":"1","fill":"url(#linearGradient2018)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.01927474","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.0405886" ry="0.35608414" x="92.316826" y="174.63969"/>
				<ellipse id="STR_1_IMPELLOR_1-4-6" style={{"opacity":"1","fill":"url(#radialGradient1179-4-3)","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.02426012","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="-99.941978" cy="218.82756" rx="7.8176227" ry="1.7806129" transform="scale(-1,1)"/>
				<ellipse id="STR_1_IMPELLOR_2-6-2" style={{"opacity":"1","fill":"url(#radialGradient1179-2-4-2)","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.02426012","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0"}} cx="88.117485" cy="219.04822" rx="7.8176227" ry="1.7806129"/>
				<rect height="11.43272" id="STR_1_HEAD-9-4" style={{"opacity":"1","fill":"url(#linearGradient2020)","fillOpacity":"1","stroke":"#646464","strokeWidth":"0.02051547","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="13.625921" ry="0.090018265" x="87.03669" y="163.62456"/>
				<text id="STR_1_PV-4-7" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254733","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="87.514259" y="158.40654" xmlSpace="preserve">
					<tspan id="STR_1_PV_TXT-2-9" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254733","strokeOpacity":"0"}} x="87.514259" y="158.40654">100</tspan>
				</text>
				<text id="STR_1_PV_UNITS-2-3" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="98.784508" y="161.14355" xmlSpace="preserve">
					<tspan id="tspan1466-1-6-9" style={{"strokeWidth":"0.26458332"}} x="98.784508" y="161.14355">RPM</tspan>
				</text>
			</g>
			<g id="SYS_3_PMP">
				<text id="PMP_1_PV-1-8" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="46.685932" y="152.91785" xmlSpace="preserve">
					<tspan id="PMP_1_PV_TXT-2-3" style={{"fontSize":"5.64444447px","stroke":"#323232","strokeWidth":"0.23254737","strokeOpacity":"0"}} x="46.685932" y="152.91785">3.0</tspan>
				</text>
				<rect height="5.7314448" id="PMP_1_PIP_EXIT-8-0" style={{"opacity":"1","fill":"url(#linearGradient2022)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6452367" ry="0.045127906" transform="rotate(90)" x="136.1167" y="-68.829254"/>
				<path id="PMP_1_BASE-8-1" style={{"opacity":"1","fill":"url(#radialGradient944-9-6)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} d="m 54.576604,147.85483 5.272647,-6.53233 c 1.075497,-1.33245 2.465942,-1.58902 3.737011,0.0324 l 5.10532,6.96156 c 1.551803,2.14522 -3.94149,1.09922 -7.144182,1.29727 -2.488394,-0.28155 -9.174428,1.07264 -6.970796,-1.75889 z"/>
				<ellipse id="PMP_3_BODY" style={{"opacity":"1","fill":"url(#radialGradient933-9-5)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="61.443485" cy="140.64735" rx="4.7802582" ry="4.9886556"/>
				<rect height="3.7550869" id="PMP_1_CLMP_EXIT-2-8" style={{"opacity":"1","fill":"url(#linearGradient2024)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="135.27472" y="-72.584343"/>
				<rect height="4.7454853" id="PMP_1_PIP_INLET-8-9" style={{"opacity":"1","fill":"url(#linearGradient2026)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="3.6459339" ry="0.037364718" transform="rotate(90)" x="138.93073" y="-59.582016"/>
				<rect height="3.7550869" id="PMP_1_CLMP_INLET-8-1" style={{"opacity":"1","fill":"url(#linearGradient2028)","fillOpacity":"1","stroke":"#010001","strokeWidth":"0.09999999","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} width="5.5320892" ry="0.02956658" transform="rotate(90)" x="137.87543" y="-55.227211"/>
				<text id="PMP_1_PV_UNITS-8-5" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="57.462952" y="155.61441" xmlSpace="preserve">
					<tspan id="tspan1488-6-4" style={{"strokeWidth":"0.26458332"}} x="57.462952" y="155.61441">ml/min</tspan>
				</text>
			</g>
			<g id="SYS_3_VSL">
				<g id="VSL_BODY_1-3-2" style={{"opacity":"0.53800001"}} transform="matrix(0.82308662,0,0,0.78040362,23.488899,61.965513)">
					<ellipse id="VSL_1_BOTTOM-8-5" style={{"opacity":"1","fill":"url(#radialGradient1044-8-3-2)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03752039","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.306549" cy="212.05258" rx="22.572357" ry="11.281204"/>
					<rect height="46.036709" id="VSL_1_MIDDLE-3-7" style={{"opacity":"1","fill":"url(#linearGradient2030)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"0.99567099"}} width="45.204529" ry="0.3312327" x="63.603817" y="165.32137"/>
					<ellipse id="VSL_1_TOP-3-4" style={{"opacity":"1","fill":"url(#radialGradient1044-5-7)","fillOpacity":"1","stroke":"#3264c8","strokeWidth":"0.03735325","strokeMiterlimit":"4","strokeDasharray":"none","strokeOpacity":"1"}} cx="86.206085" cy="165.22214" rx="22.418076" ry="3.4891102"/>
				</g>
				<text id="VSL_1_TJ-3-9" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.58113575px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254734","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="110.11425" y="209.32542" xmlSpace="preserve">
					<tspan id="VSL_1_TJ_TXT-8-9" style={{"fontSize":"5.58113575px","stroke":"#323232","strokeWidth":"0.23254734","strokeOpacity":"0"}} x="110.11425" y="209.32542">70</tspan>
				</text>
				<text id="VSL_1_CONC-0-4" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"6.3499999px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="80.661682" y="228.88766" xmlSpace="preserve">
					<tspan id="tspan1331-4-5" style={{"fontSize":"5.64444447px","strokeWidth":"0.26458332"}} x="80.661682" y="228.88766">12.2</tspan>
				</text>
				<text id="VSL_1_TR-7-9" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.58113575px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"#323232","strokeWidth":"0.23254736","strokeOpacity":"0"}} transform="scale(0.98114283,1.0192196)" x="97.442459" y="200.40436" xmlSpace="preserve">
					<tspan id="VSL_1_TR_TXT-6-3" style={{"fontSize":"5.58113575px","stroke":"#323232","strokeWidth":"0.23254736","strokeOpacity":"0"}} x="97.442459" y="200.40436">50</tspan>
				</text>
				<text id="CONC_1_PV_UNITS-8-5" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="96.217026" y="228.57898" xmlSpace="preserve">
					<tspan id="tspan1496-9-7" style={{"strokeWidth":"0.26458332"}} x="96.217026" y="228.57898">mg/L</tspan>
				</text>
				<text id="VSL_1_TR_UNITS-2-06-0" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="103.34956" y="204.16319" xmlSpace="preserve">
					<tspan id="tspan1466-5-8-8" style={{"strokeWidth":"0.26458332"}} x="103.34956" y="204.16319">C</tspan>
				</text>
				<text id="VSL_1_TR_UNITS-2-0-7-1" style={{"fontStyle":"normal","fontWeight":"normal","fontSize":"5.64444447px","lineHeight":"1.25","fontFamily":"sans-serif","letterSpacing":"0px","wordSpacing":"0px","fill":"#000000","fillOpacity":"1","stroke":"none","strokeWidth":"0.26458332"}} x="115.86287" y="213.24498" xmlSpace="preserve">
					<tspan id="tspan1466-5-9-9-9" style={{"strokeWidth":"0.26458332"}} x="115.86287" y="213.24498">C</tspan>
				</text>
			</g>
		</g>
	</g>
</svg>
        
      </div>
    );
  }
}

export default withStyles(styles, {name: 'ProcessMap'})(ProcessMap);
