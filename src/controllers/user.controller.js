import {
  createUserService,
  listUsersService,
  loginUserService,
  deleteUserService,
  updateUserService,
  getUserProfileService,
} from "../services/user.service";

const createUserController = async (request, response) => {
  const { name, email, password, isAdmin } = request.body;

  const createdOn = new Date();
  const updatedOn = new Date();

  const newUser = await createUserService(
    email,
    name,
    password,
    isAdmin,
    createdOn,
    updatedOn
  );

  if (newUser.error) {
    return response.status(400).json(newUser);
  }
  return response.json(newUser);
};

const listAllUsersController = (request, response) => {
  const users = listUsersService();

  return response.status(200).json(users);
};

const getUserProfileController = (request, response) => {
  const userEmail = request.decoded.email;
  const { status, user } = getUserProfileService(userEmail);

  return response.status(200).json(user);
};

const loginUserController = (request, response) => {
  const { email, password } = request.body;

  const { message, status } = loginUserService(email, password);

  return response.status(status).json(message);
};

const updateUserController = (request, response) => {
  const { id } = request.params;
  const { name, email } = request.body;

  const updateDate = new Date();
  const keys = Object.keys(request.body);
  const decodedEmail = request.decoded.email;

  for (let index in keys) {
    if (keys[index] === "isAdmin") {
      return response
        .status(401)
        .json({ message: "You can't change the admin status" });
    }
  }

  const { message, status } = updateUserService(
    id,
    name,
    email,
    updateDate,
    decodedEmail
  );

  return response.status(status).json(message);
};

const deleteUserController = (request, response) => {
  const { id } = request.params;
  const keys = Object.keys(request.body);
  const decodedEmail = request.decoded.email;

  for (let index in keys) {
    if (keys[index] === "isAdmin") {
      return response
        .status(401)
        .json({ message: "You can't change the admin status" });
    }
  }
  const { message, status } = deleteUserService(id, decodedEmail);

  return response.status(status).json(message);
};

export {
  createUserController,
  listAllUsersController,
  loginUserController,
  updateUserController,
  deleteUserController,
  getUserProfileController,
};
