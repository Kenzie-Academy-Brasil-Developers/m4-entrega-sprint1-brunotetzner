const validateUser = (decodedUser, userIndex, id) => {
  if (!decodedUser) {
    return {
      status: 404,
      message: { message: "User authentication failed. Do your login again" },
    };
  }
  if (userIndex === -1) {
    return { status: 404, message: { message: "User not found" } };
  }
  if (!decodedUser.isAdmin && decodedUser.uuid !== id) {
    return { status: 401, message: { message: "Unauthorized" } };
  }
};

const serializeUser = (newUser) => {
  const user = {
    email: newUser.email,
    name: newUser.name,
    uuid: newUser.uuid,
    isAdmin: newUser.isAdmin,
    createdOn: newUser.createdOn,
    updatedOn: newUser.updatedOn,
  };
  return user;
};

export { validateUser, serializeUser };
