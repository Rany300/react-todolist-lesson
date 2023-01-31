import { useState } from "react";
import {
  Input as InputAntd,
  Button as ButtonAntd,
  Select as SelectAntd,
  Space,
  List,
} from "antd";

const types: string[] = ["to do", "in progress", "done"];

type TODO = {
  content: string;
  type: typeof types[number];
};

const TodoListWithDesign = () => {
  const [typesState, setTypesState] = useState(types);

  const [todos, setTodos] = useState<TODO[]>([]);
  const [newTodo, setNewTodo] = useState<TODO>({
    content: "",
    type: types[0],
  });

  const [newType, setNewType] = useState<string>("");

  const addTodo = (todo: TODO) => {
    if (todo.content.length > 0) {
      setTodos([...todos, todo]);
      setNewTodo({
        content: "",
        type: "to do",
      });
    }
  };

  const addType = (typeName: string): boolean => {
    if (types.includes(typeName) || typeName.length < 1) {
      return false;
    }
    types.push(typeName);
    setTypesState([...types]);
    return true;
  };

  const removeTodo = (index: number): boolean => {
    if (todos[index]) {
      // remove element from array
      todos.splice(index, 1);
      setTodos([...todos]);
      return true;
    }
    return false;
  };

  const updateTodo = (index: number, todo: TODO): boolean => {
    if (todos[index]) {
      todos[index] = todo;
      setTodos([...todos]);
      return true;
    }
    return false;
  };

  const addTodoForm = (
    <Space>
      <InputAntd
        value={newTodo.content}
        onChange={(e) => setNewTodo({ ...newTodo, content: e.target.value })}
        placeholder="Enter task"
      />
      <SelectAntd
        value={newTodo.type}
        onChange={(e) => setNewTodo({ ...newTodo, type: e })}>
        {typesState.map((type, i) => (
          <SelectAntd.Option key={i} value={type}>
            {type}
          </SelectAntd.Option>
        ))}
      </SelectAntd>
      <ButtonAntd type="primary" onClick={() => addTodo(newTodo)}>
        Add TODO
      </ButtonAntd>
    </Space>
  );

  const addTypesTodo = (
    <Space>
      <InputAntd
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
        placeholder="Add new Types"
      />
      <ButtonAntd type="primary" onClick={() => addType(newType)}>
        Add Type
      </ButtonAntd>
    </Space>
  );

  const todoList = (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {typesState.map((type, i) => {
        return (
          <div key={i} style={{ width: `${100 / typesState.length}%` }}>
            <List
              header={
                <h3 style={{ textAlign: "center", fontSize: "20px" }}>
                  {type}
                </h3>
              }
              bordered
              dataSource={todos.filter((todo) => todo.type === type)}
              renderItem={(todo, index) => (
                <List.Item key={index}>
                  <Space>{todo.content}</Space>
                </List.Item>
              )}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      {addTodoForm}
      <br />
      {addTypesTodo}
      <br />
      {todoList}
    </div>
  );
};

export default TodoListWithDesign;
