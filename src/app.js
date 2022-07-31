import express, { json } from "express";
import { v4 as uuidv4 } from "uuid";
import userRouter from "./routers/users.routes";
import "dotenv/config";

const app = express();
app.use(express.json());
const db = require("../dbconfig");
app.use("", userRouter);
const ports = {
  development: 9000,
  test: 9001,
};
const port = ports[process.env.ENVIROMENT] || 1000;

const user = [];

app.listen(port, () => {
  console.log(`application run port ${port}`);
});

export default app;
