import { Router } from "express";
import {
	createUserController,
	deleteUserController,
	listUsersController,
	updateUserController,
} from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureAuth
import { userRequestSerializer } from "../serializers/user.serializers";

const userRoutes = Router();

userRoutes.post("",ensureDataIsValidMiddleware(userRequestSerializer), createUserController);
userRoutes.get("",ensu listUsersController);
userRoutes.patch("/:id", updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
