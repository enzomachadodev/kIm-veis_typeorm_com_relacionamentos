import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserRequest } from "../../interfaces/users.interfaces";
import { userWithoutPasswordSerializer } from "../../serializers/user.serializers";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
	const userRepository = AppDataSource.getRepository(User);

	const createdUser = userRepository.create(userData);
	await userRepository.save(createdUser);

	console.log(createdUser);

	const createdUserWithoutPassword =
		await userWithoutPasswordSerializer.validate(createdUser, {
			stripUnknown: true,
		});

	return createdUserWithoutPassword;
};

export default createUserService;
