import express from "express";
import { prisma } from "../db/index.js";

export default function userRouter() {
  const router = express.Router();

  router.get("/", async (request, response) => {
    const user = await prisma.user.findMany({});

    response.status(200).json({
      sucess: true,
      user: user,
    });
  });

  router.post("/", async (request, response) => {
    const user = await prisma.user.create({
      data: {
        username: request.body.username,
      },
    });

    response.status(201).json({
      sucess: true,
    });
  });

  return router;
}
