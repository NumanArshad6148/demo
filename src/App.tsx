import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './Todo';

function App() {

  const[count, setCount] = useState<number>(0);

  const increment = (): void => {
     setCount(count + 1);
  }
  return (
    <div className="App">
              <Todo
              name="numan" 
              count={count}
              increment={increment} />

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
