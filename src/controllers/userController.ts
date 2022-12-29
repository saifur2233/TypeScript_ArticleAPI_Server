import { NextFunction, Request, Response } from "express";

const getUser = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Hello test 2" });
};

export default {
  getUser,
};
