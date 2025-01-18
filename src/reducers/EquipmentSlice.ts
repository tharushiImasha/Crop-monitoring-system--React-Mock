import { createSlice } from '@reduxjs/toolkit';
import {Equipment} from "../models/Equipment.ts";

const initialState : Equipment[] = [];

const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {
        addEquipment(state, action) {
            state.push(action.payload);
        },
        updateEquipment: (state, action) => {
            const index = state.findIndex(equipment => equipment.equipment_id === action.payload.equipment_id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteEquipment: (state, action) => {
            const index = state.findIndex(equipment => equipment.equipment_id === action.payload.equipment_id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const { addEquipment, updateEquipment, deleteEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;
