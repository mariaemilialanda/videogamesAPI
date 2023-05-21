const { Router } = require("express");
const {getVideogamesHandler, getVideogameHandler, createVideogameHandler}= require("../Handlers/getVideogamesHandlers")

const videogamesRouter = Router();


videogamesRouter.get("/", getVideogamesHandler);

videogamesRouter.get("/:id", getVideogameHandler);

videogamesRouter.post("/",createVideogameHandler);

module.exports = videogamesRouter;
