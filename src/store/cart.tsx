import { createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { AnyAction } from "redux";
import CartItem from "../models/CartItem";
const cart = createSlice({
    name: "cart",
    initialState: [] as CartItem[],
    reducers: {
        addToCart(state, action) {
            const findedProduct = state.find(
                (product) => product.id === action.payload.id
            );
            if (!findedProduct) {
                state.push(action.payload);
            } else {
                findedProduct.amount += 1;
                state = [...state, findedProduct];
            }
        },
        removeFromCart(state, action) {
            state.filter((item) => item.id !== action.payload);
            return state;
        },
    },
});

export default cart;
export const cartActions = cart.actions;
