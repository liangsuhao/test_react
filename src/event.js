import { syncUpdate } from './component';

export default function newAddEvent(dom, eventType, handler) {
   let store = dom.store || (dom.store = {});

   store[eventType] = handler;

   document[eventType] = dealHandle;
}

function dealHandle(event) {
  const {target, type} = event;

  let handler = target.store && target.store[`on${type}`];
  if(handler) {
    syncUpdate.isSyncBatch = true;
    let SyntheticBaseEvent = createDefaultEvent(event);
    handler(SyntheticBaseEvent);

    syncUpdate.batchUpdate();
    syncUpdate.isSyncBatch = false;
  }
}

function createDefaultEvent(event) {
  let SyntheticBaseEvent = {};
  for(let key in event) {
    SyntheticBaseEvent[key] = event[key];
  }
  SyntheticBaseEvent['nativeEvent'] = event;
  SyntheticBaseEvent.preventDefault = preventDefault;
  return SyntheticBaseEvent;
}

function preventDefault(event) {
  if(!event) { //兼容ie
    window.event.returnValue = false;
  }
  if(event.preventDefault) {
    event.preventDefault();
  }
}