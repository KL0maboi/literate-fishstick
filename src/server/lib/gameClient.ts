import EventEmitter from "events";
import { createRoomSchema, type Room } from "#/common/lib/schema";
import z from "zod";

type GameEvents = {
    test: [test: number];
};

interface GameClient {
    on<E extends keyof GameEvents>(
        eventName: E,
        listener: (...args: GameEvents[E]) => void,
    ): this;
    on(eventName: string | symbol, listener: (...args: any[]) => void): this;

    once<E extends keyof GameEvents>(
        eventName: E,
        listener: (...args: GameEvents[E]) => void,
    ): this;
    once(eventName: string | symbol, listener: (...args: any[]) => void): this;

    off<E extends keyof GameEvents>(
        eventName: E,
        listener: (...args: GameEvents[E]) => void,
    ): this;
    off(eventName: string | symbol, listener: (...args: any[]) => void): this;

    removeListener<E extends keyof GameEvents>(
        eventName: E,
        listener: (...args: GameEvents[E]) => void,
    ): this;
    removeListener(
        eventName: string | symbol,
        listener: (...args: any[]) => void,
    ): this;

    addListener<E extends keyof GameEvents>(
        eventName: E,
        listener: (...args: GameEvents[E]) => void,
    ): this;
    addListener(
        eventName: string | symbol,
        listener: (...args: any[]) => void,
    ): this;
}

class GameClient extends EventEmitter<GameEvents> {
    readonly rooms: Map<string, Room> = new Map();
    constructor() {
        super();
    }

    createRoom(roomMetaData: z.infer<typeof createRoomSchema>) {
        const { success, data, error } =
            createRoomSchema.safeParse(roomMetaData);

        if (!success) throw error;

        const room: Room = {
            roomId: crypto.randomUUID(),
            players: [data.hostId],
            get playerCount() {
                return this.players.length;
            },
            ...data,
        };

        this.rooms.set(room.roomId, room);

        return room;
    }
}

export const client = new GameClient();
