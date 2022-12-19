import "reflect-metadata";
import express from "express";
import "express-async-errors";
import userRoutes from "./routes/users.routes";
import handleError from "./errors/handleError";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login");

app.use(handleError);

export default app;
