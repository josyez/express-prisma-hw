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
      },
    });

    response.status(200).json({
      sucess: true,
      recipe: allRecipes,
    });
  });

  router.get("/:userId/:recipeId", async function (request, response) {
    try {
      const getRecipe = await prisma.recipe.findMany({
        where: {
          id: parseInt(request.params.recipeId),
          user: {
            id:{
                equals:parseInt(request.params.userId)
            }
          }
        }
      });

      response.status(200).json({
        sucess: true,
        data: getRecipe,
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/", async (request, response) => {
    const newRecipe = await prisma.recipe.create({
      data: {
        name: request.body.recipe,
        userId: 1,
        description: request.body.description
      },
    });
    console.log(newRecipe);

    response.status(201).json({
      sucess: true,
    });
  });

  return router;
}
