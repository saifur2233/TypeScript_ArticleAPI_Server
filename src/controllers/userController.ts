import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const getUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);

        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? res.status(201).json({ message: "User Deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
