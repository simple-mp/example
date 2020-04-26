import React from 'react'

export default class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.inited = false;
    this.state = {
      inited: false,
      rid: -1,
      data: {}
    }
  }

  eventProxy(eventName, handleName, e) {
    e.preventDefault();
    // 发送事件
    let { rid } = this.state;
    window.fireEvent({
      type: 'uiEvent',
      rid: rid,
      handleName,
      event: {
        value: 'test'
      }
    })
  }

  render() {
    let state = this.state || {};
    let data = state.data || {};
    
    if (!state.inited) {
      return <div>加载中...</div>
    }
  
    return <>
      <div>{data.time}</div>
      <button onClick={e => {
        this.eventProxy("btn_click", "stop", e)
      }}>暂停</button>
      <button onClick={e => {
        this.eventProxy("btn_click", "start", e)
      }}>开始</button>
    </>
  }
}