const Music = require("../models/music.model");
const Album = require("../models/album.model");
const { uploadFile } = require("../services/storage.services");
const jwt = require("jsonwebtoken");

async function artistmusic(req, res) {
  
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Music file is required"
      });
    }

    // Convert buffer to base64
    const base64File = req.file.buffer.toString("base64");

    const result = await uploadFile(base64File);

    const newMusic = await Music.create({
      uri: result.url,
      title,
      artist: req.user.id
    });

    return res.status(201).json({
      message: "Music uploaded successfully",
      music: {
        id: newMusic._id,
        title: newMusic.title,
        uri: newMusic.uri,
        artist: newMusic.artist
      }
    });

  } 


async function albummusic(req, res) {
  
   const {title, Music} = req.body;
   const musicIds = Array.isArray(Music) ? Music : Music ? [Music] : [];
   const newAlbum = await Album.create({
    title,
    Music: musicIds,
    artist: req.user.id,
   });

    return res.status(201).json({
      message:"Album created successfully",
      album:{
        id:newAlbum._id,
        title:newAlbum.title,
        Music:newAlbum.Music,
        artist:newAlbum.artist
      }
    })

  }

async function getAllMusic(req, res) {
  try {
    const musicList = await Music.find();
    return res.status(200).json({
      message: "Music retrieved successfully",
      music: musicList
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving music",
      error: error.message
    });
  }
}
 
async function getAllAlbums(req, res) {
  try {
    const albumList = await Album.find().select("title artist").populate("artist", "username");
    return res.status(200).json({
      message: "Albums retrieved successfully",
      albums: albumList
    });
  } catch (error) {   
    return res.status(500).json({
      message: "Error retrieving albums",
      error: error.message
    })
  }
}

async function getAlbumById(req, res) {
const{id} = req.params;
  const albumId = await Album.findById(id).populate("Music").populate("artist", "username");

  return res.status(200).json({
    message: "Album retrieved successfully",
    album: albumId
  })
}
module.exports = { artistmusic, albummusic , getAllMusic , getAllAlbums, getAlbumById};
