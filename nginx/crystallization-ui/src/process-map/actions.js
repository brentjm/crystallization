export const setProcessState = (processState) => ({
  type: "SET_PROCESS_STATE",
  processState
});

// TODO
export const test = () => ({
  type: "TEST"
});

export function connectWebSocket(ipAddress) {
  // Return a thunk that can be dispatched when the process-map is viewed
  return function(dispatch) {
    const socket = new WebSocket(ipAddress);
    socket.addEventListener('message', function (event) {
        let newProcessState = event.data;
        dispatch(setProcessState(newProcessState));
    });
  }
};
