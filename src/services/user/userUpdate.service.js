import dbconfig from "../../../dbconfig";

const db = dbconfig;
const userUpdateService = async (id, data) => {
  const userUpdate = await db("users").where({ uuid: id }).update(data);
  const userUpdated = await db("users")
    .where({ uuid: id })
    .select("uuid", "created_at", "updated_at", "name", "email", "isAdm");
  return userUpdated;
};

export default userUpdateService;
