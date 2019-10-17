var Immutable = require('seamless-immutable').static;

const initialProcessState = Immutable({
  "TITLE": "My Process",
  "USER": "Brent",
  "STATUS": "Running",
  "PUMP:1:RATE:PV": "3.1",
  "STIR:1:SPEED:PV": "190",
  "TCU:1:BATH:TEMP:PV": "60",
  "TCU:1:SENSOR:TEMP:PV": "58",
  "PUMP:2:RATE:PV": "4.2",
  "STIR:2:SPEED:PV": "200",
  "TCU:2:BATH:TEMP:PV": "30",
  "TCU:2:SENSOR:TEMP:PV": "26",
  "PUMP:3:RATE:PV": "1.8",
  "STIR:3:SPEED:PV": "250",
  "TCU:3:BATH:TEMP:PV": "  5",
  "TCU:3:SENSOR:TEMP:PV": "  4",
});

export const processState = (state = initialProcessState, action) => {
  switch (action.type) {
    case "SET_PROCESS_STATE": {
      let { processState } = action;
      processState = JSON.parse(processState);
      return Immutable.merge(state, {TITLE: processState.TITLE})
    }
    default:
      return state;
  }
};
