import createUserService from "../services/user/createUser.service";
import listUserService from "../services/user/listUser.service";
import dbconfig from "../../dbconfig";
import retrieveUserService from "../services/user/retrieveUser.service";
import userProfileService from "../services/user/userProfile.service";
import userDeleteService from "../services/user/userDelete.service";
import userUpdateService from "../services/user/userUpdate.service";
const createUserController = async (request, response) => {
  const user = request.body;
  const newUser = await createUserService(user);
  const db = dbconfig;
  const [{ password, ...newUserDb }] = await db("users").where({ id: newUser });
  return response.status(201).json(newUserDb);
};

const listUserController = async (request, response) => {
  const isAdm = request.isAdm;
  if (isAdm === 0) {
    return response.status(401).json({ message: "Usuário não autorizado" });
  }
  const userData = await listUserService();
  return response.status(200).json(userData);
};

const retrieveUserController = (request, response) => {
  const { id } = request.params;
  const user = retrieveUserService(id);
  return response.json(user);
};
const userUpdateController = async (request, response) => {
  const userId = request.params;
  const userData = request.body;
  const userUpdate = await userUpdateService(userId, userData);
  return response
    .status(200)
    .json({ message: "Usuário Atualizado com sucesso " });
};

const userDeleteController = async (request, response) => {
  const userId = request.params;
  const userDelete = await userDeleteService(userId);

  return response.status(200).send("usuário deletado com sucesso");
  return response.status(401).send("não passou");
};

const userProfileController = async (request, response) => {
  const userId = request.id;
  const [{ password, ...userProfile }] = await userProfileService(userId);
  console.log(userProfile);
  return response.status(200).json(userProfile);
};

export {
  createUserController,
  listUserController,
  userProfileController,
  userDeleteController,
};
