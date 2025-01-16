import { createSlice } from '@reduxjs/toolkit';
import {Crop} from "../models/Crop.ts";

const initialState : Crop[] = [];

const cropSlice = createSlice({
    name: 'crop',
    initialState,
    reducers: {
        addCrop(state, action) {
            state.push(action.payload);
        },
        updateCrop: (state, action) => {
            const index = state.findIndex(crop => crop.crop_code === action.payload.crop_code);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteCrop: (state, action) => {
            const index = state.findIndex(crop => crop.crop_code === action.payload.crop_code);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const { addCrop, updateCrop, deleteCrop } = cropSlice.actions;
export default cropSlice.reducer;
