import React from './react';
import ReactDOM from './react-dom';

function TestFocus(props, ref) {
  return (
    <input ref={ref}></input>
  )
}

let ForwardTest = React.forwardRef(TestFocus);
console.log(ForwardTest)
console.log(<ForwardTest></ForwardTest>)

class mainTest extends React.Component {
  constructor(props) {
    super(props);
    this.a = React.createRef();
  }

  nowFocus = () => {
    this.a.current.focus();
  }

  render() {
    return(
      <div>
        <ForwardTest ref={this.a}></ForwardTest>
        <button onClick={this.nowFocus}>聚焦</button>
      </div>
    )
  }
}

const el = React.createElement(mainTest);

ReactDOM.render(el  ,document.getElementById('root'));