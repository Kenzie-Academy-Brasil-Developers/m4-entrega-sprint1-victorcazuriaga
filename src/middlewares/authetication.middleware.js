import jwt, { decode } from "jsonwebtoken";

const authenticationMiddleware = (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) {
    return response.status(401).json({
      message: "token invalido",
    });
  }
  const authToken = jwt.verify(
    token.split(" ")[1],
    process.env.PRIVATE_KEY,
    (error, decoded) => {
      if (error) {
        return response.status(401).json({
          message: "token invalido",
        });
      }
      request.id = decoded.id;
      request.uuid = decoded.uuid;
      request.email = decoded.email;
      request.isAdm = decoded.isAdm;
      next();
    }
  );
};

export default authenticationMiddleware;
