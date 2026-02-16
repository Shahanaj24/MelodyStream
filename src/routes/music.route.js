const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');    
const musicController = require('../controllers/music.controller');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 5 * 1024 * 1024}
});
const Router = express.Router();

Router.post("/upload", authMiddleware.authArtist, upload.single("music"), musicController.artistmusic);
Router.post("/album",authMiddleware.authArtist,musicController.albummusic);
Router.get("/",authMiddleware.authUser,musicController.getAllMusic);
Router.get("/albumlist",authMiddleware.authUser,musicController.getAllAlbums);
Router.get("/album/:id",authMiddleware.authUser,musicController.getAlbumById);

module.exports = Router;