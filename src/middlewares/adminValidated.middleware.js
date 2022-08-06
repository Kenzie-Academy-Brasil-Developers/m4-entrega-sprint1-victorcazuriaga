import dbconfig from "../../dbconfig";
import jwt from "jsonwebtoken";

const adminValidatedMiddleware = (request, response, next) => {
  const userId = request.params.id;
  console.log(userId, "uuid:", request.uuid);
  if (!request.isAdm && userId !== request.uuid) {
    return response.status(401).json({ message: "Usuario não autorizado" });
  }
  next();
};
export default adminValidatedMiddleware;
