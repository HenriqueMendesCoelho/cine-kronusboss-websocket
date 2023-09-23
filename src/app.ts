import express from 'express';
import { logger } from './middleware/LoggerMiddleware';
import { router } from './routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(logger);

const allowedOrigins = ['*'];
const corsOpts: cors.CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOpts));

app.use(router);

export { app };
