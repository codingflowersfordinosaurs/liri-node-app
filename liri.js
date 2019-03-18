// VARIABLES + KEYS(for the API stuff)
// code that will read and set any environment variables with the dotenv package
require("dotenv").config();

// VARS
// need the require
var request = require("request");
var fs = require("fs");
// code required to import the keys.js file and store it in a variable
var keys = require("./keys");
// able to access the keys information like so:
var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");
// need to to do process.argv[2] and process.argv[3]: because need user input and their pick of band/concert, song/artist, and movie pick
// vars to get user inputs
var userInputOpt = process.argv[2]; //og userInputs
var userInputPar = process.argv[3]; //og userPick

userInputs(userInputOpt, userInputPar);
// SWITCH: FOR COMMANDS AND FUNCTIONS
// when user inputs "concert-this", "spotify-this-song", etc. liri will run the function associated with those key words
function userInputs(userInputOpt, userInputPar) {
  switch (userInputOpt) {
    case "concert-this":
      showConcert(userInputPar);
      break;
  
    case "spotify-this-song":
      showSpotify(userInputPar);
      break;
  
    case "movie-this":
      showMovie(userInputPar);
      break;
  
    case "do-what-it-says":
      showInfo();
      break;
    // need to put in a default if user does not input the correct case
    default:
      console.log("Please input/type the option correctly. \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
  }
}

// FUNCTIONS
// Bands in Town
function showConcert(userInputPar) {
  console.log(userPick);
  // need the url to bands in town
  var queryUrl = "https://rest.bandsintown.com/artists/" + userInputPar + "/events?app_id=codingbootcamp";
  request(queryUrl, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      var concert = JSON.parse(body);
      for (var i = 0; i < concerts.length; i++) {
        console.log("∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
        // this should append in the log.txt file
        fs.appendFile("log.txt", "∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆\n");
        console.log(i);
        fs.appendFile("log.txt", i + "\n");
        console.log("Venue: " + concerts[i].venue.name);
        fs.appendFile("log.txt", "Venue: " + concerts[i].venue.name + "\n");
        console.log("Location: " + concrts[i].venue.city);
        fs.appendFile("log.txt", "Location: " + concerts[i].venue.city + "\n");
        console.log("Date: " + concerts[i].datetime);
        fs.appendFile("log.txt", "Date: " + concerts[i].datetime + "\n");
        console.log("∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
        fs.appendFile("log.txt", "∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆\n");
      }
    } else {
      console.log("Error occured. You will be attending Justice Beaver concerts for eternity.");
    }
  });
  // if user doesn't pick a band/concert, then this will show up
  // if (!err) {
  //   userPick = "Backstreet Boys";
  // }
}

// Spotify Function
function showSpotify(userInputPar) {

  // If user doesn't input an artist and song then this will be the one to show up
  if (!userInputPar) {
    // default song
    userPick = "Cher Believe";
  }
  spotify.search({
    type: 'track',
    query: userInputPar,
  },
    function (err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      var music = data.tracks.items;

      for (var i = 0; i < music.length; i++) {
        console.log("∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
        fs.appendFile("log.txt", "∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆\n");
        console.log(i);
        fs.appendFile("log.txt", i + "\n");
        console.log("Song Title: " + music[i].name);
        fs.appendFile("log.txt", "Song Title: " + music[i].name + "\n");
        console.log("Preview Link: " + music[i].preview_url);
        fs.appendFile("log.txt", "Preview Link: " + music[i].preview_url + "\n");
        console.log("Artist: " + music[i].artists[0].name);
        fs.appendFile("log.txt", "Artist: " + music[i].artist[0].name + "\n");
        console.log("Album: " + music[i].album.name);
        fs.appendFile("log.txt", "Album: " + music[i].album.name + "\n");
        console.log("∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
        fs.appendFile("log.txt", "∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆\n");
      }
    }
  );
} // end of function showSpotify(userPick)

// Movie Function OMDB
function showMovie(userInputPar) {
  // console.log(userPick);

  // if user doesn't pick a movie, then this will show up
  if (!userInputPar) {
    userInputPar = "Mr. Nobody";
    console.log("∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
    fs.appendFile("log.txt", "∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆\n");
    console.log("If you haven't watched 'Mr. Nobody', then you should.");
    fs.appendFile("log.txt", "If you haven't watched 'Mr. Nobody', then you should.");
    console.log("It is on Netflix.");
    fs.appendFile("log.txt", "It is on Netflix.");
  }

  // need to connect to the OMDB with the API key
  var queryUrl = "http://www.omdbapi.com/?t=" + userInputPar + "&y-&y=plot=short&apikey=trilogy";
  // console.log(queryURL);

  request(queryUrl, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      var movie = JSON.parse(body);
      console.log("∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
      fs.appendFile("log.txt", "∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
      console.log("Title: " + movie.Title);
      fs.appendFile("log.txt", "Title: " + movie.Title + "\n");

      console.log("Release Year: " + movie.Year);
      fs.appendFile("log.txt", "Release Year: " + movie.Year + "\n");

      console.log("IMDB Rating: " + movie.imdbRating);
      fs.appendFile("log.txt", "IMDB Rating: " + movie.imdbRating + "\n");

      console.log("Rotton Tomatoes Rating: " + movie.Ratings[1].Value);
      fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + movie.Ratings[1].Value + "\n");

      console.log("Country Produced: " + movie.Country);
      fs.appendFile("log.txt", "Country Produced: " + movie.Country + "\n");

      console.log("Plot: " + movie.Plot);
      fs.appendFile("log.txt", "Plot: " + movie.Plot + "\n");

      console.log("Actors: " + movie.Actors);
      fs.appendFile("log.txt", "Actors: " + movie.Actors + "\n");

      console.log("∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
      fs.appendFile("log.txt", "∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
    } else {
      console.log("An error occurred");
    }
  });
} // end of function showMovie(userPick)

// random info function
function showInfo() {
  fs.readFile("random.txt", "UTF8", function (err, data) {

    if (err) {
      console.log("An error occured: " + err);
    }
    // console.log(data);

    var dataArr = data.split(", ");
    userInputs(dataArr[0], dataArr[1]);
    // var it = dataArr[0];
    // var pick = dataArr[1];

    // if (it === "spotify-this-song") {
    //   userPick = pick;
    //   showSpotify(userPick);
    // } else if (it === "movie-this") {
    //   userPick = pick;
    //   showMovie(userPick);
    // } else if (it === "concert-this") {
    //   userPick = pick;
    //   showConcert(userPick);
    // }

  });
}
showInfo();
