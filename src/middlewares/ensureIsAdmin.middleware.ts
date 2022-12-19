import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const ensureIsAdminMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userRepo = AppDataSource.getRepository(User);
	const user = await userRepo.findOneBy({ id: req.user.id });

	console.log(user, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

	if (user?.isAdm) {
		throw new AppError("Admin permission required!", 403);
	}
	return next();
};

export default ensureIsAdminMiddleware;
