import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
	const userData: IUserRequest = req.body;

	const newUser = await createUserService(userData);
	return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response) => {
	const users = await listUsersService();

	return res.status(200).json(users);
};

const updateUserController = async (req: Request, res: Response) => {
	const userData: IUserUpdate = req.body;

	const userId = req.params.id;
	const updatedUser = await updateUserService(userData, userId);
	return res.status(200).json(updatedUser);
};
const deleteUserController = async (req: Request, res: Response) => {};

export {
	createUserController,
	listUsersController,
	updateUserController,
	deleteUserController,
};
