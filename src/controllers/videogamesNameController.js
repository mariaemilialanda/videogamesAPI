const axios = require("axios");
const { Videogame, Genre} = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const { Op } = require("sequelize");


const getVideogamesByNameFromApi = async (name) => {
    const apiSearchEndpoint = await axios.get(
      `https://api.rawg.io/api/games?search={${name}}&key=${API_KEY}`
    );
    const videogamesName = await apiSearchEndpoint.data.results.map((videogame) => {
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
        }) 
      };
    });
  
    return videogamesName;
  };
  
  const getVideogamesByNameFromDb = async (name) => {
    let videogamesByName = await Videogame.findAll({
      attributes: ["id", "name", "rating", "background_image", "isDataBase", "platforms"],
      where: {
        name: {
          [Op.substring]: name,
        },
      },
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        }
      ],
    });
    return videogamesByName;
  };
  
  const getVideogamesByName = async (name) => {
    const VideogamesByNameFromApi = await getVideogamesByNameFromApi(name);
    const VideogamesByNameFromDb = await getVideogamesByNameFromDb(name);
    return VideogamesByNameFromApi.concat(VideogamesByNameFromDb);
  };
  
  module.exports= getVideogamesByName;