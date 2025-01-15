// import {createSlice} from "@reduxjs/toolkit";
// import {LoginDetails} from "../models/LoginDetails.ts";
//
// export const initialState : LoginDetails[] = [];
//
// const loginSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         checkUser: (state, action) => {
//             const { email, password } = action.payload;
//             const user = state.find((user) => user.email === email && user.email === password);
//             if (user) {
//                 console.log(user);
//                 return user;
//             }
//         }
//     }
// })
//
// export const {checkUser} = loginSlice.actions;
// export default loginSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { email: "test@example.com", password: "password123" }, // Example user
];

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        checkUser: (state, action) => {
            const { email, password } = action.payload;
            return state.find((user) => user.email === email && user.password === password) || null;
        },
    },
});

export const { checkUser } = loginSlice.actions;
export default loginSlice.reducer;
