import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const ensureUserIsActiveMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userRepo = AppDataSource.getRepository(User);

	const user = await userRepo.findOneBy({ id: req.params.id });

	if (!user?.isActive) {
		throw new AppError("User is not active!", 400);
	}

	return next();
};

export default ensureUserIsActiveMiddleware;
