import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authentication";
import cart from "./cart";
import notifications from "./notification";
const store = configureStore({
    reducer: {
        authentication: authentication.reducer,
        cart: cart.reducer,
        notifications: notifications.reducer,
    },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
