import { databaseConnection } from "./db/databaseConnection.js";
import { startServer } from "./server.js";

const bootstrap = async()=>{
    await databaseConnection();
    startServer();
};

bootstrap();