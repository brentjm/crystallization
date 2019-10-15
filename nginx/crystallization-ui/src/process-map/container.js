import React, { Component } from "react";
import { setProcessTitle } from './actions';
import ProcessMap from './process-map';

class Container extends Component {

  componentDidMount = () => {
    const socket = new WebSocket('ws://10.131.0.175:1880/ws/process');
    socket.addEventListener('open', function (event) {
        socket.send('Hello Server Test!');
    });

    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });
  }

  render() {
    return (
      <ProcessMap />
    );
  }

};

export default Container;
