import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormData(state, action) {
            const { name, value } = action.payload;
            state[name] = value;
        },
    },
});

export const { updateFormData } = formSlice.actions;
export default formSlice.reducer;
