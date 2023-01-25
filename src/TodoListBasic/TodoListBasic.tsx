import React, { useState } from 'react';
import "./TodoListBasic.css";
const types: string[] = ["to do", "in progress", "done"];

type TODO = {
    content: string;
    type: typeof types[number];
}

const TodoListBasic = () => {
    const [todos, setTodos] = useState<TODO[]>([]);
    const [newTodo, setNewTodo] = useState<TODO>({
      content : "",
      type: types[0]
    });
    
    
    const addTodo = (todo: TODO) => {
      if (todo.content.length > 0){
          setTodos([...todos, todo]);
          setNewTodo({
            content: "",
            type: "to do"
          });
      }
    };
  
    const todoList = todos.map((todo, i) => 
  (
    <div key={i} className="todo-item">
        <div>{todo.content}</div>
        <div className="todo-content">{todo.type}</div>
    </div>
  ));
    const addTodoForm = (
      <div>
        <input type="text" value={newTodo.content} onChange={(e) => setNewTodo({...newTodo,content: e.target.value}) } placeholder="Enter task"></input>
        <select value={newTodo.type} onChange={(e) => setNewTodo({...newTodo, type: e.target.value})}>
          {types.map((type, i) => <option key={i} value={type}>{type}</option>)}
        </select>
        <button onClick={() => addTodo(newTodo)}>Add TODO</button>
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
