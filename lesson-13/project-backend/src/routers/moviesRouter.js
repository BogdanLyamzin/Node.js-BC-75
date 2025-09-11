import { Router } from 'express';

import {
  getMoviesController,
  getMovieByIdController,
  addMovieController,
  upsertMovieController,
  patchMovieByIdController,
  deleteMovieByIdController,
} from '../controllers/moviesControllers.js';

import {
  movieAddSchema,
  movieUpdateSchema,
} from '../validation/movieSchemas.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

const moviesRouter = Router();

moviesRouter.use(authenticate);

moviesRouter.get('/', getMoviesController);

moviesRouter.get('/:id', isValidId, getMovieByIdController);

// upload.fields([
//   {
//     name: 'poster',
//     maxCount: 1,
//   },
//   {
//     name: 'subposter',
//     maxCount: 2,
//   },
// ]);
// upload.array('poster', 8);
moviesRouter.post(
  '/',
  upload.single('poster'),
  validateBody(movieAddSchema),
  addMovieController,
);

moviesRouter.put(
  '/:id',
  isValidId,
  validateBody(movieAddSchema),
  upsertMovieController,
);

moviesRouter.patch(
  '/:id',
  isValidId,
  validateBody(movieUpdateSchema),
  patchMovieByIdController,
);

moviesRouter.delete('/:id', isValidId, deleteMovieByIdController);

export default moviesRouter;
