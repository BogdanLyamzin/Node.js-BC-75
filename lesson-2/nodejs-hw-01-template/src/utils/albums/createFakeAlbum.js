import { faker } from "@faker-js/faker";

export const createFakeAlbum = ()=> ({
    id: faker.string.uuid(),
    name: faker.music.album(),
    artist: faker.music.artist(),
    genre: faker.music.genre(),
});