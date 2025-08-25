import MovieCollection from '../db/models/Movie.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getMovies = async ({
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder = 'asc',
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const query = MovieCollection.find();

  if (filters.type) {
    query.where('type').equals(filters.type);
  }

  if (filters.minReleaseYear) {
    query.where('releaseYear').gte(filters.minReleaseYear);
  }

  if (filters.maxReleaseYear) {
    query.where('releaseYear').lte(filters.maxReleaseYear);
  }

  const total = await MovieCollection.find().merge(query).countDocuments();

  const movies = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData({ page, perPage, total });

  return {
    movies,
    total,
    ...paginationData,
  };
};

export const getMovieById = (id) => MovieCollection.findById(id);

export const addMovie = (payload) => MovieCollection.create(payload);

export const updateMovieById = async (_id, payload, options = {}) => {
  const result = await MovieCollection.findOneAndUpdate({ _id }, payload, {
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};

export const deleteMovieById = (id) => MovieCollection.findByIdAndDelete(id);
