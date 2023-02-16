import express from "express";
import { prisma } from "../db/index.js";

export default function recipeRouter() {
  const router = express.Router();

  router.get("/", async (request, response) => {
    const allRecipes = await prisma.recipe.findMany({
        where: {
            userId: 1,
        },
        include: {
            user: true,
        }
    });

        response.status(200).json({
            sucess: true,
            recipe: allRecipes,
        });
  });

  router.post("/", async (request, response) => {
    const newRecipe = await prisma.recipe.create({
        data: {
            name: request.doby.recipe,
            useId: 1,
        },
    });
    console.log(newRecipe);

    response.status(201).json({
        sucess: true,
    });
  });

  return router;
}
