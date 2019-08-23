const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");
const Movie = require("../models/Movie");

mongoose.connect("mongodb://localhost/celebrities", { useNewUrlParser: true });

var celebrities = [
  {
    name: "Rick",
    occupation: "Space cowboy",
    catchPhrase: "Watch out for the flying pickle Morty!"
  },
  {
    name: "Homer",
    occupation: "Main character of our lives and hearts",
    catchPhrase: "Nu-ce-lar Lisa, the word is Nu-ce-lar"
  },
  {
    name: "Eleven",
    occupation: "Weird girl with super powers",
    catchPhrase: "Friends. don't. lie"
  }
];

var movies = [
  {
    title: "The dead poets society",
    genre: "Drama",
    plot: "A movie about following your dreams in life"
  },
  {
    title: "IronHack The Movie",
    genre: "Terror",
    plot: "A group of students lose their minds trying to understand"
  },
  {
    title: "Bridget Jones Diary",
    genre: "Romantic comedy",
    plot: "Bridget is about to find real love... at the end of a bottle"
  }
];

Movie.create(movies)
  .then(movie => {
    console.log("inserted movie ", movie);
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });

Celebrity.create(celebrities)
  .then(celebrity => {
    console.log("inserted celebrity ", celebrity);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });