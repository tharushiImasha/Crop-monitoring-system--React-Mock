import { createSlice } from '@reduxjs/toolkit';
import {Log} from "../models/Log.ts";

const initialState : Log[] = [];

const logSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {
        addLog(state, action) {
            state.push(action.payload);
        },
        updateLog: (state, action) => {
            const index = state.findIndex(log => log.log_code === action.payload.log_code);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteLog: (state, action) => {
            const index = state.findIndex(log => log.log_code === action.payload.log_code);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const { addLog, updateLog, deleteLog } = logSlice.actions;
export default logSlice.reducer;
