import react from 'react'
import ReactDOM from 'react-dom'
import PageHi from './src/main/hi/react'
import PageHello from './src/main/hello/react'

let ridCount = 0;
let pageMap= {
  "main/hello/index": PageHello,
  "main/hi/index": PageHi,
}
let renderMap = {};
let serviceWorker = new Worker('/dist/service.entry.js');

window.fireEvent = function fireEvent(event) {
  serviceWorker.postMessage(event)
  console.log('Message posted to worker');
}

serviceWorker.onmessage = function (e) {
  let { rid, type, data } = e.data;
  if (type == 'setData') {
    let render = renderMap[rid];
    render.setState({
      inited: true,
      data
    })
  } else if (type == 'inited'){
    let pagepath = Object.keys(pageMap)[0];
    // 渲染首页
    let rid = ++ ridCount;
    window.fireEvent({
      type: 'createPageService',
      rid,
      pagepath
    });
   
    let renderClass = pageMap[pagepath];
    let ref = react.createRef();
    let ele = react.createElement(renderClass, {
      ref,
    })
    ReactDOM.render(
      ele,
      document.getElementById('root'),
      () => {
        
        renderMap[rid] = ref.current;
        // 触发逻辑层运行
        ref.current.setState({rid});
        window.fireEvent({
          type: 'lifeEvent',
          rid,
          life: "onShow"
        });
      }
    );
  }
  
  console.log('Message received from worker', e.data);
}