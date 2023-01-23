import React, { useState } from 'react';

const types: string[] = ["to do", "in progress", "done"];

type TODO = {
    content: string;
    type: typeof types[number];
}


const TodoListBasic = () => {
    const [todos, setTodos] = useState<TODO[]>([]);
    const [currentTodo, setCurrentTodo] = useState<TODO>({
      content : "",
      type: types[0]
    });
    
    const addTodo = (todo: TODO) => {
      if (todo.content.length > 0){
          setTodos([...todos, todo]);
          setCurrentTodo({
            content: "",
            type: "to do"
          });
      }
    };
  
    const todoList = todos.map((todo, i) => 
    (
      <div key={i} style={{display: "flex", gap: "10px"}}>
          <div>{todo.content}</div>
          <div style={{fontWeight: "bold"}}>{todo.type}</div>
      </div>
    ));
    const addTodoForm = (
      <div>
        <input type="text" value={currentTodo.content} onChange={(e) => setCurrentTodo({...currentTodo,content: e.target.value}) } placeholder="Enter task"></input>
        <select value={currentTodo.type} onChange={(e) => setCurrentTodo({...currentTodo, type: e.target.value})}>
          {types.map((type, i) => <option key={i} value={type}>{type}</option>)}
        </select>
        <button onClick={() => addTodo(currentTodo)}>Add TODO</button>
      </div>
    );
    return (
      <div>
        {addTodoForm}
        {todoList}
      </div>
    );
};

export default TodoListBasic;
