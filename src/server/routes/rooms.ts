import { Hono } from 'hono';
import { client } from '../lib/gameClient';
import { sValidator } from '@hono/standard-validator';
import { createRoomSchema } from '@/common/lib/schema';

export const roomsRoute = new Hono()
    .get('/', (c) => {
        if (!client.rooms.size) return c.json([]);

        return c.json(
            client.rooms
                .values()
                .map(({ roomId, name, playerCount, maxPlayerCount }) => ({
                    roomId,
                    name,
                    playerCount,
                    maxPlayerCount,
                }))
                .toArray(),
        );
    })
    .post('/', sValidator('json', createRoomSchema), async (c) => {
        const data = c.req.valid('json');

        const room = client.createRoom(data);

        return c.json(room, 201);
    });
