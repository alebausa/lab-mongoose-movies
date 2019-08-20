const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

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

Celebrity.create(celebrities)
  .then(celebrity => {
    console.log("inserted celebrity ", celebrity);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });
