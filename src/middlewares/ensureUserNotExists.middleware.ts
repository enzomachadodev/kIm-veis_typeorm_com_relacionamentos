import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const ensureUserNotExistMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userRepo = AppDataSource.getRepository(User);
	const user = await userRepo.findBy({ email: req.body.email });

	if (user.length > 0) {
		throw new AppError("User as already exists", 400);
	}
	return next();
};

export default ensureUserNotExistMiddleware;
