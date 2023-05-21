const  getGenresFromDb  = require("../controllers/genresController.js");

const getGenres= async (req, res, next) => {
    try {
      let genresDb = await getGenresFromDb();
      res.status(200).send(genresDb);
    } catch (error) {
      next(error);
    }
  };


module.exports= getGenres;