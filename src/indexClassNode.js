import React from './react';
import ReactDOM from './react-dom';

class testFunc extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return <div id="testNode" style={{color:'red'}}>123{this.props.num}</div>
  }
}

const el = React.createElement(testFunc, {num: 'hahaaa'});
console.log(el)

ReactDOM.render(el  ,document.getElementById('root'));