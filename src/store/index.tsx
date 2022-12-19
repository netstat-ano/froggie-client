import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authentication";
import cart from "./cart";
const store = configureStore({
    reducer: {
        authentication: authentication.reducer,
        cart: cart.reducer,
    },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
