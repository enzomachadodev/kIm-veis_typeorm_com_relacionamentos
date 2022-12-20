import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const ensureUserExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userRepo = AppDataSource.getRepository(User);

	const userId = req.params.id;

	const foundUser = await userRepo.findOneBy({ id: userId });

	if (!foundUser) {
		throw new AppError("User not exists", 404);
	}
	return next();
};

export default ensureUserExistsMiddleware;
