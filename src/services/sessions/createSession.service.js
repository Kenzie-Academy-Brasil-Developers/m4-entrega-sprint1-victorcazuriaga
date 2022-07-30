import dbconfig from "../../../dbconfig";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const db = dbconfig;

const createSessionService = async ({ email, password }) => {
  const user = (await db("users").where({ email: email }))[0];
  if (!user) {
    throw new Error("invalid email or password");
  }
  const authUser = await compare(password, user?.password);

  if (!authUser) {
    throw new Error("invalid email or password");
  }
  const token = sign(user, process.env.PRIVATE_KEY, { expiresIn: "5h" });
  return token;
};

export default createSessionService;
