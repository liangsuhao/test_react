import React from './react';
import ReactDom from './react-dom';

function reducer(state={num: 0}, action) {
  switch (action.type) {
    case 'increment':
      return {num: state.num + 1};
    case 'decrement':
      return {num: state.num - 1};
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, {num: 0});
  return (
    <div>
      Count: {state.num}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </div>
  );
}
ReactDom.render(<Counter></Counter>,document.getElementById('root'));