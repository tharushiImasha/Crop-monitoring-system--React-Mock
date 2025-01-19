import {configureStore} from "@reduxjs/toolkit";
import LoginSlice from "../reducers/LoginSlice.ts";
import formSlice from "../reducers/FormSlice.ts";
import cropSlice, {addCrop} from "../reducers/CropSlice.ts";
import fieldSlice from "../reducers/FieldSlice.ts";
import staffSlice from "../reducers/StaffSlice.ts";
import equipmentSlice from "../reducers/EquipmentSlice.ts";
import vehicleSlice from "../reducers/VehicleSlice.ts";
import logSlice from "../reducers/LogSlice.ts";
import profileSlice from "../reducers/ProfileSlice.ts";

export  const store = configureStore({
    reducer: {
        formData: formSlice,
        crop: cropSlice,
        field: fieldSlice,
        staff: staffSlice,
        equipment: equipmentSlice,
        vehicle: vehicleSlice,
        logs: logSlice,
        profile: profileSlice,
    }
})