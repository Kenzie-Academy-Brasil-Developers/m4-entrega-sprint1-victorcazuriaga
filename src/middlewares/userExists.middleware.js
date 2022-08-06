import dbconfig from "../../dbconfig";

const db = dbconfig;

const userExistMiddleware = async (request, response, next) => {
  const uuid = request.params.id || request.uuid;
  const userDb = await db("users").where({ uuid: uuid });
  if (userDb.length === 1) {
    next();
  } else {
    return response.status(404).json({
      message: "User not Found",
    });
  }
};

export default userExistMiddleware;
