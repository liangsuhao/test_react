import React from './react';
import ReactDOM from './react-dom';

class Three extends React.Component {
  render() {
    return(
      <div>three: {this.props.num}</div>
    )
  }
}

function Two(props) {
  return (
    <Three {...props}></Three>
  )
}

class mainTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {num: 1};

    setTimeout(() => {
      this.setState({num:2})
    }, 1000);
  }

  render() {
    return (<Two num={this.state.num}></Two>)
  }
}

const el = React.createElement(mainTest);

ReactDOM.render(el  ,document.getElementById('root'));