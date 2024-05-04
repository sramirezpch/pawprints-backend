import { User, UserAttributes, UserModel } from "@/models/user.model";

const createUser = async (
  userAttributes: UserAttributes
): Promise<UserModel | undefined> => {
  try {
    const userExists = await findUserByEmail(userAttributes.email);

    if (userExists) throw new Error("User already exists");

    console.log({...userAttributes})
    return User.create({...userAttributes});
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = (email: string): Promise<UserModel | null> => {
  try {
    return User.findOne({ where: { email } });
  } catch (error) {
    throw error;
  }
};

const findUserById = (id: number) => {
  try {
    return User.findByPk(id);
  } catch (error) {
    throw error;
  }
};

export default { createUser, findUserByEmail, findUserById };
