import { Router } from "express";

//import { testController } from "../controllers";

import schemaValidator from "../middlewares/schemaValidatorMiddleware";

const router = Router();

//router.post("/test", schemaValidator('newTest'), testController.newTest);

export default router;