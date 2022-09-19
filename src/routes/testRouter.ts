import { Router } from "express";

import { testController } from "../controllers";

import schemaValidator from "../middlewares/schemaValidatorMiddleware";
import tokenValidator from "../middlewares/tokenValidatorMiddleware";

const router = Router();


router.post("/test", tokenValidator ,schemaValidator('newTest'), testController.newTest);
router.get("/test/discipline", tokenValidator, testController.getByDiscipline);
router.get("/test/teacher", tokenValidator, testController.getByDiscipline);


export default router;