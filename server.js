import express from "express";
import recipeRouter from "./routes/recipe.js";
// import userRouter from "./routes/user.js"
import authRoutes from "./routes/authRoutes.js"
import passport from "passport";
import setupJWTStrategy from "./auth/index.js";

export default async function createServer(){
    const app = express();

    app.use(express.json());
    
    app.use("/auth", authRoutes)
    // app.use("/user", userRouter())
    setupJWTStrategy(passport);
    app.use("/recipe", passport.authenticate("jwt", {
        session: false,
    }),
     recipeRouter())

    

    return app;
}