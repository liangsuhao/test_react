import React from './react';
import ReactDOM from './react-dom';

// const el = <div><p>123</p></div>

// const el = /*#__PURE__*/React.createElement("div", null, 123,React.createElement("h1", {
//   title: "hello",
//   style: {
//     color: 'red',
//   }
// }, "hello react"));

const el = React.createElement('div', {id: 'this'}, 123, React.createElement('div',null,456));

console.log(el)
// const el = React.createElement("h1",{
//   className:"hello",
//   style: {
//     color: 'red'
//   }
// }, 123)

ReactDOM.render(el  ,document.getElementById('root'));
