import { readAlbums } from '../../utils/albums/readAlbums.js';

const countAlbums = async ()=> {
    const albums = await readAlbums();
    return albums.length;
};

console.log(await countAlbums());