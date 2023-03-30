import React from './react';
import ReactDom from './react-dom';

//Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案
function TestFunc() {
  const [num, setNum] = React.useState(0);

  const handle = () => {
    setNum(num+1);
  }

  return (
    <div>
      <h1>数字: {num}</h1>
      <button onClick={handle}>加一</button>
    </div>
  )
}

ReactDom.render(<TestFunc></TestFunc>,document.getElementById('root'));