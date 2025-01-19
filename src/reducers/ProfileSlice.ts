import {createSlice} from "@reduxjs/toolkit";
import {User} from "../models/User.ts";

const initialState : User[] = [];

const profileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action) {
            state.push(action.payload);
        },
        updateUser: (state, action) => {
            const index = state.findIndex(user => user.email === action.payload.email);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteUser: (state, action) => {
            const index = state.findIndex(user => user.email === action.payload.email);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const { addUser, updateUser, deleteUser } = profileSlice.actions;
export default profileSlice.reducer;