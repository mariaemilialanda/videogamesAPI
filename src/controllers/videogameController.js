const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;

const getVideogameByIdFromApi = async (id) => {
    const apiResult = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const videogameId = [
      {
        id:  apiResult.data.id,
        name:  apiResult.data.name,
        released:  apiResult.data.released,
        rating:  apiResult.data.rating,
        description:  apiResult.data.description,
        background_image:  apiResult.data.background_image,
        platforms:  apiResult.data.platforms.map((p) => {
          return {
            name: p.platform.name,
          };
        }),
        isDataBase: false,
        genres:  apiResult.data.genres.map((g) => {
          return {
            name: g.name,
          };
        }),
      },
    ];
    return videogameId;
  };
  
  const getVideogameByIdFromDb = async (videogameId) => {
    let videogameById = await Videogame.findByPk(videogameId, {
      include: 
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
    });
    return videogameById;
  };
  
  const UUIDtype = (UUID) => {
    let id = "" + UUID;
  
    id = id.match(
      "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
    );
    if (id === null) {
      return false;
    }
    return true;
  };
  
  const getVideogameById = async (videogameId) => {
    let idType = UUIDtype(videogameId);
    if (idType) {
      const VideogameByIdFromDb = await getVideogameByIdFromDb(videogameId);
      if (VideogameByIdFromDb.length !== 0) {
        return [VideogameByIdFromDb];
      } else {
        throw new Error("El ID ingresado no existe.");
      }
    }
    if (Number.isInteger(Number(videogameId))) {
      const VideogameByIdFromApi = await getVideogameByIdFromApi(videogameId);
      if (VideogameByIdFromApi.length !== 0) {
        return  VideogameByIdFromApi;
      } else {
        throw new Error("El ID ingresado no existe.");
      }
    }
  
    throw new Error("El valor ingresado no corresponde a un ID");
  };
  

  module.exports=getVideogameById;
  
  