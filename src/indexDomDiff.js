import React from './react';
import ReactDOM from './react-dom';

class TestFunc extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {arr:['A','B','C','D','E','F']}
  }

  handle = () => {
    this.setState({arr:['A','C','E','B','D','G']});
  }

  render() {
    return(
      <div>
        <ul>
          {this.state.arr.map((item)=><li key={item}>{item}</li>)}
        </ul>
        <button onClick={this.handle}>触发</button>
      </div>
    )
  }
}

const el = <TestFunc></TestFunc>;

ReactDOM.render(el  ,document.getElementById('root'));