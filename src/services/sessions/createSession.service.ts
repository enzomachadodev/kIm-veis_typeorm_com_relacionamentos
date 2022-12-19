import AppDataSource from "../../data-source";
import { IUserLogin } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createSessionService = async ({
	email,
	password,
}: IUserLogin): Promise<string> => {
	const userRepository = AppDataSource.getRepository(User);

	const user = await userRepository.findOneBy({
		email: email,
	});

	if (!user) {
		throw new AppError("User or password invalid!", 401);
	}

	const passwordMatch = await compare(password, user.password);

	if (!passwordMatch) {
		throw new AppError("User or password invalid!");
	}

	const token = jwt.sign(
		{
			isAdm: user.isAdm,
		},
		process.env.SECRET_KEY,
		{
			subject: String(user.id),
			expiresIn: "1h",
		}
	);

	return token;
};

export default createSessionService;
