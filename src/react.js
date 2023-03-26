import { REACT_ELEMENT, REACT_FORWARD_REF } from './common.js';
import Component from './component.js';
import { getNewVnode, isExit } from './utils.js';

function createElement(tag, props, ...children) {
  const result = {};
    result.$$typeof = REACT_ELEMENT;
    result.key = null;
    result.ref = null;
    result.type = tag;
    result._owner = null;
    result._store = {validated: false}
    result._self = null; 
    result._source = null;
    if(props && props.ref) {
      result.ref = props.ref;
      delete props['ref'];
    }
    if(props && (props.key || props.key===0)) {
      result.key = props.key;
      delete props['key'];
    }
  
    let newPro = {...props}, newChildren;
    if(children && children.length > 1) {
      newChildren = [];
      children.forEach((item) => {
        if(isExit(item)) {
          newChildren.push(getNewVnode(item));
        }
      })
    } else {
      newChildren = children ? getNewVnode(children[0]) : null;
    }
    newPro['children'] = newChildren;
    result['props'] = newPro;
  
    return result;
}

function createRef() {
  return {current: null};
}

function forwardRef(render) {
  return {
    $$typeof: REACT_FORWARD_REF,
    render: render
  }
}

const React = {
  createElement,
  Component,
  createRef,
  forwardRef
}

export default React;
