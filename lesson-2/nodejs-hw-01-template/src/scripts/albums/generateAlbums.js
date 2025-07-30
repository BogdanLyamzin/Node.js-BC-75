import { createFakeAlbum } from '../../utils/albums/createFakeAlbum.js';
import { readAlbums } from '../../utils/albums/readAlbums.js';
import { writeAlbums } from '../../utils/albums/writeAlbums.js';

export const generateAlbums = async (number) => {
  const prevAlbums = await readAlbums();
  const albums = Array(number).fill(0).map(createFakeAlbum);
  await writeAlbums([...prevAlbums, ...albums]);
};

generateAlbums(5);
