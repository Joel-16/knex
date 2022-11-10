import { Router } from "express";
import userRoutes from "./userRoutes";
import creditRoutes from "./creditRoutes";
import debitRoutes from "./debitRoutes";
import validator from "../middlewares/validator";
import { validateLogin, validateSignup } from "../validations/user";
import UserController from "../controllers/user";

const router = Router();

const { registerUser, loginUser } = UserController;

router.post("/login", validator(validateLogin), loginUser);
router.post("/register", validator(validateSignup), registerUser);

router.use("/profile", userRoutes);
router.use("/credits", creditRoutes);
router.use("/debits", debitRoutes);

export default router;
