import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";

const createUserController = async (req: Request, res: Response) => {
	const newUser = await createUserService(req.body);
	return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response) => {
	const users = await listUsersService();
	return res.status(200).json(users);
};

const updateUserController = async (req: Request, res: Response) => {
	const updatedUser = await updateUserService(
		req.body,
		req.params.id,
		req.user.id,
		req.user.isAdm
	);
	return res.status(200).json(updatedUser);
};
const deleteUserController = async (req: Request, res: Response) => {
	const deletedUser = await deleteUserService(req.params.id);
	return res.status(204).json(deletedUser);
};

export { createUserController, listUsersController, updateUserController, deleteUserController };
