var request = require("request"),
	keys = require('../api_keys/slack_keys');
	
var bot_text;

/* 
	Built during John Keefe's #MakeEveryWeek project
	See http://johnkeefe.net/make-every-week-lunch-bot

	The Slack webook URL used below is something you can get from inside the Slack app
	to send messages into a Slack channel. Since it's secret, I keep it 
	in a file outside of this directory structure so I don't accidentally 
	publish it on Github. I bring it above as "keys" from a file
	called slack_keys.js. The structure of that file is:
	
	var SLACK_WEBHOOK_URL = 'your_incoming_webhook_url_goes_here';

	    module.exports.SLACK_WEBHOOK_URL = SLACK_WEBHOOK_URL;
	
	If your code is going to stay private, you can skip this by deleting line 2
	and editing the first part of the options variable below like so:
	
	var options = {
		url: 'https://your-webhook-url-goes-here',
		...
	
*/

// List of restaurants and Google Maps urls as JSON	
var lunchSpots = [
    {
        "location": "https://www.google.de/maps/place/HPI+-+Hasso-Plattner-Institut/@52.393787,13.1296473,17z/data=!3m1!4b1!4m2!3m1!1s0x47a85f365d286349:0x1da4e14975e45e72?hl=en",
        "restaurant": "Ulfs Cafe",
        "details": "Today's menu is <http://www.ulfscafe.de/|here>. Better hurry, though. They start to run out of things after 1 p.m."
    },
    {
        "location": "https://www.google.de/maps/place/Gastst%C3%A4tte+Kashmir+Haus+Indische+Gastst%C3%A4tte/@52.39384,13.0887013,17z/data=!4m6!1m3!3m2!1s0x47a8f5f753b426cf:0xe1bf11d3505b73ff!2sGastst%C3%A4tte+Kashmir+Haus+Indische+Gastst%C3%A4tte!3m1!1s0x47a8f5f753b426cf:0xe1bf11d3505b73ff?hl=en",
        "restaurant": "kashmir Hause",
        "details": "Today's menu is <http://www.kashmir-haus.de/speisekarte_neu.htm|here>. Better hurry, though. They start to run out of things after 2 p.m."
    },
    {
        "location": "https://www.google.de/maps/place/Burgerb%C3%BCro/@52.39186,13.0923113,17z/data=!4m7!1m4!3m3!1s0x47a8f5f7b00cfb8f:0xc172d9cd81e73ac3!2sBurgerb%C3%BCro!3b1!3m1!1s0x47a8f5f7b00cfb8f:0xc172d9cd81e73ac3",
        "restaurant": "Burger Büro",
        "details": "Be sure to check out their <http://potsdam.redo-burgerbuero.de/|Very Pretty Website>." 
    },
    {
        "location": "https://www.google.de/maps/place/SoupWorld/@52.3939748,13.0897696,17z/data=!4m6!1m3!3m2!1s0x47a8f5d98b19b8cd:0xdca88237dd6f5a83!2sSoupWorld!3m1!1s0x47a8f5d98b19b8cd:0xdca88237dd6f5a83",
        "restaurant": "Soup World",
        "details": "Be sure to check out their <http://www.soupworld.de/|Very Pretty Website>." 
    },
    {
        "location": "https://www.google.de/maps/place/SoupWorld/@52.3939748,13.0897696,17z/data=!4m6!1m3!3m2!1s0x47a8f5d98b19b8cd:0xdca88237dd6f5a83!2sSoupWorld!3m1!1s0x47a8f5d98b19b8cd:0xdca88237dd6f5a83",
        "restaurant": "La Copa",
        "details": "Today's menu is <http://www.la-copa.de/texte/seite.php?id=102003|here>. Better hurry, though. They start to run out of things after 1 p.m." 
    },
    {
        "location": "https://www.google.de/maps/place/NORDSEE+GmbH/@52.3922433,13.0641087,17z/data=!3m1!4b1!4m2!3m1!1s0x47a8f5c20efdef07:0x407b4ee1d149b924",
        "restaurant": "NordSee, Potsdam Hbf"
	},
    {
        "location": "http://www.yelp.de/biz/subba-vietnamesische-k%C3%BCche-potsdam",
        "restaurant": "SuBBa Vietnamesische Küche"
	}
];

// Pick a number, 0 to the length of the restaurant list less one
var pick = Math.floor( Math.random() * (lunchSpots.length - 1 ) );

bot_text = "Today, may I suggest *" + lunchSpots[pick].restaurant + "*. It's <" + lunchSpots[pick].location + "|here>.";

if (lunchSpots[pick].details){
  bot_text = bot_text + " " + lunchSpots[pick].details;
}

console.log(bot_text);

// Compose the message and other details to send to Slack 
var payload = {
	text: bot_text,
	icon_emoji: ":poultry_leg:",
	username: "Lunch Bot",
	channel: "#test-integration"
};

// Set up the sending options for the request function.
// See note about the SLACK_WEBHOOK_URL above.
var options = {
	url: keys.SLACK_WEBHOOK_URL,
	method: 'POST',
	body: payload,
	json: true
};

// Send the webhook
request(options, function (error, response, body){
  if (!error && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log(error);
  }
});
