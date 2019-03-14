// VARIABLES + KEYS(for the API stuff)
require("dotenv").config();

var keys = require("./keys");

var spotify = new spotify(keys.spotify);

// need to to do process.argv[2] and process.argv[3]: because need user input and their pick of band/concert, song/artist, and movie pick
var userInput = process.argv[2];
var userPick = process.argv[3];

// SWITCH: FOR COMMANDS AND FUNCTIONS
switch (userInput) {
  case "concert-this":
    showConcert(userPick);
    break;

  case "spotify-this-song":
    showSpotify(userPick);
    break;

  case "movie-this":
    showMovie(userPick);
    break;

  case "do-what-it-says":
    doIt();
    break;
}

// FUNCTIONS
function showConcert(userPick) {

}

function showSpotify(userPick) {

  // If user doesn't input an artist and song then this will be the one to show up
  if (!userPick) {
    userPick = "Cher Believe";
  }

  spotify.search({
    type: 'track',
    query: userPick,
  }, 
  function (err, data) {
    if (err) {
      console.log("Error occurred: " + err);
    } else {
      // console.log (JSON/stringify(data));
      console.log("∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
    }
  });

} // end of function showSpotify(userPick)

function showMovie(userPick) {
  console.log(userPick);

  // if user doesn't pick a movie, then this will show up
  if (!userPick) {
    userPick = "Mr. Nobody";
  }

  // need to connect to the OMDB with the API key
  var queryURL = "http://www.omdbapi.com/?t=" + userPick + "&y-&y=plot=short&apikey=trilogy";
  console.log(queryURL); //

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieObject = JSON.parse(body);
      console.log("∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
      console.log("Title: " + movieObject.Title);
      console.log("Release Year: " + movieObject.Year);
      console.log("IMDB Rating: " + movieObject.imdbRating);
      console.log("Rotton Tomatoes Rating: " + movieObject.Ratings[1].Value);
      console.log("Country Produced: " + movieObject.Country);
      console.log("Plot: " + movieObject.Plot);
      console.log("Actors: " + movieObject.Actors);
      console.log("∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆∆");
    } else {
      console.log("An error occurred");
    }
  });

} // end of function showMovie(userPick)

function doIt() {
  fs.readFile("random.txt", "UTF8", function(error, data) {
    
    if(error) {
      console.log("An error occured: " + error);
    }
    console.log(data);

    var dataArr = data.split(", ");
    var it = dataArr[0];
    var pick = dataArr[1];

    if (it === "spotify-this-song") {
      userPick = pick;
      showSpotify(userPick);
    } else if (it === "movie-this") {
      userPick = pick;
      showMovie(userPick);
    } else if (it === "concert-this") {
      userPick = pick;
      showConcert(userPick);
    }

  });
}
doIt();
