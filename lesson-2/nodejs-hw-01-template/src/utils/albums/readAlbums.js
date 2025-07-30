import fs from 'node:fs/promises';
import detect from 'detect-file-encoding-and-language';

import { ALBUMS_DB_PATH } from '../../constants/albums.js';

export const readAlbums = async () => {
  // const {encoding} = await detect(ALBUMS_DB_PATH);
  const data = await fs.readFile(ALBUMS_DB_PATH, 'utf-8');
  return JSON.parse(data);
};
