import React from './react';
import ReactDOM from './react-dom';

function testFunc() {
  return <div id="testNode" style={{color:'red'}}>123</div>
}

const el = React.createElement(testFunc, {game: 'this'});
console.log(el)

ReactDOM.render(el  ,document.getElementById('root'));