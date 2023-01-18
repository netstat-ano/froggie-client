import { createSlice, ThunkAction } from "@reduxjs/toolkit";
import openSocket from "socket.io-client";
const authentication = createSlice({
    name: "authentication",
    initialState: { token: "", userId: "", type: "" },
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.type = action.payload.type;
            return state;
        },
        logout(state) {
            state.token = "";
            state.userId = "";
            state.type = "";
            return state;
        },
    },
});

export default authentication;
export const authenticationActions = authentication.actions;
