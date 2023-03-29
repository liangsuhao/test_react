import React from './react';
import ReactDOM from './react-dom';

class testFunc extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {num:0};
    console.log("Count1: 组件初始化 constructor")
  }

  componentDidMount() {
    console.log("Count4: 组件挂载完毕 componentDidMount")
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
      <CounterChild counter={this.state.num}></CounterChild>
    </div>
  }
}

class CounterChild extends React.Component{
  constructor(props) {
    super(props);
    console.log("Sum1: 子组件初始化")
    this.state = {
      counter: props.counter
    }
  }
  componentDidMount() {
    console.log("Sum4: 子组件挂载完毕 componentDidMount")
  }

  static getDerivedStateFromProps(nextProps, nexState) {
    // if(nextProps.counter % 2 === 0) {
    //   return{
    //     counter: nextProps.counter
    //   }
    // } else if(nextProps.counter % 3 === 0) {
    //   return{
    //     counter: nextProps.counter
    //   }
    // } else {
    //   return null;
    // }
    return {
      counter2: nextProps.counter % 2 === 0 ? nextProps.counter : 0,
      counter3: nextProps.counter % 3 === 0 ? nextProps.counter : 0,
    }
  }

  componentDidUpdate() {
    console.log("Sumt8: 子组件更新完毕 componentDidUpdate")
  }

  render() {
    console.log("Sum3: 组件渲染 render")
    return (
      <div>{this.state.counter2} {this.state.counter3}</div>
      
    )
  }
}

const el = React.createElement(testFunc, {num: 'hahaaa'});

ReactDOM.render(el  ,document.getElementById('root'));