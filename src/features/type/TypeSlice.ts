import { createSlice } from '@reduxjs/toolkit'
import { TODOType } from '../../TodoListRedux/TodoListRedux';
import { v4 as uuid } from 'uuid';

export const TypeSlice = createSlice({
    name: 'type',
    initialState: [
        { content: "To do", typeId: uuid() },
        { content: "In progress", typeId: uuid() },
        { content: "Done", typeId: uuid() },
    ] ,
    reducers: {
        add: (state: TODOType[], action: { payload: string }) => {
            state.push({ content: action.payload, typeId: uuid() });
        },
        remove: (state: TODOType[], action: { payload: string }) => {
            console.log("remove type")
            console.log({state});
            const id = action.payload;
            return state = state.filter(item => item.typeId !== id);
        },
        update: (state: TODOType[], action: { payload: { typeId: string, content: string } }) => {
            const { typeId } = action.payload;
            const index = state.findIndex(item => item.typeId === typeId);
            state[index].content = action.payload.content;
        }
    }
});

export const { add, remove, update } = TypeSlice.actions;
export default TypeSlice.reducer;