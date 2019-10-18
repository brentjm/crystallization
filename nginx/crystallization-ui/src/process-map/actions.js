export const setProcessState = (processState) => ({
  type: "SET_PROCESS_STATE",
  processState
});

export function connectWebSocket(ipAddress) {
  // Return a thunk that can be dispatched when the process-map is viewed
  return function(dispatch) {
    const socket = new WebSocket(ipAddress);
    socket.addEventListener('message', function (event) {
        let processState = event.data;
        dispatch(setProcessState(processState));
    });
  }
};
