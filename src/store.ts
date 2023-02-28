import { configureStore } from '@reduxjs/toolkit'
import typeReducer from "./features/type/TypeSlice";
import todoReducer from "./features/todo/TodoSlice";

export default configureStore({
  reducer: {
    type: typeReducer,
    todo: todoReducer,
  },
})