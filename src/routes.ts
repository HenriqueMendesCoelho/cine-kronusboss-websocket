import Router from 'express';
import { io } from './server';

const router = Router();
const basePathV1 = '/api/v1';

router.get(`${basePathV1}/hello`, (request, response) => {
  return response.json({ message: 'Hello, World!' });
});

router.post(`${basePathV1}/hello`, (request, response) => {
  const { emit } = request.body;
  io.emit('hello', `${emit}`);

  return response.json({ message: 'hello room emited' });
});

export { router };