import React from './react';
import ReactDom from './react-dom';

function Counter() {
  const [num, setNum] = React.useState(0);
  React.useEffect(() => {
    console.log(123)
    let timer = setTimeout(()=>{
      setNum(num+1);
    }, 1000);
  }, [num])
  return (
    <div>{num}</div>
  );

}
ReactDom.render(<Counter></Counter>,document.getElementById('root'));