import { Router } from "express";
import createSessionController from "../controllers/session.controller";
import {
  createUserController,
  listUserController,
  userDeleteController,
  userProfileController,
  userUpdateController,
} from "../controllers/user.controllers";
import userSchema from "../database/schemas/user.schema";
import authenticationMiddleware from "../middlewares/authetication.middleware";
import schemaCreateUserMiddleware from "../middlewares/schemaCreateUser.middleware";
import userExist from "../middlewares/userExists.middleware";
import userUpdateService from "../services/user/userUpdate.service";

const userRouter = Router();

userRouter.post(
  "/users",
  schemaCreateUserMiddleware(userSchema),
  createUserController
);
userRouter.post("/login", createSessionController);
userRouter.get("/users", authenticationMiddleware, listUserController);
userRouter.get(
  "/users/profile",
  authenticationMiddleware,
  userProfileController
);
userRouter.patch("/users/:id", authenticationMiddleware, userUpdateController);
userRouter.delete(
  "/users/:id",
  authenticationMiddleware,

  userDeleteController
);

export default userRouter;
