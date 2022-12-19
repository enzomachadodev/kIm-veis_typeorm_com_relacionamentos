import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const ensureUserExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const productRepo = AppDataSource.getRepository(User);

	const user = await productRepo.findOneBy({ id: req.params.id });
	if (!user) {
		throw new AppError("User not exists", 404);
	}
	return next();
};

export default ensureUserExistsMiddleware;
