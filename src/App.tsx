import React, { useState } from 'react';
import './App.css';
import Todo from './Todo';

function App() {

  const[count, setCount] = useState<number>(0);
  const[data, setData] = useState(undefined);


  const increment = (): void => {
     setCount(count + 1);
  }
  return (
    <div className="App">
              <Todo
              name="numan" 
              count={count}
              increment={increment} />

     
    </div>
  );
}

export default App;
