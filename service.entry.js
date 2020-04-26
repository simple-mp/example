
import Vue from 'vue';
import ServiceHi from './src/main/hi/vue'
import ServiceHello from './src/main/hello/vue'

let pageMap= {
  "main/hi/index": ServiceHi,
  "main/hello/index": ServiceHello,
}
let serviceMap = {};

self.fireEvent = function fireEvent(event) {
  self.postMessage(event);
}
self.addEventListener('message', function (e) {
  let {type, life, rid, handleName, pagepath} = e.data;
  if (type == 'createPageService') {
    let service = new Vue(pageMap[pagepath]);
    
    service.$mount()
    service.rid = rid;
    serviceMap[rid] = service;
  } else if (type == 'lifeEvent') {
    let ins = serviceMap[rid];
    ins[life]();
  } else if (type == 'uiEvent') {
    let ins = serviceMap[rid];
    ins[handleName]();
  }

}, false);

fireEvent({
  type: 'inited'
})