import express from "express";
import { prisma } from "../db/index.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (request, response) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        username: request.body.username,
      },
    });

    if (foundUser) {
      response.status(401).json({
        sucess: false,
        message: "user alredy exist",
      });
    } else {
      try {
        const hashPassword = await argon2.hash(request.body.password);

        const newUser = await prisma.user.create({
          data: {
            username: request.body.username,
            password: hashPassword,
          },
        });

        if (newUser) {
          response.status(201).json({
            sucess: true,
            message: "user created",
          });
        } else {
          response.statusMessage(500).json({
            sucess: false,
            message: "user was not created. something went wrong",
          });
        }
      } catch (error) {
        console.log(error);
        response.status(500).json({
          sucess: false,
          message: "User was not created",
        });
      }
    }
  } catch (error) {
    console.log(error);

    response.status(500).json({
      sucess: false,
      message: "User was not created",
    });
  }
});

router.post("/login", async (request, response) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        username: request.body.username,
      },
    });

    if (foundUser) {
      try {
        const verifyPassword = await argon2.verify(
          foundUser.password,
          request.body.password
        );

        if (verifyPassword === true) {
          const token = jwt.sign(
            {
              id: foundUser.id,
              username: foundUser.username,
            },
            "thisIsASecretKey"
          );

          response.status(200).json({
            success: true,
            token: token,
          });
        } else {
          response.status(401).json({
            success: false,
            message: "Wrong username or password",
          });
        }
      } catch (error) {}
    }
    
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});
export default router;
