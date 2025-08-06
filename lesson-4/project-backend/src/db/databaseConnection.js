import mongoose from "mongoose";

import { getEnvVar } from "../utils/getEnvVar.js";

export const databaseConnection = async()=> {
    try {
        const dbUser = getEnvVar("MONGODB_USER");
        const dbPassword = getEnvVar("MONGODB_PASSWORD");
        const dbUrl = getEnvVar("MONGODB_URL");
        const dbName = getEnvVar("MONGODB_DB_NAME");
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbUrl}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Successfully connected database");
    }
    catch(error) {
        console.log(`Error connection database ${error.message}`);
    }
};