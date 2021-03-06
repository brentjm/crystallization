var socket = null;

export const setProcessState = (message) => ({
  type: "SET_PROCESS_STATE",
  message
});

export function connectWebSocket(ipAddress) {
  // Return a thunk that can be dispatched when the process-map is viewed
  return function(dispatch) {
    socket = new WebSocket(ipAddress);
    socket.addEventListener('message', function (event) {
        let newProcessState = event.data;
        dispatch(setProcessState(newProcessState));
    });
  }
};

export function sendWebSocketCommand(command) {
  command = JSON.stringify(command);
  socket.send(command);
};
