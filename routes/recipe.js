import express from "express";
import { prisma } from "../db/index.js";

export default function recipeRouter() {
  const router = express.Router();

  router.get("/", async (request, response) => {

    const allRecipes = await prisma.recipe.findMany({
      where: {
        userId: 1
        //request.user.id
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
        name: request.body.name,
        userId: 1,
        description: request.body.description
      },
    });
    console.log(newRecipe);

    response.status(201).json({
      sucess: true,
    });
  });


  router.delete("/:recipeId", async (request, response) => {
    const deleteRecipe = await prisma.recipe.delete({
        where: {
            id: parseInt(request.params.recipeId)
        }
    });
    response.status(200).json({
        success: true, 
        message: "you deleted a recipe"
    })
})

//   router.put("/:recipeId", async (request, response) => {
//     const updateRecipe = await prisma.recipe.update({
//         where: {
//             id: parseInt(request.params.recipeId)
//         },
//         data: {
//             name: request.body.recipe,
//             description: request.body.description
//         }
//     });
//     //sends back response if it works 
//     response.status(200).json({
//         success: true, 
//         message: "recipe updated!"
//     });
// })



  return router;
}
