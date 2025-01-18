import { createSlice } from '@reduxjs/toolkit';
import {Staff} from "../models/Staff.ts";

const initialState : Staff[] = [];

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        addStaff(state, action) {
            state.push(action.payload);
        },
        updateStaff: (state, action) => {
            const index = state.findIndex(staff => staff.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteStaff: (state, action) => {
            const index = state.findIndex(staff => staff.id === action.payload.id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const { addStaff, updateStaff, deleteStaff } = staffSlice.actions;
export default staffSlice.reducer;
