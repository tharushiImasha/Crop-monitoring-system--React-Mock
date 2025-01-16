import { createSlice } from '@reduxjs/toolkit';
import {Field} from "../models/Field.ts";

const initialState : Field[] = [];

const filedSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        addField(state, action) {
            state.push(action.payload);
        },
    },
});

export const { addField } = filedSlice.actions;
export default filedSlice.reducer;
