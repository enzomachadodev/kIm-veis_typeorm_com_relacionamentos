import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const ensureAdminPermissionMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userRepo = AppDataSource.getRepository(User);
	const user = await userRepo.findOneBy({ id: req.params.id });

	if (user?.id != req.user.id) {
		throw new AppError("Admin permission required!", 401);
	}

	return next();
};

export default ensureAdminPermissionMiddleware;
