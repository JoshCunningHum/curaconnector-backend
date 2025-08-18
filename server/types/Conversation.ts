export interface Conversation {
    other: {
        id: number;
        firstname: string;
        lastname: string;
        profilePicture: string;
    };
    lastMessage: string;
    lastMessageSent: string; // ISO
    seen: boolean;
}
