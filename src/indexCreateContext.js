import React from './react';
import ReactDOM from './react-dom';
let themeColor = React.createContext('black');

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  static contextType = themeColor;
  render() {
    return(
      <div style={{margin:"10px", padding:'10px', border:`5px solid ${this.context.color}`}}>
        Header
        <Title></Title>
      </div>
    )
  }
}

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <themeColor.Consumer>
        {
          (value) => 
            <div style={{margin:"10px", padding:'10px', border:`5px solid ${value.color}`}}>
              Title
            </div>
          
        }
      </themeColor.Consumer>
    )
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = themeColor;
  render() {
    return(
      <div style={{margin:"10px", padding:'10px', border:`5px solid ${this.context.color}`}}>
        Main
        <Content></Content>
      </div>
    )
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <themeColor.Consumer>
        {
          (value) => 
            <div style={{margin:"10px", padding:'10px', border:`5px solid ${value.color}`}}>
              Content
              <button onClick={() => value.changeColor('red')}>变红</button>
              <button onClick={() => value.changeColor('black')}>变黑</button>
            </div>
          
        }
      </themeColor.Consumer>
    )
  }
}

class TestContext extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      color: 'red'
    }
  }

  changeColor = (color) => {
    this.setState({color: color});
  }

  render() {
    let context = {changeColor: this.changeColor, color:this.state.color}
    return (
      <themeColor.Provider value={context}>
        <div style={{margin:"10px", padding:'10px', border:`5px solid ${this.state.color}`, width:'300px'}}>
          Page
          <Header></Header>
          <Main></Main>
        </div>
      </themeColor.Provider>
    )
  }
}

const el = React.createElement(TestContext, {num: 'hahaaa'});

ReactDOM.render(el  ,document.getElementById('root'));

// class TestFunc extends React.Component {
//   constructor(props) {
//     super(props);
//     this.props = props;
//     this.state = {arr:['A','B','C','D','E','F']}
//   }

//   handle = () => {
//     this.setState({arr:['A','C','E','B','D','G','F']});
//   }

//   render() {
//     return(
//       <div>
//         <ul>
//           {this.state.arr.map((item)=><li key={item}>{item}</li>)}
//         </ul>
//         <button onClick={this.handle}>触发</button>
//       </div>
//     )
//   }
// }

// const el = <TestFunc></TestFunc>;

// ReactDOM.render(el  ,document.getElementById('root'));