var Immutable = require('seamless-immutable').static;

export const initialProcessState = {
  "TITLE": "IRAK4",
  "USER": "Brent Maranzano",
  "STATUS": "Running",
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

export const processState = (state = initialProcessState, action) => {
  switch (action.type) {
    case "SET_PROCESS_STATE": {
      let { processState } = action;
      processState = JSON.parse(processState);
      let item = processState["equipment"]+":"+processState["command"];
      let value = processState["value"];
      let update = {};
      update[item] = String(value);
      if (processState["equipment"] === "VALVES") {
        console.log(processState["value"]);
      }
      return Immutable.merge(state, update);
    }
    default:
      return state;
  }
};
