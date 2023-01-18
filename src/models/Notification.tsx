import ResponseApi from "./ResponseApi";
class Notification {
    id?: number;
    UserId: number;
    message: string;
    seen?: boolean;
    constructor(UserId: number, message: string) {
        this.UserId = UserId;
        this.message = message;
    }
    async save(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/notification/add-notification`,
            {
                method: "POST",
                body: JSON.stringify({
                    message: this.message,
                    UserId: this.UserId,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();

        return resJson as ResponseApi;
    }
    static async fetchNotificationsByUser(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/notification/fetch-notification-by-user`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();
        if (resJson.ok) {
            return {
                notifications: resJson.notifications as Notification[],
                ok: "true",
            };
        }
        return resJson as ResponseApi;
    }
    static async fetchUnseenNotificationsByUser(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/notification/fetch-unseen-notification-by-user`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();
        if (resJson.ok) {
            return {
                notifications: resJson.notifications as Notification[],
                ok: "true",
            };
        }
        return resJson as ResponseApi;
    }
    static async markNotificationsAsSeen(token: string) {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/notification/mark-notifications-as-seen`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const resJson = await response.json();

        return resJson as ResponseApi;
    }
}

export default Notification;
