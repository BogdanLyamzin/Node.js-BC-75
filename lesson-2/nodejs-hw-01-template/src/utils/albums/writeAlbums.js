import fs from 'node:fs/promises';

import { ALBUMS_DB_PATH } from '../../constants/albums.js';

export const writeAlbums = (albums) =>
  fs.writeFile(ALBUMS_DB_PATH, JSON.stringify(albums, null, 2));
