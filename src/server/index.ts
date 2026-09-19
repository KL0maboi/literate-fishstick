import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { roomsRoute } from './routes/rooms';
import { serveStatic } from 'hono/bun';

const app = new Hono();

app.use('*', logger());

app.route('/api/rooms', roomsRoute);

app.get('*', serveStatic({ root: './src/client/dist' }));
app.get('*', serveStatic({ path: './src/client/dist/index.html' }));

Bun.serve({ fetch: app.fetch });

console.log('Server Started ');
