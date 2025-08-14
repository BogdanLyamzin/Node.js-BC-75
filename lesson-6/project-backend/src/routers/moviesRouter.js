import { Router } from 'express';

import {
  getMoviesController,
  getMovieByIdController,
  addMovieController,
  upsertMovieController,
  patchMovieByIdController,
  deleteMovieByIdController,
} from '../controllers/moviesControllers.js';

const moviesRouter = Router();

moviesRouter.get('/', getMoviesController);

moviesRouter.get('/:id', getMovieByIdController);

moviesRouter.post('/', addMovieController);

moviesRouter.put("/:id", upsertMovieController);

moviesRouter.patch("/:id", patchMovieByIdController);

moviesRouter.delete("/:id", deleteMovieByIdController);

export default moviesRouter;
