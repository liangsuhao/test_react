import { REACT_ELEMENT, REACT_FORWARD_REF, REACT_PROVIDER, REACT_CONTEXT } from './common.js';
import {Component, PureComponent} from './component.js';
import { getNewVnode, isExit } from './utils.js';
import { useState, useReducer, useEffect } from './react-dom'

function createElement(tag, props, ...children) {
  const result = {};
    result.$$typeof = REACT_ELEMENT;
    result.key = null;
    result.ref = null;
    result.type = tag;
    // result._owner = null;
    result._store = {validated: false}
    // result._self = null; 
    // result._source = null;
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

function createContext() {
  let context = {
    $$typeof: REACT_CONTEXT,
  };
  let consumer = {
    $$typeof: REACT_CONTEXT,
    _context: context
  };
  let provider = {
    $$typeof: REACT_PROVIDER,
    _context: context
  }
  context.Consumer = consumer;
  context.Provider = provider;
  context._currentValue = undefined;
  return context;
}

function cloneElement(oldElement, newProps, ...children) {
  let newChildren;
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
  newProps['children'] = newChildren;

  return {
    ...oldElement,
    props: newProps
  }
}

const React = {
  createElement,
  Component,
  createRef,
  forwardRef,
  createContext,
  cloneElement,
  PureComponent,
  useState,
  useReducer,
  useEffect
}

export default React;
