import React from './react';
import ReactDOM from './react-dom';

class TestFocus extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.a = React.createRef();
  }

  getFocus = () => {
    this.a.current.focus();
  }

  render() {
    return (
      <input ref={this.a}></input>
    )
  }
}

class mainTest extends React.Component {
  constructor(props) {
    super(props);
    this.a = React.createRef();
  }

  nowFocus = () => {
    this.a.current.getFocus();
  }

  render() {
    return(
      <div>
        <TestFocus ref={this.a}></TestFocus>
        <button onClick={this.nowFocus}>聚焦</button>
      </div>
    )
  }
}

const el = React.createElement(mainTest);

ReactDOM.render(el  ,document.getElementById('root'));