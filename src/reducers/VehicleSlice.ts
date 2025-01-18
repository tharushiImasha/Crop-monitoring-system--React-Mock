import { createSlice } from '@reduxjs/toolkit';
import {Vehicle} from "../models/Vehicle.ts";

const initialState : Vehicle[] = [];

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        addVehicle(state, action) {
            state.push(action.payload);
        },
        updateVehicle: (state, action) => {
            const index = state.findIndex(vehicle => vehicle.vehicle_code === action.payload.vehicle_code);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteVehicle: (state, action) => {
            const index = state.findIndex(vehicle => vehicle.vehicle_code === action.payload.vehicle_code);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
});

export const { addVehicle, updateVehicle, deleteVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
