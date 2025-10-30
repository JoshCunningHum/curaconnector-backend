type Coord = [number, number];
type MemberIdentifier = Member | number;

class Member {
    id: number;
    coord: Coord;

    constructor(config: { id: number; data: Coord }) {
        this.id = config.id;
        this.coord = config.data;
    }

    isEqual(obj: Member | number): boolean {
        const id = Member.getId(obj);
        return this.id == id;
    }

    updateLocationPoolOf({ id, coord: data }: Member) {
        WSS.broadcast(this.id, "gps:receive", id, ...data);
    }

    toString() {
        const [lat, lon] = this.coord;
        return `[${this.id}] ${lat},${lon}`;
    }

    // Helpers
    static getId(obj: MemberIdentifier) {
        if (typeof obj === "number") return obj;
        return obj.id;
    }

    static create(user: number) {
        return new Member({ id: user, data: [0, 0] });
    }
}

type SessionIdentifier = Session | [MemberIdentifier, MemberIdentifier];

class Session {
    members: [Member, Member];

    get memberIds() {
        return this.members.map((m) => m.id) as [number, number];
    }

    get(m: MemberIdentifier) {
        const id = Member.getId(m);
        return this.members.find((m) => m.isEqual(id));
    }

    constructor(p1: Member, p2: Member) {
        this.members = [p1, p2];
    }

    has(member: Member | number) {
        const id = Member.getId(member);
        return this.members.some((m) => m.id === id);
    }

    isEqual(session: SessionIdentifier) {
        if (Array.isArray(session)) return session.every(this.has);
        return this.members.every(session.has);
    }

    get id() {
        return this.memberIds.join("-");
    }

    static getId(s: SessionIdentifier) {
        if (Array.isArray(s)) return s.join("-");
        return s.id;
    }

    updateLocationPools() {
        const [p1, p2] = this.members;
        console.log(`${p1} | ${p2}`);

        p1.updateLocationPoolOf(p2);
        p2.updateLocationPoolOf(p1);
    }
}

export class LocationSharingManager {
    members: Map<number, Member> = new Map();
    sessions: Map<string, Session> = new Map();

    addSession(p1: number, p2: number) {
        // Create the members first
        const m1 =
            this.members.get(p1) ??
            this.members.set(p1, Member.create(p1)).get(p1)!;

        const m2 =
            this.members.get(p2) ??
            this.members.set(p2, Member.create(p2)).get(p2)!;

        const s = new Session(m1, m2);

        if (this.getSession([m1, m2])) {
            console.log(
                `A location sharing session is already happening between [${p1}] and [${p2}]`
            );

            return;
        }

        this.sessions.set(s.id, s);
    }

    setLocation(m: MemberIdentifier, coord: Coord) {
        // Find the member in the member map
        const mid = Member.getId(m);
        const member = this.members.get(mid);

        if (member) {
            // Update the location
            member.coord = coord;
        } else {
            console.log(`Failed to update un existing member[${mid}] location`);
        }
    }

    updateLocationPools() {
        if (!this.sessions.size) return;
        console.log(`Location sharing sessions: ${this.sessions.size}`);
        this.sessions.forEach((s) => s.updateLocationPools());
    }

    getSession(s: SessionIdentifier) {
        return this.sessions.get(Session.getId(s));
    }

    getSessions(m: MemberIdentifier) {
        return this.sessions
            .values()
            .filter((s) => s.has(m))
            .toArray();
    }

    removeSession(s: SessionIdentifier) {
        const session = this.getSession(s);
        if (!session) {
            console.log(
                `Attempted to remove unexisting location sharing session between ${Session.getId(
                    s
                )}`
            );
            return;
        }

        console.log(`Deleting session between ${session.id}`);
        const members = session.members;
        this.sessions.delete(session.id);

        // Try to remove some members if they don't have any session lefts
        members.forEach((m) => {
            const sessionsLeft = this.getSessions(m).length;
            console.log(
                `Member[${m.id}] has ${sessionsLeft || "No"} session/s left`
            );

            if (sessionsLeft > 0) return;
            this.members.delete(m.id);
        });
    }
}
