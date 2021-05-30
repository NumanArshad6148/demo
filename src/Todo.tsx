import React from "react";

// type TodoProps = {
//     name: string
// }

interface TodoProps {
  name: string;
  count: number;
  increment: () => void;
}
const Todo: React.FC<TodoProps> = (props) => {
  return (
    <div>
      <h1>
        {props.count} and
        {props.increment}
        welcome to typescript
      </h1>
      <button onClick={props.increment}>increment button</button>
    </div>
  );
};

export default Todo;
