const axios = require("axios");
const { Genre } = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;


const getGenresFromDb = async () => {
  try {
    // Realizar una solicitud a la API para obtener una lista de géneros
    const apiResult = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then((r)=>r.data.results)
    const apiGenres = await apiResult.map((genre) => Genre.findOrCreate({where: {name: genre.name}}));
  
    const genreDb= await Genre.findAll();

    return genreDb}
    catch (error){
      return error.message
    }
  }


  module.exports = getGenresFromDb
  


