require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];

if (input === "my-tweets") {
	tweets();
} else if (input === "spotify-this-song") {
	runSpotify();
} else if (input === "movie-this") {
	movie();
} else if (input === "do-what-it-says") {
	random();
} else {
	console.log("Sorry, I do not understand this input. Please try one of the following\n\nmy-tweets\n\nspotify-this-song (type song)\n\nmovie-this (type movie)\n\ndo-what-it-says");
};

function tweets() {
	var params = {screen_name: 'bencUMNBootcamp'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("Your last tweets were:\n");
            for (i=0;i<20;i++) {
                var text = '"' + tweets[i].text + '"\n';
                var created = tweets[i].created_at + "\n";
                console.log(text+created);
            }
        } else {
        	console.log(error);
        }
    });
};

function runSpotify() {
	var song = process.argv.slice(3);
	spotify.search({ type: 'track', query: song }, function(err, data) {
		if (!err) {
			console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name +
				"\nLink: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name);
		} else {
    	console.log('Error occurred: ' + err);
  	}
  });
 
 
};

function movie() {
	var movie = process.argv.slice(3);
	if (process.argv.length < 4) {
		movie = "Mr.Nobody";
	};
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    request.get(queryURL, function (error, response, body) {
    	var body = JSON.parse(body);
    	console.log("Title: " + body.Title + "\n" + "Year: " + body.Year + "\n" + 
    		"IMDB Rating: " + body.imdbRating + "\n" + "Country: " + body.Country + "\n" + 
    		"Language: " + body.Language + "\n" + "Plot: " + body.Plot + "\n" + 
    		"Actors: " + body.Actors + "\n");
    });
};

// function random() {

// }