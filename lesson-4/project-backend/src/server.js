import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import MovieCollection from './db/models/Movie.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/movies', async (req, res) => {
    const data = await MovieCollection.find();

    res.json({
      status: 200,
      message: "Successfully find movies",
      data,
    });
  });

  app.get("/movies/:id", async(req, res)=> {
    const {id} = req.params;
    const data = await MovieCollection.findById(id);

    if(!data) {
      return res.status(404).json({
        status: 404,
        message: `Movie with id=${id} not found`
      });
    }

    res.json({
      status: 200,
      message: `Successfully find movie with id=${id}`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, ()=> console.log(`Server running on ${port} port`));
};
