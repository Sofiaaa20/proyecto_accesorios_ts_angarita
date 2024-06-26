import { Request, Response } from "express";
import User from "../Dto/UserDto";
import UserService from "../services/UserServices";

let register = async (req: Request, res: Response) => {
  try {
    const {documento, nombres, apellidos, email, direccion, telefono, password} = req.body;
    const user = new User(documento, nombres, apellidos, email, direccion, telefono, password);
    const result = await UserService.register(user);
    return res.status(201).send({
      status: "register ok",
    });
  } catch (error: any) {
    if (error && error.code == "ER_DUP_ENTRY") {
      return res.status(500).send({ errorInfo: error.sqlMessage });
    }
  }
};

export default register;