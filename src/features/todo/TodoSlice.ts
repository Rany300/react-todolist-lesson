import { createSlice } from '@reduxjs/toolkit'
import { TODO } from '../../TodoListRedux/TodoListRedux';
import { v4 as uuid } from 'uuid';



export const TodoSlice = createSlice({
    name: 'todo',
    initialState: [] as TODO[],
    reducers: {
        add: (state: TODO[], action: { payload: TODO }) => {
            state.push(action.payload);
        },
        remove: (state: TODO[], action: { payload: string }) => {
            const id = action.payload;
            return state = state.filter(item => item.todoId !== id);
        },
        update: (state: TODO[], action: { payload: TODO }) => {
            const { todoId } = action.payload;
            const index = state.findIndex((item) => item.todoId === todoId);
            state[index] = action.payload;
        }
    }
});


export const { add, remove, update } = TodoSlice.actions;
export default TodoSlice.reducer;