import jwt from "jsonwebtoken";

const verifyTokenMiddleware = (request, response, next) => {
  const token = request.headers.authorization;

  if (!token) {
    return response
      .status(401)
      .json({ message: "Missing Authorization header" });
  }

  jwt.verify(token, "SECRET KEY", (error, decoded) => {
    if (error) {
      return response.status(401).json({ message: "Invalid token" });
    }
    request.decoded = decoded;
    return next();
  });
};
export { verifyTokenMiddleware };
