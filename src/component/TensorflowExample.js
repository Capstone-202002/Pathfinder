import React, { useState } from "react";


class TensorflowExample extends React.Component {

  sendmessage() {
    const electron = window.require('electron')
    const ipc = electron.ipcRenderer
    console.log('들어옴')
    console.log(ipc)
    ipc.send('test', 'hello world!')
  }


  render() {
    return (
      <div id='sss'>
        <p> hello world!</p>
        <button onClick={this.sendmessage}>클릭!</button>
      </div>
    )
  }
}

export default TensorflowExample;
