import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { listUsersResponseSerializer } from "../../serializers/user.serializers";

const listUsersService = async () => {
	const userRepository = AppDataSource.getRepository(User);

	const users = await userRepository.find();

	const listUsersResponse = await listUsersResponseSerializer.validate(users, {
		stripUnknown: true,
	});

	return listUsersResponse;
};

export default listUsersService;
