import { createSlice, ThunkAction } from "@reduxjs/toolkit";
import CartItem from "../models/CartItem";
const cart = createSlice({
    name: "cart",
    initialState: { items: [] as CartItem[], totalPrice: 0 as number },
    reducers: {
        addToCart(state, action) {
            const findedProduct = state.items.find(
                (product) => product.id === action.payload.id
            );
            if (!findedProduct) {
                state.items.push(action.payload);
                state.totalPrice += action.payload.price;
            } else {
                findedProduct.amount += 1;
                state.totalPrice += findedProduct.price;
                const index = state.items.findIndex(
                    (item) => item.id === findedProduct.id
                );
                state.items[index] = findedProduct;
            }
        },
        reduce(state, action) {
            const findedProduct = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (findedProduct) {
                findedProduct.amount -= action.payload.quantity;
                if (findedProduct.amount === 0) {
                    state.items = state.items.filter(
                        (item) => item.id !== action.payload.id
                    );
                } else {
                    const index = state.items.findIndex(
                        (item) => item.id === action.payload.id
                    );
                    state.items[index] = findedProduct;
                }
                state.totalPrice -=
                    action.payload.quantity * findedProduct.price;
            }
        },
        init(state, action) {
            if (state.items.length === 0) {
                state.items = action.payload;
                state.items.forEach((item) => {
                    state.totalPrice += item.amount * item.price;
                });
            }
        },
        reset(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export default cart;
export const cartActions = cart.actions;
