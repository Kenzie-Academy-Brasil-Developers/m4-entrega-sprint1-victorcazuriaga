const dbconfig = require("../../../dbconfig");

const db = dbconfig;

const userDeleteService = async (
  id = "1e44b6f9-3b8f-43d8-8237-e3d80e48352f"
) => {
  const userSelect = await db("users").where({ uuid: id }).del();
  console.log(userSelect);
};
userDeleteService();
