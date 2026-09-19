import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { roomsRoute } from './routes/rooms';

const app = new Hono();

app.use('*', logger());

app.route('/api/rooms', roomsRoute);

app.get('/', (c) => {
    return c.text('Hello There!');
});

Bun.serve({ fetch: app.fetch });

console.log('Server Started ');
