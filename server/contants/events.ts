import { Message } from "~~/schema/message";
import { Notification } from "~~/schema/notification";

export interface WSEmitEvents {
    "init:reply": [message: string];

    "message:reply": [msg: Message];
    "message:roster-reply": [msg: Message];

    "gps:receive": [user: number, lat: number, lon: number];
    "gps:end": [from: number];

    "notif:message": [notification: Notification];
    "notif:visit-session": [notification: Notification];
    "notif:visit-session-invite": [
        from: string,
        vsid: number,
        checklist: string[]
    ];
    "notif:visit-session-accept": [vsid: number];
    "notif:visit-session-end": [vsid: number];
}
