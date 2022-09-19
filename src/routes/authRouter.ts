import { Router } from "express";

import { authController } from "../controllers";

import schemaValidator from "../middlewares/schemaValidatorMiddleware";

const router = Router();

router.post("/signin", schemaValidator('signin'), authController.signIn);
router.post("/signup", schemaValidator('signup'), authController.signUp);

export default router;