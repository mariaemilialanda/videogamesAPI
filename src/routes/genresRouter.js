const { Router } = require("express");
const getGenres = require("../Handlers/genresHandlers");
const genresRouter = Router();


genresRouter.get("/", getGenres)

module.exports = genresRouter;
