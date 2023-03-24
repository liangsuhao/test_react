import { REACT_FORWARD_REF, REACT_TEXT } from './common';
import { domDiff } from './diff';
import newAddEvent from './event';

const render = (vdom, container) => {
  if(!vdom) {
    return
  }
  let dom = getRealDom(vdom);

  container.appendChild(dom);
  if(dom.componentDidMount) {
    dom.componentDidMount();
  }
}

export function getRealDom(vdom) {
  let realDom;
  const {type, props, ref} = vdom;
  if(type === REACT_TEXT) {
    realDom = document.createTextNode(vdom.content);
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
  if(classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }

  let virtualDom = classInstance.render();
  classInstance.oldRenderVnode = virtualDom;
  vdom.oldRenderVnode = virtualDom;
  if(ref) {
    ref.current = classInstance;
  }

  let dom = getRealDom(virtualDom);
  if(dom && classInstance.componentDidMount) {
    dom.componentDidMount = classInstance.componentDidMount;
  }
  return dom;
}

function createForwardElement(vdom) {
  const {type, props, ref} = vdom;
  const {render} = type;
  let virtualDom = render(props,ref);
  return getRealDom(virtualDom);
}

export function updateProps(realDom, oldProps, newProps) {
  if(newProps) {
    for(let key in newProps) {
      if(key === 'children') {
        updateChildren(newProps, oldProps, realDom);
        // let childrens = newProps[key];
        // if(typeof childrens === 'string' || typeof childrens === 'number') {
        //   // realDom.innerText = realDom.innerText + childrens;
        //   realDom.appendChild(document.createTextNode(childrens));
        // } else if(Array.isArray(childrens)) {
        //   childrens.forEach((item)=>{
        //     if(typeof item === 'string' || typeof item === 'number') {
        //       realDom.appendChild(document.createTextNode(item));
        //     } else {
        //       render(item,realDom);
        //     }
        //   })
        // } else {
        //   if(childrens) {
        //     render(childrens,realDom);
        //   }  
        // }
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

export function twoVnode(parent,newVdom,oldVdom,position) {
  // let newRealDom = getRealDom(newVdom);
  // let oldRealDom = findRealDom(oldVdom);

  // parent.replaceChild(newRealDom,oldRealDom);
  // newVdom.dom = newRealDom;
  //这里分几种情况来判断
  if(!newVdom && !oldVdom){
    return
  } else if(newVdom && !oldVdom) {
    newVdom.dom = insertDom(newVdom, position, parent);
  } else if(!newVdom && oldVdom) {
    deleteDom(oldVdom);

    //相当于卸载操作，要触发对应的生命周期
    if(oldVdom.classInstance && oldVdom.classInstance) {

    }
    //有ref的话要变为空
    if(oldVdom.ref) {
      oldVdom.ref = null;
    }
  } else if(newVdom && oldVdom && newVdom.type !== oldVdom.type) { //类型不同不可以复用
    deleteDom(oldVdom);
    newVdom.dom = insertDom(newVdom, position, parent);
  } else {
    if(newVdom.type === REACT_TEXT) { //文本节点单独处理
      let textDom = oldVdom.dom;
      textDom.textContent = newVdom.content;
      newVdom.dom = textDom;
    } else {
      let newDom = findRealDom(oldVdom); //直接复用原来的真实dom，并处新vdom的属性
      updateProps(newDom, oldVdom.props, newVdom.props);
      // updateChildren(newVdom, oldVdom, newDom);
      newVdom.dom = newDom;
    }
  }
}

function updateChildren(newVdom, oldVdom, parent) {
  let oldChildren = Array.isArray(oldVdom?.children) ? oldVdom?.children : [oldVdom?.children];
  let newChildren = Array.isArray(newVdom?.children) ? newVdom?.children : [newVdom?.children];
  // let maxLen = Math.max(oldChildren.length, newChildren.length);
  // for(let i = 0; i < maxLen ; i++) {
  //   let position = oldChildren.find((item,index) => index>i && item && findRealDom(item));
  //   twoVnode(parent, newChildren[i], oldChildren[i], position);
  // }
  domDiff(newChildren, oldChildren, parent);
}

function insertDom(newDom, position, parent) {
  let newRealDom = getRealDom(newDom);
  if(position) {
    parent.insertBefore(newRealDom, position);
  } else {
    parent.appendChild(newRealDom);
  }
  
  if(newDom.componentDidMount) {
    newDom.componentDidMount();
  }
  return newRealDom;
}

function deleteDom(oldVDom) {
  let {props, ref} = oldVDom;
  let oldRealDom = findRealDom(oldVDom);

  if(oldVDom.classInstance && oldVDom.classInstance.componentWillUnMount) {
    oldVDom.classInstance.componentWillUnMount();
  }

  if(ref) {
    ref = null;
  }

  if(props && props.children) {
    let childrens = Array.isArray(props.children) ? props.children : [props.children];
    childrens.forEach(deleteDom)
  }

  if(oldRealDom) {
    oldRealDom.parentNode.removeChild(oldRealDom);
  }
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