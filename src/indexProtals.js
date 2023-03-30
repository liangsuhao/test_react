import React from './react';
import ReactDom from './react-dom';

//Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案

class TestFunc extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <Dialog></Dialog>
      </div>
    )
  }
}

class Dialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ReactDom.createPortal(<div>这是弹框</div>,
    document.getElementById('dialog'));
  }
}

ReactDom.render(<TestFunc></TestFunc>,document.getElementById('root'));