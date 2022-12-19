import "reflect-metadata";
import express from "express";
import "express-async-errors";
import userRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/session.routes";
import handleError from "./errors/handleError";

import { Request, Response } from "express";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);

app.get("/", (req: Request, res: Response) => {
	return res.status(200).json({
		message: "teste funcionando",
	});
});

app.use(handleError);

export default app;
