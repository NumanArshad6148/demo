import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './Todo';

function App() {

  const[count, setCount] = useState<number>(0);

  const increment = (): void => {
     setCount(count + 2);
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
