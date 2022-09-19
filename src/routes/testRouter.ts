import { Router } from "express";

import { testController } from "../controllers";

import schemaValidator from "../middlewares/schemaValidatorMiddleware";
import tokenValidator from "../middlewares/tokenValidatorMiddleware";

const router = Router();

router.post("/test", tokenValidator ,schemaValidator('newTest'), testController.newTest);
//router.get("/test/discipline/:id", tokenValidator, testController.getByDiscipline)


export default router;