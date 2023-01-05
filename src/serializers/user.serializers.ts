import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser, IUserLogin, IUserRequest, IUserUpdate } from "../interfaces/users.interfaces";

const userLoginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

const userResponseSerializer: SchemaOf<IUser> = yup.object().shape({
	id: yup.string().required(),
	name: yup.string().required(),
	email: yup.string().email().required(),
	isAdm: yup.boolean().required(),
	isActive: yup.boolean().required(),
	createdAt: yup.date().required(),
	updatedAt: yup.date().required(),
});

const listUsersResponseSerializer: SchemaOf<IUser[]> = yup.array(userResponseSerializer);

const userRequestSerializer: SchemaOf<IUserRequest> = yup.object().shape({
	email: yup.string().email().required(),
	name: yup.string().required(),
	password: yup.string().required(),
	isAdm: yup.boolean().required(),
});

const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
	email: yup.string().email().notRequired(),
	name: yup.string().notRequired(),
	password: yup.string().notRequired(),
});

export {
	userLoginSerializer,
	userRequestSerializer,
	userUpdateSerializer,
	userResponseSerializer,
	listUsersResponseSerializer,
};
