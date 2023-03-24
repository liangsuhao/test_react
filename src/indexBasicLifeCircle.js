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
    console.log(this.state.num);
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
      </div>
  }
}

const el = React.createElement(testFunc, {num: 'hahaaa'});
console.log(el)

ReactDOM.render(el  ,document.getElementById('root'));