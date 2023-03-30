import React from './react';
import ReactDom from './react-dom';

class OButton extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "btn"
    }
  }

  render() {
    return(
      <button name={this.state.name}>{this.props.title}</button>
    )
  }
}

let wrapper = (oldComponent) => {
  return class newBtn extends oldComponent {
    constructor(props) {
      super(props)
      this.state = {
        num: 0,
        handle: () => {
          this.setState({num: this.state.num+1});
        }
      }
    }

    render() {
      let oldProps = super.render();
      let newProps = {
        ...oldProps,
        onClick: this.state.handle
      }
      return React.cloneElement(oldProps, newProps, this.state.num);
    }
  }
}

let NNButton = wrapper(OButton);

ReactDom.render(<NNButton></NNButton>,document.getElementById('root'));