import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { listUsersWithoutPasswordSerializer } from "../../serializers/user.serializers";

const listUsersService = async (): Promise<User[]> => {
	const userRepository = AppDataSource.getRepository(User);

	const users = await userRepository.find();

	// const listUsersWithoutPassword =
	// 	await listUsersWithoutPasswordSerializer.validate(users, {
	// 		stripUnknown: true,
	// 	});

	// return listUsersWithoutPassword;

	return users;
};

export default listUsersService;
