import React from './react';
import ReactDOM from './react-dom';

class sum extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.a = React.createRef();
    this.b = React.createRef();
    this.c = React.createRef();
  }

  handle = () => {
    let aVal = this.a.current.value;
    let bVal = this.b.current.value;
    this.c.current.value = aVal + parseInt(bVal);
  }

  render() {
    return (
      <div>
        <input ref={this.a}></input>
        +
        <input ref={this.b}></input>
        <button onClick={this.handle}>求和</button>
        <input ref={this.c}></input>
      </div>
    )
  }
}

const el = React.createElement(sum);

ReactDOM.render(el  ,document.getElementById('root'));