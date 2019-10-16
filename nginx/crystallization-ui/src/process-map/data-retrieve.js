const socket = new WebSocket('ws://10.131.0.175:1880/ws/process');

socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});
