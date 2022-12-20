import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const ensureUpdateDataMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (
		req.body.hasOwnProperty("isAdm") ||
		req.body.hasOwnProperty("isActive") ||
		req.body.hasOwnProperty("id")
	) {
		throw new AppError("this property cannot be changed!", 401);
	}

	next();
};

export default ensureUpdateDataMiddleware;
