var Immutable = require('seamless-immutable').static;

let metaData =  {
    "USER:SP": "junk",
    "STATUS:SP": "Running",
    "EXPERIMENT:SP": "Crystallization",
    "MODE:SP": "SIMULATION"
};

let TCU = {
    "POWER:PV": "ON",           
    "MODE:PV": "SENSOR",        
    "BATH:TEMP:PV": 22,
    "SENSOR:TEMP:PV": 40,
};

let STIR = {
    "STATUS:PV": "STOPPED",
    "SPEED:PV": 0
};

let PUMP = {
    "STATUS:PV": "STOPPED",
    "RATE:PV": 0
};

let BALANCE = {
    "MASS:PV": 200,
};

let IR = {
    "CONCENTRATION:PV": 0,
    "SPECTRA:PV": [0, 0, 0]
};

let FBRM = {
    "D50:PV": 0,
    "D90:PV": 0,
    "HISTOGRAM:PV": [0, 0, 0]
};

let THERMOCOUPLE = {
    "TEMP:PV": 22
};

let PT = {
    "PRESSURE:PV": 0.8
};

let VALVES = {
    "STATE:PV": {"A": "CLOSED", "B": "CLOSED", "C": "CLOSED", "D": "CLOSED", "E": "CLOSED"}
}

let initialProcessState = Immutable({
    "metaData": Object.assign({}, metaData),
    "TCU:1": Object.assign({}, TCU),
    "TCU:2": Object.assign({}, TCU),
    "TCU:3": Object.assign({}, TCU),
    "STIR:1": Object.assign({}, STIR),
    "STIR:2": Object.assign({}, STIR),
    "STIR:3": Object.assign({}, STIR),
    "PUMP:1": Object.assign({}, PUMP),
    "PUMP:2": Object.assign({}, PUMP),
    "PUMP:3": Object.assign({}, PUMP),
    "PUMP:FEED": Object.assign({}, PUMP),
    "BALANCE:FEED": Object.assign({}, BALANCE),
    "BALANCE:ANTISOLVENT": Object.assign({}, BALANCE),
    "BALANCE:PRODUCT": Object.assign({}, BALANCE),
    "IR:1": Object.assign({}, IR),
    "IR:2": Object.assign({}, IR),
    "IR:3": Object.assign({}, IR),
    "FBRM:1": Object.assign({}, FBRM),
    "FBRM:2": Object.assign({}, FBRM),
    "FBRM:3": Object.assign({}, FBRM),
    "THERMOCOUPLE:FEED": Object.assign({}, THERMOCOUPLE),
    "PT:SEPARATOR": Object.assign({}, PT),
    "VALVES": Object.assign({}, VALVES),
});

/*
export const initialProcessState = {
  "metaData:EXPERIMENT:PV:": "IRAK4",
  "metaData:USER:PV": "Brent Maranzano",
  "metaData:STATUS:PV": "Running",
  "metaData:MODE:PV": "Running",
  "TCU:1:BATH:TEMP:PV": "60",
  "TCU:1:SENSOR:TEMP:PV": "58",
  "TCU:2:BATH:TEMP:PV": "30",
  "TCU:2:SENSOR:TEMP:PV": "26",
  "TCU:3:BATH:TEMP:PV": "5",
  "TCU:3:SENSOR:TEMP:PV": "4",
  "STIR:1:SPEED:PV": "190",
  "STIR:2:SPEED:PV": "200",
  "STIR:3:SPEED:PV": "250",
  "PUMP:2:RATE:PV": "4.2",
  "PUMP:1:RATE:PV": "2.3",
  "PUMP:3:RATE:PV": "1.8",
  "PUMP:FEED:RATE:PV": "2.1",
  "BALANCE:PRODUCT:MASS:PV": "0",
  "BALANCE:FEED:MASS:PV": "1200",
  "BALANCE:ANTISOLVENT:MASS:PV": "800",
  "IR:1:CONCENTRATION:PV": "12.3",
  "IR:2:CONCENTRATION:PV": "6.2",
  "IR:3:CONCENTRATION:PV": "1.3",
  "FBRM:1:D50:PV": "1.31",
  "FBRM:2:D50:PV": "1.89",
  "FBRM:3:D50:PV": "2.06",
  "FBRM:1:D90:PV": "2.97",
  "FBRM:2:D90:PV": "4.31",
  "FBRM:3:D90:PV": "5.65",
  "THERMOCOUPLE:FEED:TEMP:PV": "60.2",
  "PT:SEPARATOR:PRESSURE:PV": "0.8",
  "VALVES:STATE:PV": {"A": "CLOSED", "B": "CLOSED", "C": "CLOSED", "D": "CLOSED", "E": "CLOSED"}
};
*/

export const processState = (state = initialProcessState, action) => {
  switch (action.type) {
    case "SET_PROCESS_STATE": {
      let { message } = action;
      message = JSON.parse(message);
      let newState = {};
      newState = Immutable.setIn(state, [message["equipment"], message["command"]], message["value"]);
      if (message.equipment === "TCU:1") {
        //console.log(message.value);
      }
      return newState;
    }
    default:
      return state;
  }
};
