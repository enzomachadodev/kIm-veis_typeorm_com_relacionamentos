import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserRequest } from "../../interfaces/users.interfaces";
import { userResponseSerializer } from "../../serializers/user.serializers";
import { AppError } from "../../errors/AppError";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
	const userRepository = AppDataSource.getRepository(User);

	const user = await userRepository.findBy({ email: userData.email });

	if (user.length > 0) {
		throw new AppError("User as already exists", 400);
	}

	const createdUser = userRepository.create(userData);
	await userRepository.save(createdUser);

	const createdUserResponse = await userResponseSerializer.validate(createdUser, {
		stripUnknown: true,
	});

	return createdUserResponse;
};

export default createUserService;
