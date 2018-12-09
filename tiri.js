var axios = require("axios");
var moment = require('moment');
let keys = require("./keys.js")
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: keys.spotify.id,// <your spotify client id>,
  secret: keys.spotify.secret,//<your spotify client secret>
});


// Store all of the arguments in an array
var nodeArgs = process.argv;

if (process.argv[2] === 'movie-this') {

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
}

// Then run a request to the OMDB API with the movie specified
var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.

console.log(movieUrl);

//axios.get(movieUrl, function(error, response, body) {

  axios.get(movieUrl).then(
    function(response) {


    // console.log("test")
    // console.log(movieName)

    // Parse the body of the site and recover just the imdbRating
    console.log("Title: " + response.data.Title);
   // Rease Year
    console.log("Release Year: " + response.data.Year);
    //Rating on imbd
    console.log("IMBD Rating: " + response.data.imdbRating);
    //Rating on rotten tomatos
    console.log("Tomatoes Rating: " + response.data.Ratings[1].Value);
    // Country where the movie was produced.
     console.log('Country: ' + response.data.Country);
   // Language of the movie.
    console.log('Language: ' + response.data.Language);
     //  * Actors in the movie.
     console.log('Actors: ' + response.data.Actors);
     //  * Plot of the movie.
     console.log('Plot: ' + response.data.Plot);
   
});



} else if (process.argv[2] === "concert-this") {
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
}

// Then run a request to the OMDB API with the movie specified
var artistUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

axios.get(artistUrl).then(
  function(response) {
// This line is just to help us debug against the actual URL.

console.log(artistUrl);
// If the request is successful
//if (!error && response.statusCode === 200) {

    //console.log(response.data.length)

    for (j=0; j< response.data.length; j++) {

      let showtime =  response.data[j].datetime
        console.log( artist + ' will preform at the '
        + response.data[j].venue.name +' in '
        + response.data[j].venue.city + ', ' 
        + response.data[j].venue.region +' ('
        + response.data[j].venue.country + ') on '
        + moment(showtime).format('L'))
    }
   

   
 // }
});


} else if (process.argv[2] === "spotify-this-song") {
 
  let song = ""
  for (var i = 3; i < nodeArgs.length; i++) {
  
    if (i > 3 && i < nodeArgs.length) {
  
      song = song + "+" + nodeArgs[i];
  
    }
  
    else {
  
      song += nodeArgs[i];
  
    }
    
    spotify
    .search({ type: 'track', query: song })
    .then(function(response) {
      //console.log(response.tracks.items[0]);
      console.log('Song: ' + response.tracks.items[0].name);
      console.log('Album: ' + response.tracks.items[0].album.name);
      console.log('Artist(s): ' + response.tracks.items[0].artists[0].name);
      console.log('Check it out: ' + response.tracks.items[0].preview_url);
      return
    })
    .catch(function(err) {
      console.log(err);
    });
    }
    
  } else {
    console.log("I'm sorry. I didn't qute get that.")
}

//node tiri.js concert-this Pentatonix 
//node tiri.js spotify-this-song high of 75