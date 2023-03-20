import React from './react';
import ReactDOM from './react-dom';

class testFunc extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {num: 0};
  }

  handleClick = () => {
    this.setState({num: this.state.num+1})
    // this.setState({num: this.state.num+1})
    // this.setState({num: this.state.num+1})

    setTimeout(() => {
      this.setState({num: this.state.num+1})
      // console.log(this.state.num)
      // this.setState({num: this.state.num+1})
      // console.log(this.state.num)
    }, 1000);
  }

  render() {
    return <div id="testNode" style={{color:'red'}}>
      <div>{this.state.num}</div>
      <button onClick={this.handleClick}>+</button>
    </div>
  }
}

const el = React.createElement(testFunc, {num: 'hahaaa'});
console.log(el)

ReactDOM.render(el  ,document.getElementById('root'));