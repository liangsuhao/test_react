import { REACT_TEXT } from './common';

export function getNewVnode(item) {
  if(typeof item === 'string' || typeof item === 'number') {
    return {type: REACT_TEXT, content: item};
  } else {
    return item;
  }
}

export function isExit(item) {
  return item || item === 0;
}

export function judgeTwoObj(obj1, obj2) {
  if(Object.prototype.toString.call(obj1)  === '[object Object]' && 
  Object.prototype.toString.call(obj2)  === '[object Object]' && 
  Object.keys(obj1).length === Object.keys(obj2).length) {
    for(let key in obj1) {
      if(obj2[key] !== obj1[key]) {
        return true;
      }
    }
    return false;
  }

  return true;
}