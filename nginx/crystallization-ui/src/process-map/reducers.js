var Immutable = require('seamless-immutable').static;

const initialProcessState = Immutable({
  processTitle: "My Process",
});

export const processState = (state = initialProcessState, action) => {
  switch (action.type) {
    case "SET_PROCESS_TITLE": {
      let { title } = action;
      console.log(title);
      return Immutable.merge(state, {processTitle: title})
    }
    default:
      return state;
  }
};
