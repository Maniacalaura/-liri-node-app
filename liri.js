require("dotenv").config();
var keys = require("./key");
var Twitter = require("twitter");
var Spotify = require('Node-Spotify-Api');
var request = require("request");
var fs = require("fs")
var commands = process.argv[2];
var search = process.argv.slice(3).join(" ");


var client = new Twitter(keys.twitter);

function tinaTweets(){
 
  var params = {screen_name: '@TinaBel32791019'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        var tweetHistory = [];
        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].text);
          tweetHistory.push("#" + (i + 1) + ': "' + tweets[i].text + '"');
      }
      }
  });
};        
// tinaTweets();

var spotify = new Spotify(keys.spotify)

function spotThis(){
  spotify.search({ type: 'track', query: search }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  console.log(data.tracks.items[0].artists[0].name);
  console.log(data.tracks.items[0].name);
  console.log(data.tracks.items[0].preview_url);
  console.log(data.tracks.items[0].album.name);
  });
}
// spotThis();


function movieThis() {
  request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
    if (!error && response.statusCode === 200) {
      if(!search) {
        search = "Mr Nobody"
      }
        console.log(JSON.parse(body).Title);
        console.log("Released in: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Tomatometer: " + JSON.parse(body).Ratings[1].Value);
        console.log("Produced in: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Starring" +JSON.parse(body).Actors);
    }
    
  });
};  

// function doIt(){
//   fs.readFile("random.txt", "utf8", function (e, content) {
//     if (e) {
//         return console.log("Error: " + e);
//     }
//   var random = content.split(",");
//   switch (random[0]){
//     case "spotify-this-song":
//     spotThis(random[0]);
//     break;
//   }
//   });
// };  


    switch (commands) {
      case "my-tweets":
      tinaTweets();
      break;

      case "spotify-this-song":
      spotThis();
      break; 

      case "movie-this":
      movieThis();
      break;

      case "do-what-it-says":
      doIt();
      break;
    }
switch (commands){

  case "spotify-this-song":
  if(!search) {
    search = "The Sign"
  }
  
  case "movie-this":
  if(!search) {
    search = "Mr Robot"
  }
  
}