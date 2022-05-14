import { users } from "../database/user.db";
const verifyIfAdminMiddleware = (request, response, next) => {
  const decodedUser = users.find(
    (user) => user.email === request.decoded.email
  );
  if (!decodedUser) {
    return response
      .status(404)
      .json({ message: "User authentication failed. Do your login again" });
  }
  if (!decodedUser.isAdmin) {
    return response.status(401).json({ message: "Unauthorized" });
  }
  return next();
};

export { verifyIfAdminMiddleware };
