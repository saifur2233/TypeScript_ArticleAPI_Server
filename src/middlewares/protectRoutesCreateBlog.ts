import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const protectRoutesCreateBlog = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  if (req.cookies["macaron"]) {
    token = req.cookies["macaron"];
  } else {
    token = "";
  }

  if (token == "") {
    return;
  }

  const decoded = jwt.verify(token, "saifur22");
  const { email }: any = decoded;

  req.body.email = email;
  next();
};

export default protectRoutesCreateBlog;
