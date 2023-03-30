import React from './react';
import ReactDom from './react-dom';

//Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案

class TestFunc extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
    this.inputRef = React.createRef();
  }

  handle = () => {
    this.setState({count: Number(this.state.count) + Number(this.inputRef.current.value)})
  }

  render() {
    return(
      <div>
        <input ref={this.inputRef} defaultValue={0}></input>
        <button onClick={this.handle}>+</button>
        <Child count={this.state.count}></Child>
      </div>
    )
  }
}

class Child extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('render')
    return <div>{this.props.count}</div>
  }
}

ReactDom.render(<TestFunc></TestFunc>,document.getElementById('root'));