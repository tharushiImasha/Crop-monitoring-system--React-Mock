import {configureStore} from "@reduxjs/toolkit";
import LoginSlice from "../reducers/LoginSlice.ts";
import formSlice from "../reducers/FormSlice.ts";

export  const store = configureStore({
    reducer: {
        formData: formSlice
        // login: LoginSlice(),
    }
})