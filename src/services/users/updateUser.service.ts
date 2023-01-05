import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserUpdate } from "../../interfaces/users.interfaces";
import { userResponseSerializer } from "../../serializers/user.serializers";
import { AppError } from "../../errors/AppError";

const updateUserService = async (
	userData: IUserUpdate,
	userId: string,
	userLogId: string,
	userLogIsAdm: boolean
): Promise<IUser> => {
	if (
		userData.hasOwnProperty("isAdm") ||
		userData.hasOwnProperty("isActive") ||
		userData.hasOwnProperty("id")
	) {
		throw new AppError("this property cannot be changed!", 401);
	}

	const userRepository = AppDataSource.getRepository(User);

	const findUser = await userRepository.findOneBy({
		id: userId,
	});

	if (findUser?.id != userLogId) {
		if (!userLogIsAdm) {
			throw new AppError("unathorized", 401);
		}
	}

	const updatedUser = userRepository.create({
		...findUser,
		...userData,
	});

	await userRepository.save(updatedUser);

	const updatedUserResponse = await userResponseSerializer.validate(updatedUser, {
		stripUnknown: true,
	});

	return updatedUserResponse;
};

export default updateUserService;
