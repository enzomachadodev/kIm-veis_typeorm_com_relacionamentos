import { Request, Response, NextFunction } from "express";
import { string } from "yup";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";

const ensureIsAdminMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userRepo = AppDataSource.getRepository(User);

	const userLogado = await userRepo.findOneBy({ id: req.user.id });

	if (!userLogado?.isAdm) {
		throw new AppError("unathorized", 403);
	}
	return next();
};

export default ensureIsAdminMiddleware;
