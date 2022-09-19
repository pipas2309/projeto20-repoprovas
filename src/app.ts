//Libs
import express, { json } from 'express';
import cors from "cors";
import 'express-async-errors';

//Main Route
import router from './routes/index';

//Error Handler
import { errorHandler } from './middlewares/errorHandlerMiddleware';

//Configs
const app = express();

app.use(cors());
app.use(json());

app.use(router);

app.use(errorHandler);

export default app;