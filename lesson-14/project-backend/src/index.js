import { databaseConnection } from "./db/databaseConnection.js";
import { startServer } from "./server.js";
import { createDirIfNotExist } from "./utils/createDirIfNotExists.js";
import { TEMP_UPLOAD_DIR, PUBLIC_DIR } from "./constants/index.js";

const bootstrap = async()=>{
    await databaseConnection();
    await createDirIfNotExist(TEMP_UPLOAD_DIR);
    await createDirIfNotExist(PUBLIC_DIR);
    startServer();
};

bootstrap();