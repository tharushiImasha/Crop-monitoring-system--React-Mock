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
        updateField: (state, action) => {
            const index = state.findIndex(field => field.fieldCode === action.payload.fieldCode);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteField: (state, action) => {
            const index = state.findIndex(field => field.fieldCode === action.payload.fieldCode);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const { addField, updateField, deleteField } = filedSlice.actions;
export default filedSlice.reducer;
