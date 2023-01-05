import { Router } from "express";
import {
	createUserController,
	deleteUserController,
	listUsersController,
	updateUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import ensureUserIsActiveMiddleware from "../middlewares/ensureUserIsActive.middleware";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware";
import { userRequestSerializer, userUpdateSerializer } from "../serializers/user.serializers";

const userRoutes = Router();

userRoutes.post("", ensureDataIsValidMiddleware(userRequestSerializer), createUserController);

userRoutes.get("", ensureAuthMiddleware, ensureIsAdminMiddleware, listUsersController);

userRoutes.patch(
	"/:id",
	ensureAuthMiddleware,
	ensureUserExistsMiddleware,
	ensureUserIsActiveMiddleware,
	ensureDataIsValidMiddleware(userUpdateSerializer),
	updateUserController
);
userRoutes.delete(
	"/:id",
	ensureAuthMiddleware,
	ensureIsAdminMiddleware,
	ensureUserExistsMiddleware,
	ensureUserIsActiveMiddleware,
	deleteUserController
);

export default userRoutes;
