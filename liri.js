var request = require("request");
var Spotify = require('node-spotify-api');
var moment = require('moment');
let keys = require("./keys.js");
let fs = require('fs');
//require("dotenv").config();
// Store all of the arguments in an array
var spotify = new Spotify({
  id: keys.spotify.id,// <your spotify client id>,
  secret: keys.spotify.secret,//<your spotify client secret>
});


let input = process.argv[2];
var nodeArgs = process.argv;


///functions

function getSong(query) {

  spotify
    .search({ type: 'track', query: query })
    .then(function (response) {
      //console.log(response.tracks.items[0]);
      console.log('Song: ' + response.tracks.items[0].name);
      console.log('Album: ' + response.tracks.items[0].album.name);
      console.log('Artist(s): ' + response.tracks.items[0].artists[0].name);
      console.log('Check it out: ' + response.tracks.items[0].preview_url);
      return
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getMovie(movie) {
  // Then run a request to the OMDB API with the movie specified
  var movieUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  //console.log(queryUrl);

  request(movieUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      console.log("Title: " + JSON.parse(body).Title);
      //Rease Year
      console.log("Release Year: " + JSON.parse(body).Year);
      //Rating on imbd
      console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
      //Rating on rotten tomatos
      console.log("Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      // Country where the movie was produced.
      console.log('Country: ' + JSON.parse(body).Country);
      // Language of the movie.
      console.log('Language: ' + JSON.parse(body).Language);
      //  * Actors in the movie.
      console.log('Actors: ' + JSON.parse(body).Actors);
      //  * Plot of the movie.
      console.log('Plot: ' + JSON.parse(body).Plot);

    }
  });
}

function getBand(band) {
  // Then run a request to the OMDB API with the movie specified
  var artistUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";

  request(artistUrl, function (error, response, body) {
    // This line is just to help us debug against the actual URL.

    console.log(artistUrl);
    // If the request is successful
    if (!error && response.statusCode === 200) {

      //console.log(JSON.parse(body).length)

      for (j = 0; j < JSON.parse(body).length; j++) {

        let showtime = JSON.parse(body)[j].datetime
        console.log(artist + ' will preform at the '
          + JSON.parse(body)[j].venue.name + ' in '
          + JSON.parse(body)[j].venue.city + ', '
          + JSON.parse(body)[j].venue.region + ' ('
          + JSON.parse(body)[j].venue.country + ') on '
          + moment(showtime).format('L'))
      }

    }
  });
}

if (input === "do-what-it-says") {
  fs.readFile('random.txt', 'utf8', function (error, data) {
    //console.log(data)

    var dataArray = data.trim().split(',');

    input = dataArray[0]
    nodeArgs = dataArray[1]

    if (input === 'movie-this') {
      getMovie(nodeArgs)
    } else if (input === "spotify-this-song") {
      getSong(nodeArgs)
    } else if (input === "concert-this") {
      getBand(nodeArgs)
    }
  });
}


if (input === 'movie-this') {

  // Create an empty variable for holding the movie name
  var movieName = "";

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

      movieName = movieName + "+" + nodeArgs[i];

    }

    else {

      movieName += nodeArgs[i];

    }
    getMovie(movieName)
  }





} else if (input === "concert-this") {
  // console.log('This feature is comming soon.')
  var artist = "";

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

      artist = artist + "+" + nodeArgs[i];

    }

    else {

      artist += nodeArgs[i];

    }
    getBand(artist)
  }



} else if (input === "spotify-this-song") {

  let song = ""
  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

      song = song + "+" + nodeArgs[i];

    }

    else {

      song += nodeArgs[i];

    }
    getSong(song)
  }


} else if (input != "do-what-it-says") {
  console.log("I'm sorry. I didn't qite get that.")
}; 
//Test cases
//node liri.js movie-this coco 
//node liri.js concert-this Pentatonix 
//node liri.js spotify-this-song high of 75
//node liri.js do-what-it-says

