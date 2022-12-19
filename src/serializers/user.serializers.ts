import * as yup from "yup";
import { SchemaOf } from "yup";
import {
	IUserRequest,
	IUserUpdate,
	IUser,
} from "../interfaces/users.interfaces";

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

const userResponseSerializer: SchemaOf<IUser> = yup.object().shape({
	id: yup.string().notRequired(),
	email: yup.string().email().notRequired(),
	name: yup.string().notRequired(),
	isAdm: yup.boolean().notRequired(),
	createdAt: yup.date().notRequired(),
	updatedAt: yup.date().notRequired(),
});

export { userRequestSerializer, userUpdateSerializer, userResponseSerializer };
