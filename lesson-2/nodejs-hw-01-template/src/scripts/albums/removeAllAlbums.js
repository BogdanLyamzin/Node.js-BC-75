import { writeAlbums } from '../../utils/albums/writeAlbums.js';

export const removeAllAlbums = ()=> writeAlbums([]);

removeAllAlbums();