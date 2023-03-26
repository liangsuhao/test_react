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