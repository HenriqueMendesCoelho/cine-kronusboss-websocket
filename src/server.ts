import { Server } from 'socket.io';
import { app } from './app';
import { validateStart } from './startup';
import { AppDataSource } from './data-source';
import { socketIoMiddleware } from './middleware/SocketIoMiddleware';

process.env.TZ = 'America/Sao_Paulo';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' });
}

//Start Socket.io
const PORT_SOCKET_IO = 3334;
const io = new Server({
  path: '/ws',
  cors: {
    origin: '*',
  },
});
io.listen(PORT_SOCKET_IO);
console.log(
  `Socket.io started at http://localhost:${PORT_SOCKET_IO} -> ${new Date().toLocaleString(
    'pt-Br'
  )}`
);
io.of(/^\/movie\/.+$/)
  .on('connection', (socket) => {
    console.log('user connected to -> ' + socket.nsp?.name);
  })
  .on('disconnect', (socket) => {
    console.log('user disconnect -> ' + socket.nsp?.name);
  })
  .use(socketIoMiddleware);

//Start Express
const PORT = 3333;
app.listen(PORT, () =>
  console.log(
    `Express started at http://localhost:${PORT} -> ${new Date().toLocaleString(
      'pt-Br'
    )}`
  )
);

//Start Data Source typeORM
AppDataSource.initialize()
  .then(async () => {
    await validateStart();
  })
  .catch((error) => console.log(error));

export { io };
