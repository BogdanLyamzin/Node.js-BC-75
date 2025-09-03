import createHttpError from 'http-errors';

import {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} from '../services/moviesServices.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseMovieFilters } from '../utils/filters/parseMovieFilters.js';

import { movieSortFields } from '../db/models/Movie.js';

export const getMoviesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, movieSortFields);
  const filters = parseMovieFilters(req.query);
  const { _id: userId } = req.user;

  const data = await getMovies({ page, perPage, sortBy, sortOrder, filters: {...filters, userId} });

  res.json({
    status: 200,
    message: 'Successfully find movies',
    data,
  });
};

export const getMovieByIdController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const data = await getMovie({_id, userId});

  if (!data) {
    throw createHttpError(404, `Movie with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully find movie with id=${_id}`,
    data,
  });
};

export const addMovieController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await addMovie({ ...req.body, userId }, req.file);

  res.status(201).json({
    status: 201,
    message: 'Succesfully add movie',
    data,
  });
};

export const upsertMovieController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await updateMovie({_id, userId}, {...req.body, userId}, { upsert: true });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upsert movie with id=${_id}`,
    data,
  });
};

export const patchMovieByIdController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const result = await updateMovie({_id, userId}, req.body);

  if (!result) {
    throw createHttpError(404, `Movie with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully update movie with id=${_id}`,
    data: result.data,
  });
};

export const deleteMovieByIdController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteMovie({_id, userId});

  if (!data) {
    throw createHttpError(404, `Movie with id=${_id} not found`);
  }

  res.status(204).send();
};
