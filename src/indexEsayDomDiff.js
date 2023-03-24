import React from './react';
import ReactDOM from './react-dom';

class testFunc extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {num:0};
    console.log("Count1: 组件初始化 constructor")
  }

  componentWillMount() {
    console.log("Count2: 组件即将挂载 componentWillMount")
  }

  componentDidMount() {
    console.log("Count4: 组件挂载完毕 componentDidMount")
  }

  // componentWillUnmount() {
  //   console.log("Count: 组件即将完毕 componentWillUnmount")
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Count6: 组件是否需要更新 shouldComponentUpdate")
    return nextState.num%2 === 0;
  }

  componentWillUpdate() {
    console.log("Count7: 组件即将更新 componentWillUpdate")
  }

  componentDidUpdate() {
    console.log("Count8: 组件更新完毕 componentDidUpdate")
  }

  handle = () => {
    this.setState({num: this.state.num+1})
  }

  render() {
    console.log("Counter3: 组件渲染render")
    return <div id="testNode" style={{color:'red'}}>
      {this.state.num}
      <button onClick={this.handle}>+</button>
      {this.state.num === 4 && <CounterChild counter={this.state.num}></CounterChild>}
    </div>
  }
}

class CounterChild extends React.Component{
  constructor(props) {
    super(props);
    console.log("Sum1: 子组件初始化")
  }

  componentWillMount() {
    console.log("Sum2: 子组件即将挂载 componentWillMount")
  }

  componentDidMount() {
    console.log("Sum4: 子组件挂载完毕 componentDidMount")
  }

  componentWillUnmount() {
    console.log("Sum9: 子组件即将卸载 componentWillUnmount")
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log("Sum5: 子组件接收数据 componentWillReceiveProps")
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Sum6: 子组件是否需要更新 shouldComponentUpdate")
    return nextProps.counter === 4;
  }

  componentWillUpdate() {
    console.log("Sum7: 子组件即将更新 componentWillUpdate")
  }

  componentDidUpdate() {
    console.log("Sumt8: 子组件更新完毕 componentDidUpdate")
  }

  render() {
    console.log("Sum3: 组件渲染 render")
    return (
      <div>{this.props.counter}</div>
    )
  }
}

const el = React.createElement(testFunc, {num: 'hahaaa'});

ReactDOM.render(el  ,document.getElementById('root'));