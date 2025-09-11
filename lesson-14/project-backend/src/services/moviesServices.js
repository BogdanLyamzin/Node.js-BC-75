import MovieCollection from '../db/models/Movie.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';
import { getEnvVar } from '../utils/getEnvVar.js';

import { saveFileToPublicDir } from '../utils/saveFileToPublicDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudnary.js';

const enableCloudinary = getEnvVar("ENABLE_CLOUDINARY") === "true";

export const getMovies = async ({
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder = 'asc',
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const query = MovieCollection.find();

  if (filters.userId) {
    query.where('userId').equals(filters.userId);
  }

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

export const getMovie = query => MovieCollection.findOne(query);

export const addMovie = async (payload, file) => {
  let poster = null;
  if(file) {
    if(enableCloudinary) {
      poster = await saveFileToCloudinary(file);
    }
    else {
      poster = await saveFileToPublicDir(file);
    }
  }
  return MovieCollection.create({...payload, poster});
};

export const updateMovie = async (query, payload, options = {}) => {
  const result = await MovieCollection.findOneAndUpdate(query, payload, {
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

export const deleteMovie = query => MovieCollection.findOneAndDelete(query);
