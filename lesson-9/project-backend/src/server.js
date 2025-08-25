import express from 'express';
import cors from 'cors';

import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import authRouter from './routers/authRouter.js';
import moviesRouter from './routers/moviesRouter.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  // app.use(logger);

  app.use("/auth", authRouter);
  app.use("/movies", moviesRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, ()=> console.log(`Server running on ${port} port`));
};
