import dbconfig from "../../../dbconfig";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";
const db = dbconfig;

const createUserService = async (data) => {
  const hashedPassword = await hash(data.password, 10);
  data.password = hashedPassword;
  const newUser = await db("users").insert({
    ...data,
    uuid: uuidv4(),
  });
  console.log(newUser);
  return newUser;
};

export default createUserService;
