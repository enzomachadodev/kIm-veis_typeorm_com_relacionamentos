import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserUpdate } from "../../interfaces/users.interfaces";
import { userResponseSerializer } from "../../serializers/user.serializers";

const updateUserService = async (
	userData: IUserUpdate,
	userId: string
): Promise<IUser> => {
	const userRepository = AppDataSource.getRepository(User);

	const findUser = await userRepository.findOneBy({
		id: userId,
	});

	const updatedUser = userRepository.create({
		...findUser,
		...userData,
	});

	await userRepository.save(updatedUser);

	const updatedUserWithoutPassword = await userResponseSerializer.validate(
		updatedUser,
		{
			stripUnknown: true,
		}
	);

	return updatedUserWithoutPassword;
};

export default updateUserService;
