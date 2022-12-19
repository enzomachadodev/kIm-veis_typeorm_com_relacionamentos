import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserRequest } from "../../interfaces/users.interfaces";
import { userResponseSerializer } from "../../serializers/user.serializers";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
	const userRepository = AppDataSource.getRepository(User);

	const createdUser = userRepository.create(userData);
	await userRepository.save(createdUser);

	const userResponse = await userResponseSerializer.validate(createdUser, {
		stripUnknown: true,
	});

	return userResponse;
};

export default createUserService;
