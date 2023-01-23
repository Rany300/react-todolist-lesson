import React, { useState } from 'react';

const types: string[] = ["to do", "in progress", "done"];

type TODO = {
    content: string;
    type: typeof types[number];
    isEdited?: boolean;
}


const TodoListEdit = () => {
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

    const removeTodo = (index: number):boolean => {
      // if array element exists
      if (todos[index]) {
        // remove element from array
        todos.splice(index, 1);
        setTodos([...todos]);
        return true;
      }
      return false;
    }

    const updateTodo = (index: number, todo: TODO):boolean => {
      if (todos[index]) {
        todos[index] = todo;
        setTodos([...todos]);
        return true;
      }
      return false;
    }

  
    const todoList = todos.map((todo, i) => 
    (
      <div key={i} style={{display: "flex", gap: "10px" }} >
          {!todo.isEdited ? (
            <div>

          <div>{todo.content}</div>
          <div style={{fontWeight: "bold"}}>{todo.type}</div>
          </div>
          ) : (
            <div>
          <input type="text" value={todo.content} onChange={(e) => updateTodo(i, {...todo, content: e.target.value}) } placeholder="Enter task"></input>
          <select value={todo.type} onChange={(e) => updateTodo(i, {...todo, type: e.target.value})}>
            {types.map((type, i) => <option key={i} value={type}>{type}</option>)}
          </select>
          </div>
          )}
          
          <button onClick={() => removeTodo(i)}>Remove</button>
          <button onClick={() => updateTodo(i, {...todo, isEdited: !todo.isEdited})}>{todo.isEdited ? "Done" : "Edit"}</button>
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

export default TodoListEdit;
