import { REACT_INSERT, REACT_MOVE, REACT_TEXT } from './common';
import { findRealDom, getRealDom, updateProps, twoVnode } from './react-dom';
/**
 * 
 * @param {Array} newVdom 新的虚拟dom
 * @param {Array} oldVdom 旧的虚拟dom
 * @param {dom} parent 父节点的真实dom
 * 
 * 1.首先将旧的虚拟dom用key作为键存成oldVdomMap形式
 * 
 * 2.初始化补丁数组patch，初始化最后位置lastPlaceIndex=0
 * 
 * 3.循环遍历新虚拟dom，通过key去oldVdomMap中找
 *      (1)找到了，并且旧的vdom的数组下标比lastPlaceIndex大，比较新旧dom的数组下标index，取二者最大值更新lastPlaceIndex
 *      (2)找到了，并且旧的vdom的数组下标比lastPlaceIndex小，说明这个节点要移动。将该节点push到patch中并标记是要移动的，oldVdomMap中删除该元素
 *      (3)找不到，说明是要插入的，push到patch中并标记是要插入的元素
 * 4.遍历完之后oldVdomMap中剩下的都是要删除的，再加上要移动的也是要先删除，所以从父元素真实dom中删除
 * 5.处理patch数组，要移动的进行移动，要删除的进行删除
 */
export function domDiff(newVdom, oldVdom, parent) {
  let oldVdomMap = new Map(), patch = [], lastPlaceIndex = 0;
  oldVdom.forEach((item,index)=>{
    if(item) {
      let key = (item?.key || item?.key===0) ? item?.key : index;
      item.arrIndex = index;
      oldVdomMap.set(key,item);
    }
  })

  newVdom.forEach((item,index) => {
    if(item) {
      let key = (item?.key || item?.key===0) ? item?.key : index;
      item.arrIndex = index;
      let oldItem = oldVdomMap.get(key);
      
      
      if(oldItem) {
        if(item.type === REACT_TEXT) {
          findRealDom(oldItem).textContent = item.content;
        } else {
          // updateProps(findRealDom(oldItem), oldItem.props, item.props);
          twoVnode(findRealDom(oldItem).parentNode, item, oldItem)
        }
        if(oldItem.arrIndex < lastPlaceIndex) { //说明要移动
          patch.push({
            oldVdom: oldItem,
            newVdom: item,
            position: index,
            type: REACT_MOVE,
          })
        } else { //这些直接呆在原地的dom需要重新赋值
          item.dom = oldItem.dom;
        }
        lastPlaceIndex = Math.max(index, oldItem.arrIndex, lastPlaceIndex);

        oldVdomMap.delete(key);
      } else { //说明要添加
        patch.push({
          newVdom: item,
          position: index,
          type: REACT_INSERT,
        })
      }
    }
  })

  //从这里开始处理真实dom
  //要移动的和要删除的都从父节点删除
  Array.from(oldVdomMap.values()).concat(patch.filter(item => item.type === REACT_MOVE).map(item=>item.oldVdom)).forEach((item) => {
    parent.removeChild(findRealDom(item));
  })

  patch.forEach((item) => {
    if(item.type === REACT_MOVE) {
      let realDom = getRealDom(item.newVdom);
      let children = parent.childNodes;
      // let position = children.find((item,index)=>index>item.position);
      let position = children[item.position];
      if(position) {
        parent.insertBefore(realDom, position);
      } else {
        parent.appendChild(realDom);
      }
      item.newVdom.dom = realDom;
    } else if(item.type === REACT_INSERT) {
      let realDom = getRealDom(item.newVdom);
      let children = parent.childNodes;
      // let position = children.find((item,index)=>index>item.position);
      let position = children[item.position];
      if(position) {
        parent.insertBefore(realDom, position);
      } else {
        parent.appendChild(realDom);
      }
      item.newVdom.dom = realDom;
    }
  })
}