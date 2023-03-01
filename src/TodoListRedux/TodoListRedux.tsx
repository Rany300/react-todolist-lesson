import { useState, useRef, useEffect } from "react";
import {
  Input as InputAntd,
  Button as ButtonAntd,
  Select as SelectAntd,
  Space,
  List,
} from "antd";
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { add as addTodo, remove as removeTodo, update as updateTodo } from "../features/todo/TodoSlice";
import { add as addType, remove as removeType, update as updateType } from "../features/type/TypeSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import InteractiveModal from "./InteractiveModal";
import "./TodoListRedux.css";

export type TODOType = {
  content: string;
  typeId: string;
}

export type TODO = {
  content: string;
  todoId: string;
  type: string;
};

const TodoListRedux = () => {

  const types = useSelector((state: {type: TODOType[]}) => state.type)
  const todos = useSelector((state: {todo: TODO[]}) => state.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("types", types)
  }, [types])


  const childRef = useRef<any>(null);
  const addRef = useRef<any>(null);


  const [newType, setNewType] = useState<string>("");
  const [newTodo, setNewTodo] = useState<TODO>({
    content: "",
    todoId: uuid(),
    type: types?.[0]?.typeId || "",
  });
  const [selectedElement, setSelectedElement] = useState<any>();

  const changeSelectedElement = <T extends TODOType | TODO>(element: T) => {
    setSelectedElement(element);
    console.log("selectedElement", selectedElement);
    if (childRef.current) {
      childRef.current.showModal();
  }
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
        <ButtonAntd type="primary" onClick={() => {
          dispatch(addTodo({
            content: newTodo.content,
            todoId: uuid(),
            type: newTodo.type
          }))
          setNewTodo({
            content: "",
            todoId: uuid(),
            type: types?.[0]?.typeId || "",
          })
        }}>
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
        <ButtonAntd type="primary" onClick={() => dispatch(addType(newType))}>
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
                      onClick={() => dispatch(removeType(type.typeId))}
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
                      onClick={() => dispatch(removeTodo(todo.todoId))}
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
          <ButtonAntd type="primary" onClick={() => dispatch(updateType ( selectedElement) ) } > Save </ButtonAntd>
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
          <ButtonAntd type="primary" onClick={() => { dispatch(updateTodo (selectedElement)) } } > Save </ButtonAntd>
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

export default TodoListRedux;
