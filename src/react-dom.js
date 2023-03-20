import { REACT_ELEMENT, REACT_FORWARD_REF } from './common';
import newAddEvent from './event';

const render = (vdom, container) => {
  let dom = getRealDom(vdom);

  container.appendChild(dom);
}

function getRealDom(vdom) {
  let realDom;
  const {type, props, ref} = vdom;
  if(type === REACT_ELEMENT) {
    realDom = document.createTextNode(type);
  } else if(typeof type === 'function') {
    //判断是函数式组件还是类组件
    if(type.isClassComponent) {
      return createClassElement(vdom);
    } else {
      return createFuncElement(vdom);
    }
  } else if(type && type.$$typeof === REACT_FORWARD_REF)  {
    return createForwardElement(vdom)
  } else {
    realDom = document.createElement(type);
  }

  if(props) {
    updateProps(realDom, {}, props);
  }
  
  vdom.dom = realDom;
  if(ref) {
    ref.current = realDom;
  }
  return realDom;
}

function createFuncElement(vdom) {
  const {type, props} = vdom;
  let virtualDom = type(props);
  vdom.oldRenderVnode = virtualDom;
  return getRealDom(virtualDom);
}

function createClassElement(vdom) {
  const {type, props, ref} = vdom;
  const classInstance = new type(props);

  classInstance.props = props; //这一句不知道该不该加
  let virtualDom = classInstance.render();
  classInstance.oldRenderVnode = virtualDom;
  vdom.oldRenderVnode = virtualDom;
  if(ref) {
    ref.current = classInstance;
  }
  return getRealDom(virtualDom);
}

function createForwardElement(vdom) {
  const {type, props, ref} = vdom;
  const {render} = type;
  let virtualDom = render(props,ref);
  return getRealDom(virtualDom);
}

function updateProps(realDom, oldProps, newProps) {
  if(newProps) {
    for(let key in newProps) {
      if(key === 'children') {
        let childrens = newProps[key];
        if(typeof childrens === 'string' || typeof childrens === 'number') {
          // realDom.innerText = realDom.innerText + childrens;
          realDom.appendChild(document.createTextNode(childrens));
        } else if(Array.isArray(childrens)) {
          childrens.forEach((item)=>{
            if(typeof item === 'string' || typeof item === 'number') {
              realDom.appendChild(document.createTextNode(item));
            } else {
              render(item,realDom);
            }
          })
        } else {
          if(childrens) {
            render(childrens,realDom);
          }  
        }
      } else if(key === 'style') {
        for(let i in newProps[key]) {
          realDom.style[i] = newProps[key][i];
        }
      } else if(key.startsWith('on')){
        //这里进行事件的合成
        newAddEvent(realDom, key.toLocaleLowerCase(), newProps[key]);
      } else {
        realDom[key] = newProps[key];
      }
    }
  }
  
  //删除新的props没有的
  if(oldProps) {
    for(let key in oldProps) {
      if(!newProps[key]) {
        realDom[key] = null;
      }
    }
  }
}

export function twoVnode(parent,newVdom,oldVdom) {
  let newRealDom = getRealDom(newVdom);
  let oldRealDom = findRealDom(oldVdom);

  // console.log(parent);
  parent.replaceChild(newRealDom,oldRealDom);
  newVdom.dom = newRealDom;
}

export function findRealDom(vdom) {
  if(!vdom) return null;

  if(vdom.dom) {
    return vdom.dom;
  } else {
    return findRealDom(vdom.oldRenderVnode);
  }
}

const ReactDom = {
  render
}

export default ReactDom;