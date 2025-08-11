import { Schema, model } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["film", "serial", "cartoon"],
        default: "film",
        required: true,
    }
});

const MovieCollection = model("movie", movieSchema);
// category => categories
// mouse => mice

export default MovieCollection;