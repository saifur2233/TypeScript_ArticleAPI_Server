import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/User";

const userLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return;
  }

  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      const token: string = jwt.sign(
        {
          email: email,
        },
        "saifur22",
        {
          expiresIn: process.env.JWT_EXPIRES_TIME,
        }
      );
      console.log(token);
      return res.status(201).json({ user, token });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const userRegistration = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, password } = req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    phone,
    password,
  });
  console.log(user);
  const token: string = jwt.sign(
    {
      email: email,
    },
    "saifur22",
    {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    }
  );
  return user
    .save()
    .then((user) => res.status(201).json({ user, token }))
    .catch((error) => res.status(500).json({ error }));
};

export default {
  userLogin,
  userRegistration,
};
