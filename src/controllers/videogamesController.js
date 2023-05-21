const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;


const getVideogamesFromApi = async () => {
  
    let videogamesApi = [];
    for (let i = 1; i < 6; i++) {
      let apiResult = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
      );
      videogamesApi = videogamesApi.concat(apiResult.data.results);
    }
    filteredVideogamesFromApi = videogamesApi.map((videogame) => {
      return {
        id: videogame.id,
        name: videogame.name,
        rating: videogame.rating,
        background_image: videogame.background_image,
        isDataBase: "false",
        genres: videogame.genres.map((g) => {
          return {
            name: g.name,
          };
        }),
        platforms :videogame.platforms.map((p) => {
          return {
            name: p.name,
          };
        }), 
      };
    });
    return filteredVideogamesFromApi ;
  };

  
const getVideogamesFromDb = async () => {
    return await Videogame.findAll({
      attributes: ["id", "name", "rating", "background_image", "isDataBase", "platforms"],
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  };

const getAllVideogames = async () => {
        const VideogamesFromDb = await getVideogamesFromDb();
        const VideogamesFromApi  = await getVideogamesFromApi ();
        return VideogamesFromDb.concat( VideogamesFromApi);
 };

 

module.exports= getAllVideogames;
  

