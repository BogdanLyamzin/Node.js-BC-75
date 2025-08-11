import createHttpError from 'http-errors';

import { getMovies, getMovieById } from '../services/moviesServices.js';

export const getMoviesController = async (req, res) => {
  const data = await getMovies();

  res.json({
    status: 200,
    message: 'Successfully find movies',
    data,
  });
};

export const getMovieByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getMovieById(id);

  if (!data) {
    throw createHttpError(404, `Movie with id=${id} not found`);
    // const error = new Error(`Movie with id=${id} not found`);
    // error.status = 404;
    // throw error;
    // return res.status(404).json({
    //   status: 404,
    //   message: `Movie with id=${id} not found`,
    // });
  }

  res.json({
    status: 200,
    message: `Successfully find movie with id=${id}`,
    data,
  });
};
