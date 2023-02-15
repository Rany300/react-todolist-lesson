import { useState, useRef, useEffect } from "react";
import {
  Input as InputAntd,
  Button as ButtonAntd,
  Select as SelectAntd,
  Space,
  List,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import InteractiveModal from "./InteractiveModal";
import "./TodoListEdit.css";

type TODOType = {
  content: string;
  typeId: string;
}

type TODO = {
  content: string;
  todoId: string;
  type: string;
};

const TodoListEdit = () => {
  const [types, setTypes] = useState<TODOType[]>([
    { content: "To do", typeId: uuid() },
    { content: "In progress", typeId: uuid() },
    { content: "Done", typeId: uuid() },
  ]);
  const [todos, setTodos] = useState<TODO[]>([]);
  const [newTodo, setNewTodo] = useState<TODO>({
    content: "",
    todoId: uuid(),
    type: types?.[0]?.typeId || "",
  });

  const childRef = useRef<any>(null);
  const addRef = useRef<any>(null);
  const [newType, setNewType] = useState<string>("");
  const [selectedElement, setSelectedElement] = useState<any>();

  const addTodo = (todo: TODO) => {
    if (todo.content.length > 0) {
      setTodos([...todos, todo]);
      setNewTodo({
        content: "",
        todoId: uuid(),
        type: types?.[0]?.typeId,
      });
    }
  };


  const changeSelectedElement = <T extends TODOType | TODO>(element: T) => {
    setSelectedElement(element);
    console.log("selectedElement", selectedElement);
    if (childRef.current) {
      childRef.current.showModal();
  }
  };

  const addType = (typeName: string): boolean => {
    if (typeName.length > 0) {
      setTypes([...types, { content: typeName, typeId: uuid() }]);
      setNewType("");
      return true;
    }
    return false;

  };

  const removeType = (typeIndex: number): boolean => {
    if (types[typeIndex]) {
      const newTodos = todos.filter((todo) => todo.type !== types[typeIndex].typeId);
      setTodos([...newTodos]);
      // remove element from array
      types.splice(typeIndex, 1);
      setTypes([...types]);
      return true;
    }
    return false;
  };

  const removeTodo = (id: string): boolean => {
    const newTodos = todos.filter((todo) => todo.todoId !== id);
    setTodos([...newTodos]);
    return true;
  };



  const updateTodo = (index: number, todo: TODO): boolean => {
    console.log("updateTodo", todo);
    if (todos[index]) {
      todos[index] = todo;
      setTodos([...todos]);
      return true;
    }
    return false;
  };

  const updateType = (index: number, type: string): boolean => {
    
    if (types[index]) {
      types[index].content = type;
      setTypes([...types]);
      return true;
    }
    return false;
  };

  const addFrom = (
    <InteractiveModal
      ref={addRef}
      name="Add TODO or Type"
      >
        {types.length > 0 &&
      <Space>
        <h3>Add TODO</h3>
        <InputAntd
          value={newTodo.content}
          onChange={(e) => setNewTodo({ ...newTodo, content: e.target.value })}
          placeholder="Enter task"
        />

        <SelectAntd
          value={types.find((type) => type.typeId === newTodo.type)?.content} 
          onChange={(value) => setNewTodo({ ...newTodo, type: value })}>
          {types.map((type, i) => {
            return (
              <SelectAntd.Option key={i} value={type.typeId}>
                {type.content}
              </SelectAntd.Option>
            );
          })}
        </SelectAntd>
        <ButtonAntd type="primary" onClick={() => addTodo(newTodo)}>
          Add TODO
        </ButtonAntd>
      </Space>
      }
      <Space>
        <h3>Add Type</h3>
        <InputAntd
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Add new Types"
        />
        <ButtonAntd type="primary" onClick={() => addType(newType)}>
          Add Type
        </ButtonAntd>
      </Space>

    </InteractiveModal>
  );

  const todoList = (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {types.map((type, i) => {
        return (
          <div key={i} style={{ width: `${100 / types.length}%` }}>
            <List
              header={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}>
                  <h3 style={{ textAlign: "center", fontSize: "20px" }}>
                    {type.content}
                  </h3>
                  <Space>
                    <EditOutlined
                      className="hoverPointer"
                      style={{ color: "blue", fontSize: "1.6em" }}
                      onClick={() => changeSelectedElement(type)}
                    />
                    <DeleteOutlined
                      style={{ color: "red", fontSize: "1.6em" }}
                      className="hoverPointer"
                      onClick={() => removeType(i)}
                    />
                  </Space>
                </div>
              }
              bordered
              dataSource={todos.filter((todo) => todo.type === type.typeId) || []}
              renderItem={(todo, index) => (
                <List.Item key={index}>
                  <Space>{todo.content}</Space>
                  <Space>
                    <DeleteOutlined
                      className="hoverPointer"
                      style={{ color: "red" }}
                      onClick={() => removeTodo(todo.todoId)}
                    />
                    <EditOutlined
                      className="hoverPointer"
                      style={{ color: "blue" }}
                      onClick={() => changeSelectedElement({...todo, index})}
                    />
                  </Space>
                </List.Item>
              )}
            />
          </div>
        );
      })}
    </div>
  );

  const editModalContent = () => {
    // check if selected element is a todo or a type
    if (selectedElement?.typeId) {
      const index = types.findIndex((type) => type.typeId === selectedElement.typeId);
      return (
        <>
          <InputAntd value={selectedElement.content} onChange={(e) => setSelectedElement({...selectedElement, content: e.target.value})} />
          <ButtonAntd type="primary" onClick={() => { updateType (index, selectedElement.content) } } > Save </ButtonAntd>
        </>
      );
    } else if (selectedElement?.todoId) {
      const index = todos.findIndex((todo) => todo.todoId === selectedElement.todoId);
      return (
        <>
          <InputAntd value={selectedElement.content} onChange={(e) => setSelectedElement({...selectedElement, content: e.target.value})} />
          <SelectAntd
            value={types.find((type) => type.typeId === selectedElement.type)?.content}
            onChange={(value) => setSelectedElement({...selectedElement, type: value})}
          >
            {types.map((type, i) => {
              return (
                <SelectAntd.Option key={i} value={type.typeId}>
                  {type.content}
                </SelectAntd.Option>
              );
            })}
          </SelectAntd>
          <ButtonAntd type="primary" onClick={() => { updateTodo (index, selectedElement) } } > Save </ButtonAntd>
        </>
      );
    }
  };

  return (
    <div>
      <ButtonAntd type="primary" onClick={() => addRef.current?.showModal()}>
        Add TODO/Type
      </ButtonAntd>
      {addFrom}
      <br />
      {todoList}
      <br />
      <InteractiveModal name={"Edit " + selectedElement?.content} ref={childRef} >
        {editModalContent()}
      </InteractiveModal>
    </div>
  );
};

export default TodoListEdit;
