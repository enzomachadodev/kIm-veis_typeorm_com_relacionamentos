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
	const userLogado = await userRepo.findOneBy({ id: req.user.id });

	if (user?.id != userLogado?.id) {
		if (!userLogado?.isAdm) {
			throw new AppError("unathorized", 401);
		}

		return next();
	}

	return next();
};

export default ensureAdminPermissionMiddleware;
