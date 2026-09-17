import z from "zod";

export const createRoomSchema = z.object({
    name: z.string().min(3).max(16),
    hostId: z.uuid(),
    maxPlayerCount: z.number().min(4).max(12),
});

export type Room = z.infer<typeof createRoomSchema> & {
    roomId: string;
    playerCount: number;
    players: string[];
};
