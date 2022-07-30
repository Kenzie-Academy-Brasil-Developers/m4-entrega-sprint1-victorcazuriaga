import dbconfig from "../../dbconfig";

const db = dbconfig;

const userExist = (request, response, next) => {
  const { id } = request.params;
  const userDb = db("users").where({ id: id });
  if (userDb) {
    request.user = user;
    next();
  }
  return response.status(404).json({
    message: "User not Found",
  });
};

export default userExist;
