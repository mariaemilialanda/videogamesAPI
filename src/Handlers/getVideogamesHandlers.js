const {Videogame, Genre}= require("../db");
const getAllVideogames = require("../controllers/videogamesController")
const getVideogamesByName= require("../controllers/videogamesNameController")
const getVideogameById=require("../controllers/videogameController")


const getVideogamesHandler= async (req, res, next) => {
    try {
      const name = req.query.name;
      if (name) {
        let videogamesByName = await getVideogamesByName(name);
        let filteredVideogames = videogamesByName.filter((vg) =>
          vg.name.toLowerCase().includes(name.toLowerCase())
        );
        if (filteredVideogames.length >= 1) {
          await filteredVideogames.sort((a, b) => {
            if (a.name.length > b.name.length) {
              return 1;
            } else if (a.name.length < b.name.length) {
              return -1;
            } else {
              return 0;
            }
          });
          if (filteredVideogames.length >= 16) {
            let showOnly15 = filteredVideogames.slice(0, 15);
            return res.status(200).send(showOnly15);
          }
          return res.status(200).send(filteredVideogames);
        } else {
          return res.status(404).send("Lo sentimos, no se encontraron videojuegos bajo ese nombre");
        }
      } else {
        let allVideogames = await getAllVideogames();
        res.status(200).send(allVideogames);
      }
    } catch (error) {
      next(error);
    }
  }

  const getVideogameHandler= async (req, res, next) => {
    const videogameId = req.params.id;
    try {
      let videogameById = await getVideogameById(videogameId);
      console.log("videogameId",videogameById)
      if (videogameById) {
        res.status(200).send(videogameById);
      }
    } catch (error) {
      next(error);
    }
  };


  const createVideogameHandler = async (req, res, next) => {
    const {
      background_image,
      name,
      description,
      released,
      rating,
      genres,
      platforms
    } = req.body;
  
    // if (!Object.keys(req.body).length) {
    //   return res.status(400).send('Debe proporcionar un objeto de entrada');
    // }
  
    const genresObj = await Promise.all(
      genres.map((g) =>
        Genre.findOne({
          where: {
            name: g.name
          }
        })
      )
    );
  
    try {
      const newVideogame = await Videogame.create({
        name,
        description,
        background_image,
        released,
        rating,
        platforms
      });
  
      genresObj.map((g) => newVideogame.addGenre(g));
  
      res.status(201).send(newVideogame);
    } catch (error) {
      next(error);
    }
  };

  module.exports= {getVideogamesHandler, getVideogameHandler, createVideogameHandler};