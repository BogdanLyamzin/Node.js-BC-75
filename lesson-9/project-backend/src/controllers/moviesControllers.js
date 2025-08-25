import createHttpError from 'http-errors';

import { getMovies, getMovieById, addMovie, updateMovieById, deleteMovieById } from '../services/moviesServices.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseMovieFilters } from '../utils/filters/parseMovieFilters.js';

import { movieSortFields } from '../db/models/Movie.js';

export const getMoviesController = async (req, res) => {
  const {page, perPage} = parsePaginationParams(req.query);
  const {sortBy, sortOrder} = parseSortParams(req.query, movieSortFields);
  const filters = parseMovieFilters(req.query);

  const data = await getMovies({page, perPage, sortBy, sortOrder, filters});

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
  }

  res.json({
    status: 200,
    message: `Successfully find movie with id=${id}`,
    data,
  });
};

export const addMovieController = async(req, res)=> {
   const data = await addMovie(req.body);

  res.status(201).json({
    status: 201,
    message: "Succesfully add movie",
    data,
  });
};

export const upsertMovieController = async(req, res)=> {
  const {id} = req.params;
  const {isNew, data} = await updateMovieById(id, req.body, {upsert: true});

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upsert movie with id=${id}`,
    data,
  });
};

export const patchMovieByIdController = async(req, res)=> {
  const {id} = req.params;
  const result = await updateMovieById(id, req.body);

  if (!result) {
    throw createHttpError(404, `Movie with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully update movie with id=${id}`,
    data: result.data,
  });
};

export const deleteMovieByIdController = async(req, res)=> {
  const {id} = req.params;
  const data = await deleteMovieById(id);

  if (!data) {
    throw createHttpError(404, `Movie with id=${id} not found`);
  }

  res.status(204).send();
};