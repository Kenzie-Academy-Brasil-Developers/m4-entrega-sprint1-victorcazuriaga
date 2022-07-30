const db = require("../../../dbconfig");
const listUserService = async () => {
  const userData = await db("users").select(
    "id",
    "uuid",
    "name",
    "email",
    "isAdm",
    "created_at",
    "updated_at"
  );
  return userData;
};

export default listUserService;
