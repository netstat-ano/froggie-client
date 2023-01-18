import { createSlice } from "@reduxjs/toolkit";
import Notification from "../models/Notification";
interface InitPayload {
    payload: Notification[];
}
const notifications = createSlice({
    name: "notifications",
    initialState: {
        items: [] as Notification[],
    },
    reducers: {
        init(state, action: InitPayload) {
            state.items = action.payload;
        },
        reset(state) {
            state.items = [];
        },
        markAllAsSeen(state) {
            state.items.forEach((value, index) => {
                if (value.seen === false) {
                    state.items[index].seen = true;
                }
            });
        },
        push(state, action: { payload: Notification }) {
            state.items.push(action.payload);
        },
    },
});
export const notificationsActions = notifications.actions;
export default notifications;
