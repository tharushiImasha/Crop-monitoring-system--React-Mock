import {configureStore} from "@reduxjs/toolkit";
import LoginSlice from "../reducers/LoginSlice.ts";
import formSlice from "../reducers/FormSlice.ts";
import cropSlice, {addCrop} from "../reducers/CropSlice.ts";
import fieldSlice from "../reducers/FieldSlice.ts";

export  const store = configureStore({
    reducer: {
        formData: formSlice,
        crop: cropSlice,
        field: fieldSlice,
        // login: LoginSlice(),
    }
})