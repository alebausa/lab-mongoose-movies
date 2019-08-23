const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const mongoose = require("mongoose");

/* GET celebrities main page. */
router.get('/', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      console.log('movies ', movies);
      res.render('movies/index', { movies });
    })
    .catch(next);
});

/* GET create new celebrity*/
router.get('/new', (req, res, next) => {
  res.render('movies/new');
});

/* POST for the new celebrity*/
router.post('/', (req, res, next) => {
  const { title, genre, plot } = req.body;
  Movie.create({
    title,
    genre,
    plot
  })
    .then((movie) => {
      console.log('movie ', movie);
      res.redirect('/movies');
    })
    .catch(next);
});

/* GET celebrity detail */
router.get('/:movieId', (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      res.render('movies/show', { movie });
    })
    .catch(next);
});

/*POST to edit celebrity*/
router.get('/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      res.render('movies/edit', movie);
    })
    .catch(next);
});

router.post('/:movieId', (req, res, next) => {
  const { movieId } = req.params;
  const { title, genre, plot } = req.body;
  Movie.update({ _id: movieId }, { title: title, genre: genre, plot: plot })
    .then((movie) => {
      console.log('editing movie ', movie);
      res.redirect(`/movies/${movieId}`);
    })
    .catch(next);
});

/*POST to delete celebrity*/
router.post('/:movieId/delete', (req, res, next) => {
  const { movieId } = req.params;
  Movie.findByIdAndDelete(movieId)
    .then(() => {
      res.redirect('/movies');
    })
    .catch(next);
});

module.exports = router;
