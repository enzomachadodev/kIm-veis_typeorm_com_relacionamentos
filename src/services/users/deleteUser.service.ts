import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users.interfaces";

const deleteUserService = async (userId: string): Promise<IUser> => {
	const userRepo = AppDataSource.getRepository(User);

	const foundUser: any = await userRepo.findOneBy({ id: userId });

	await userRepo.softDelete(foundUser);

	const deletedUser = await userRepo.save({ ...foundUser, isActive: false });

	return deletedUser;
};

export default deleteUserService;
