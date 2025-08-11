import { Router } from 'express';

import { getMoviesController, getMovieByIdController } from '../controllers/moviesControllers.js';

const moviesRouter = Router();

moviesRouter.get('/', getMoviesController);

moviesRouter.get('/:id', getMovieByIdController);

export default moviesRouter;
