# liri

## Required packages
Please install these packages
request, node-spotify-api, moment, fs

also please put spotify keys in a let keys.js file to call the spodfy api.


## To use:
  The second argument can be the name of any song, movie, or  band.
  The first argument can be any of the following:
    movie-this (if you are searching for a movie)
    concert-this (if you search for a band)
    spotify-this-song (if you search for a song)
    do-what-it-says (no second argument)

    
## Test cases
  node liri.js movie-this coco 
  node liri.js concert-this Pentatonix 
  node liri.js spotify-this-song high of 75
  node liri.js do-what-it-says

Tiri
----
(I realized half way though this project that we were supposed to use axios rather than request, so I recreated most of the functionality using that api)
var axios = require("axios");
 Tiri does not have a "do-what-it-says" feature


