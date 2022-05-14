import { users } from "../database/user.db";
import { v4 } from "uuid";
import * as bcrypt from "bcrypt";
import { validateUser, serializeUser } from "../utils";
import jwt from "jsonwebtoken";
const createUserService = async (
  email,
  name,
  password,
  isAdmin,
  createdOn,
  updatedOn
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    email,
    name,
    password: hashedPassword,
    uuid: v4(),
    isAdmin: isAdmin,
    createdOn: createdOn,
    updatedOn: updatedOn,
  };
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return { error: "Email already registered" };
    }
  }
  users.push(newUser);

  const serializedUser = serializeUser(newUser);
  return serializedUser;
};

const listUsersService = () => {
  return users;
};

const getUserProfileService = (userEmail) => {
  const decodedUser = users.find((user) => user.email === userEmail);
  return { status: 200, user: decodedUser };
};

const loginUserService = (email, password) => {
  const user = users.find((element) => element.email === email);
  const errorMessage = {
    status: 401,
    message: { error: "Wrong email/password" },
  };
  if (!user) {
    return errorMessage;
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return errorMessage;
  }

  const token = jwt.sign({ email: email }, "SECRET KEY", {
    expiresIn: "24h",
  });

  return { status: 200, message: { token: token } };
};

const updateUserService = (id, name, email, updateDate, decodedEmail) => {
  const userIndex = users.findIndex((element) => element.uuid === id);
  const decodedUser = users.find((user) => user.email === decodedEmail);

  const validatedUser = validateUser(decodedUser, userIndex, id);
  if (validatedUser) {
    return { status: validatedUser.status, message: validatedUser.message };
  }

  const user = users[userIndex];
  user.updatedOn = updateDate;
  if (name !== undefined) {
    user.name = name;
  }
  if (email !== undefined) {
    user.email = email;
  }
  return { status: 200, message: users[userIndex] };
};

const deleteUserService = (id, decodedEmail) => {
  const userIndex = users.findIndex((element) => element.uuid === id);
  const decodedUser = users.find((user) => user.email === decodedEmail);

  const validatedUser = validateUser(decodedUser, userIndex, id);
  if (validatedUser) {
    return { status: validatedUser.status, message: validatedUser.message };
  }

  users.splice(userIndex, 1);

  return { status: 200, message: { message: "User deleted with success" } };
};
export {
  createUserService,
  listUsersService,
  getUserProfileService,
  loginUserService,
  updateUserService,
  deleteUserService,
};
