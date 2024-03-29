import { createSlice, ThunkAction } from "@reduxjs/toolkit";
import CartItem from "../models/CartItem";
const cart = createSlice({
    name: "cart",
    initialState: {
        items: [] as CartItem[],
        totalPrice: 0 as number,
        totalProducts: 0 as number,
    },
    reducers: {
        addToCart(state, action) {
            const findedProduct = state.items.find(
                (product) => product.id === action.payload.id
            );
            if (!findedProduct) {
                state.items.push(action.payload);
                state.totalProducts += action.payload.amount;
                state.totalPrice += action.payload.price;
            } else {
                state.totalProducts += 1;
                findedProduct.amount += 1;
                state.totalPrice += findedProduct.price;
                const index = state.items.findIndex(
                    (item) => item.id === findedProduct.id
                );
                state.items[index] = findedProduct;
            }
            state.totalPrice = Number(state.totalPrice.toFixed(2));
        },
        reduce(state, action) {
            const findedProduct = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (findedProduct) {
                findedProduct.amount -= action.payload.quantity;
                state.totalProducts -= action.payload.quantity;
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
                state.totalPrice = Number(state.totalPrice.toFixed(2));
            }
        },
        init(state, action) {
            if (state.items.length === 0) {
                state.items = action.payload;
                state.items.forEach((item) => {
                    state.totalPrice += item.amount * item.price;
                    state.totalProducts += item.amount;
                });
                state.totalPrice = Number(state.totalPrice.toFixed(2));
            }
        },
        reset(state) {
            state.items = [];
            state.totalPrice = 0;
            state.totalProducts = 0;
        },
    },
});

export default cart;
export const cartActions = cart.actions;
