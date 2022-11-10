import { Router } from "express";
import UserController from "../controllers/user";
import Authentication from "../middlewares/authenticate";
import validator from "../middlewares/validator";

import {
  validateAccount, profileValidation
} from "../validations/user";

const router = Router();
const { verifyToken } = Authentication;
const { getUsers, updateProfile, getUserAccount, addAccount, getUserDetails} = UserController;

router.post("/account", verifyToken, validator(validateAccount), addAccount);

router.get("/", verifyToken, getUsers);
router.get("/details", verifyToken, getUserDetails);
router.get("/account", verifyToken, getUserAccount);

router.patch("/profile", verifyToken, validator(profileValidation), updateProfile);

export default router;
