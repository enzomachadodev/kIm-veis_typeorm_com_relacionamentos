import { Router } from "express";
import {
	createUserController,
	deleteUserController,
	listUsersController,
	updateUserController,
} from "../controllers/users.controllers";
import ensureAdminPermissionMiddleware from "../middlewares/ensureAdminPermission.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import ensureUserIsActiveMiddleware from "../middlewares/ensureUserIsActive.middleware";
import ensureUserNotExistMiddleware from "../middlewares/ensureUserNotExists.middleware";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware";
import {
	userRequestSerializer,
	userUpdateSerializer,
} from "../serializers/user.serializers";
import ensureUpdateDataMiddleware from "../middlewares/ensureUpdateData.middleware";

const userRoutes = Router();

userRoutes.post(
	"",
	ensureDataIsValidMiddleware(userRequestSerializer),
	ensureUserNotExistMiddleware,
	createUserController
);

userRoutes.get(
	"",
	ensureAuthMiddleware,
	ensureIsAdminMiddleware,
	listUsersController
);

userRoutes.patch(
	"/:id",
	ensureAuthMiddleware,
	ensureUpdateDataMiddleware,
	ensureAdminPermissionMiddleware,
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
