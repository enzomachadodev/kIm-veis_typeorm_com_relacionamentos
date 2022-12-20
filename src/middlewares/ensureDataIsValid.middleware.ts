import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup/lib/schema";

const ensureDataIsValidMiddleware =
	(schema: AnySchema) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedData = await schema.validate(req.body, {
				abortEarly: false,
				stripUnknown: true,
			});

			req.validatedBody = validatedData;
			return next();
		} catch (error: any) {
			return res.status(401).json({ error: error.errors });
		}
	};

export default ensureDataIsValidMiddleware;
