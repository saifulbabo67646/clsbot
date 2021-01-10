"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const deasync = require("deasync");
const cheerio = require("cheerio");
const sleep = require("sleep");
app.set("port", process.env.PORT || 5000);

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get("/", function(req, res) {
  res.send("Hello world, I am a chat bot");
}); //ruk bhai

// for Facebook verification
app.get("/webhook/", function(req, res) {
  if (req.query["hub.verify_token"] === "my_voice_is_my_password_verify_me") {
    res.send(req.query["hub.challenge"]);
  }
  res.send("Error, wrong token");
});

//url for all matches
var url = "http://cricapi.com/api/cricket";
let allmatches;

// Spin up the server
app.listen(app.get("port"), function() {
  console.log("running on port", app.get("port"));
});

//message identification
app.post("/webhook/", function(req, res) {
  let messaging_events = req.body.entry[0].messaging;
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i];
    let sender = event.sender.id;

    if (event.message && event.message.text) {
      let text = event.message.text;
    var  messageText=text.toLowerCase();
      console.log("\n \n \n \n Message recieved " + text);
    if (messageText) {
      switch(messageText){ 
        case 'saiful':
          broadcastMessage () ;
          break;
          
           case 'pak':case 'pakistan':case 'pakistan score':case 'pak score':
          pakistanScore(sender) ;
          break;
           case 'ind':case 'india':case 'india score':case 'ind score':
          indiaScore(sender) ;
          break;
          case 'ban':case 'bangladesh':case 'bangladesh score':case 'ban score':
          bangladeshScore(sender) ;
          break;
          case'score': case'live score':
          tellScore(sender);
          break;
      case'bpl':case'bpl score': case'chattogram': case'chittagong':case'dhaka':case'comilla':case'cumilla':case'sylhet':case'khulna':case'rangpur':case'rajshahi':
          bplScore(sender);
          break;
       /*case'india':case'india score':case'ind':   */
        default:
      //  tellScore(sender, "null");
        //  typing(sender);
sendTextMessage(sender,"Please Choose below which team is playing now otherwise you can Also choose Random Score from menu button .Stay with us for all live score. Or you can Also choose user manual for know how to use CLS Bot.");
      sendButton(sender, "null");
          break;
      }
    }
    } else if (event.postback) {
      let text = event.postback.payload;
      console.log("\n \n \n \n Postback recieved " + text);

      if (text.indexOf("more") > -1) {
        var ind = text.indexOf("^");
        var tex = text.substr(ind + 1);
        text = text.replace("more scores ", "").toLowerCase();
        text = text.replace("scores", "").toLowerCase();
        var idandsummary = text.toLowerCase().replace("more ", "");
        var index = idandsummary.indexOf("^"); // Gets the first index where a space occours
        var id = idandsummary.substr(0, index); // Gets the first part
        //var tex = idandsummary.substr(index + 1)
      //  typing(sender);
        tellScoredetails(sender, id, tex);
      } else if (text.indexOf("commentary") > -1) {
        text = text.replace("commentary ", "").toLowerCase();
        text = text.replace("commentary ", "").toLowerCase();
        var idtext = text.toLowerCase().replace("commentary ", "");
        var ind = idtext.indexOf("^");
        var id = idtext.substr(0, ind);
      //  typing(sender);
        getCommentry(sender, id);
      } else if (text.indexOf("refresh") > -1) {
      //  typing(sender);
        tellScore(sender, "null");
      } else if (text.indexOf("bangladesh") > -1) {
      //  typing(sender);
        bangladeshScore(sender);
      } else if (text.indexOf("india") > -1) {
        indiaScore(sender);
      } else if (text.indexOf("pakistan") > -1) {
        pakistanScore(sender);
      } else if (text.indexOf("srilanka") > -1) {
        srilankaScore(sender);
      } else if (text.indexOf("africa") > -1) {
        africaScore(sender);
      } else if (text.indexOf("windies") > -1) {
        windiesScore(sender);
      } else if (text.indexOf("australia") > -1) {
        australiaScore(sender);
      } else if (text.indexOf("newzealand") > -1) {
        newzealandScore(sender);
      } else if (text.indexOf("england") > -1) {
        englandScore(sender);
      } else if (text.indexOf("afghan") > -1) {
        afghanScore(sender);
      } else if (text.indexOf("zimbabwe") > -1) {
        zimbabweScore(sender);
      } else if (text.indexOf("usermanual")> -1){
        sendTextMessage(sender,"CLS Bot is another cricket live score teller bot . And there we will discuss How to easily you can use your favourite CLS Bot free .\n 👉👉Step 1: On the team selection Button you can choose any team who are playing this time otherwise its show other matches .👍 \n👉👉 Step 2: if you want to any cricket match scorecard you need to select Random Score from Menu Option .👍 \n 👉👉 Step 3: After that you need to select Show Details Option For those match full summary.👍 \n👉👉Step 4: After select your favorite Match you need to refresh Everytime when you want those match updates 👍 \n👉👉Step 5: yes💪 This is the best feature of your CLS Bot that you can see last 5 balls commentary by click the LAST FIVE BALLS option. \nIF you still Don't Understand please Watch the below Video.That's it✌✌ \n IF YOU Want to SEND ANY FEEDBACK YOU CAN EMAIL US FROM  REQUEST TO ADMIN Option.\n🙏 Please Share this video with your friend.");
        sendVideo(sender);
      } else if (text.indexOf("admin")>-1) {
sendTextMessage(sender,"Thanks for your feedback Please give Your  feedback  to this email  abbo67646@gmail.com ");
     }  else if (text.indexOf("mornotice")>-1) {
sendTextMessage(sender,"Please  Don't  forget to Like CLS Bot -Cricket Live Score Page  https://www.facebook.com/clsbot");
     } else if (text.indexOf("sendphoto") > -1) {
       sendphoto(sender);
     } else if (text.indexOf("bpl")>-1){
       bplScore(sender);
     } else if (text.indexOf("name")>-1){
       sendTextMessage(sender,"BPL Team Name:\n [Short Name--Full Name] \n (1) CW--Cumilla Warriors \n(2) RPR--Rangpur Riders \n(3) CGC--Chattogram Challengers \n(4) SYT--Sylhet Thunder \n(5) DP--Dhaka Platoon \n (6) KLT--Khulna Tigers \n (7) RSR--Rajshahi Royals ");
     } else if (text.indexOf("generic")>-1){
       sendGenericMessage(sender);
     }
      else if (text.indexOf("getstarted") > -1){
        sendTextMessage(sender,'Hey, Whats up? Welome to Cricket live score teller bot. please choose which team is playing now otherwise choose Random score .');
        sendButton(sender);
      }
    }
  }
  res.sendStatus(200);
});

// all matches init
function init() {
  allmatches = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-match/live-scores"
    },
    function(error, response, html) {
      if (!error) {
        allmatches = cheerio.load(html);
     //   console.log("\n \n got html \n\n" + allmatches);
      }
    }
  );
  deasync.loopWhile(function() {
    return allmatches === undefined;
  });
}

//page token
const token =
  "EAAgVilpcMScBABkLhurTx5L98zaXNZCuEX850ggGilZA7LqKeZC7T5swJoVfeK6ZB3knt7GaJd42aQocxXvLkekmDgZAetZAO5NDxsouw2FSGPRYTIP6ROXEgGEhFMdn4140jSF9Wzbj4bsVtkBMGKESRD6HfLT5P00GGlOjLPi0Wd8Wn9jU2ZBSwUAYuN2VZAMZD";
var t = [];
//Bangladesh
function getAll() {
  console.log(
    "getting all matches............................................."
  );
  allmatches = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-match/live-scores"
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        allmatches = body;
        //console.log("\n \n getting match details json"+JSON.stringify(allmatches));
      }
    }
  );
  deasync.loopWhile(function() {
    return allmatches === undefined;
  });

  var headers = [];
  var index = 0;
  var i;
  var temp = {};
  var maintemp = null;
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: []
      }
    }
  };

  if (allmatches !== undefined) {
    var c = 0;
    var headers = [];
    var links = [];
    var result = [];
    var short_summary = [];
    var short = [];
    var id = [];
    var scount = 0;

    allmatches = cheerio.load(allmatches);

    allmatches("h4").each(function() {
      headers.push(allmatches(this).text());
    });
    //console.log('\n\n'+headers.length+'\n\n');

    allmatches(".cbz-ui-status").each(function() {
      result.push(allmatches(this).text());
    });
    allmatches(".cbz-ui-status").each(function() {
      short_summary.push(allmatches(this).text());
      scount = scount + 1;
    });
    allmatches(".btn-group.cbz-btn-group").each(function() {
      var a = allmatches(this)
        .children()
        .first()
        .attr("href");
      links.push(a);
   //   console.log(a);
    });
    //for(i=0;i<scount;i+2){
    //short.push(short_summary[i]+' '+short_summary[i+1]);
    //		}
   /* console.log(
      "\n c length " +
        c +
        "\nlinks length " +
        links.length +
        " " +
        short.length +
        " " +
        result.length +
        " " +
        headers.length
    ); */

    for (a = 0; a < links.length; a++) {
      var idtext = links[a].replace("/cricket-commentary/", "");
      var idresult = idtext.split("/", 1);
      id.push(idresult[0]);
    }
    for (i = 0; i < headers.length; i++) {
     // console.log("inside header");
      var title = headers[i].toLowerCase();
    //  console.log("\n Teams playing are " + title);
      var imagetext = headers[i].replace(/ /g, "+");
      var indext = imagetext.indexOf(",");
      var imagetxt = imagetext.substr(0, indext);
      var imaget=imagetxt.replace(/ /g,"+");
   //   console.log(imagetxt);
    //  console.log(indext);
      temp = {
        title: headers[i],
        image_url: "http://placehold.it/1024x512/0084ff/f7f7f7?text="+imaget,
        subtitle : result[i],
        text: short[i],
        buttons: [
          {
            type: "postback",
            payload: "refresh",
            title: "Refresh ..."
          },
          {
            type: "postback",
            payload: "more scores " + id[i] + "^" + result[i],
            title: "Show Score Details..."
          }
        ]
      };
     // console.log(temp.title);
      c = c + 1;
      if (temp.title.indexOf("Ban") > -1) maintemp = temp;
      else if (
       
        temp.title.indexOf("Aus vs ") > -1 ||
        temp.title.indexOf('Aus')>-1 ||
        temp.title.indexOf("Eng vs ") > -1 ||
        temp.title.indexOf('Eng')>-1 ||
        temp.title.indexOf("Pak vs ") > -1 ||
        temp.title.indexOf('Ind')>-1 ||
        temp.title.indexOf('Pak')>-1 ||
        temp.title.indexOf("SL vs ") > -1 ||
        temp.title.indexOf('SL')>-1 ||
        temp.title.indexOf("RSA vs ") > -1 ||
        temp.title.indexOf('RSa')>-1 ||
        temp.title.indexOf("WI vs ") > -1 ||
        temp.title.indexOf('WI')>-1 ||
        temp.title.indexOf("Ind vs ") > -1 ||
        temp.title.indexOf("NZ vs ") > -1 ||
        temp.title.indexOf('NZ')>-1 ||
        temp.title.indexOf("Zim vs ") > -1 ||
        temp.title.indexOf('Zim')>-1 ||
        temp.title.indexOf("Afg vs ") > -1 ||
        temp.title.indexOf('Afg')>-1
      ) {
        t.unshift(temp);
      } else t[i] = temp;
    }
    if (maintemp != null) {
      t.unshift(maintemp);
    }
  //  console.log("\n\nmatch index is " + index);
   // console.log(a + index);
    if (index < c) {
      for (var a = 0; a < 10; a++) {
     //   console.log("\n \n data added in message is " + t[a + index] + "\n");

        if (t[index + a] === undefined || a + index == c) break;
        else messageData.attachment.payload.elements[a] = t[index + a];
      }
    } else {
      messageData = {
        text: "No more matches are played lately"
      };
    }
    console.log(
      "\n \n \n \n the data to be sent for all " + JSON.stringify(messageData)
    );

    return messageData;
  } else {
    temp = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Couldn't get any Matches, Retry!",
              image_url:
                "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
              subtitle: "Scores",
              buttons: [
                {
                  type: "postback",
                  payload: "refresh",
                  title: "Retry ..."
                }
              ]
            }
          ]
        }
      }
    };
    return temp;
  }
}

//getting commentry

//var comment;
let allcommentry = [];
function getCommentry(sender, id) {
  var commentary = [];
  var cLength = 0;
  var comment = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-commentary/" + id
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        comment = body;
        //console.log("\n \n getting match details json"+JSON.stringify(allmatches));
      }
    }
  );
  deasync.loopWhile(function() {
    return comment === undefined;
  });
  var e = cheerio.load(comment);
  e(".commtext").each(function() {
    commentary[cLength] = e(this).text();
    cLength = cLength + 1;
  });

  var result;
  e(".cbz-ui-status").each(function() {
    result = e(this).text();
  });

  if (
    (result.toLowerCase().indexOf("won") > -1) |
    (result.toLowerCase().indexOf("lose") > -1)
  ) {
    sendTextMessage(sender, "The match has finished, \n Top is last ball");
  } else sendTextMessage(sender, "Top is last ball");
  var messagecount = 0;
  for (var i = 0; i < cLength; i++) {
    var temp = commentary[i];
    if (
      (temp.toLowerCase().indexOf("1") === 0) |
      (temp.toLowerCase().indexOf("2") === 0) |
      (temp.toLowerCase().indexOf("3") === 0) |
      (temp.toLowerCase().indexOf("4") === 0) |
      (temp.toLowerCase().indexOf("5") === 0) |
      (temp.toLowerCase().indexOf("6") === 0) |
      (temp.toLowerCase().indexOf("7") === 0) |
      (temp.toLowerCase().indexOf("8") === 0) |
      (temp.toLowerCase().indexOf("9") === 0)
    ) {
      if (temp.length > 320) {
        temp = temp.slice(0, 320);
        var t = temp.lastIndexOf(" ");
        temp = temp.slice(0, t) + "...";
      }
      sendTextMessage(sender, temp);
      messagecount = messagecount + 1;
      if (messagecount === 6) break;
    }

    deasync.sleep(50); //ye karun kya? messages line se jaate hain isse meesage bhi kam karde 4-5
  }
}

//getting single details
let match;
let amma;
function getDetails(id, text) {
  console.log("\n\n" + text + "\n\n");
  if (text.indexOf("Starts") > -1) {
    temp = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "The Match hasn't started yet",
              image_url:
                "http://placehold.it/1024x512/0084ff/f7f7f7?text=Not+Started",
              subtitle: text,
              buttons: [
                {
                  type: "postback",
                  payload: "refresh",
                  title: "Other matches"
                }
              ]
            }
          ]
        }
      }
    };
    return temp;
  } else {
    var titlearr = [];
    var title = "";
    var textarr = [];
    var texts = "";
    console.log("getting details.............................................");
    match = undefined;
    request(
      {
        url: "http://m.cricbuzz.com/cricket-match-summary/" + id
      },
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          match = body;
         // console.log("\n \n getting match details json"+JSON.stringify(allmatches));
        }
      }
    );
    deasync.loopWhile(function() {
      return match === undefined;
    });
    var d = cheerio.load(match);
    d(".team-totals").each(function() {
      titlearr.push(d(this).text());
    });
    titlearr = titlearr.filter(function(n) {
      return n != undefined;
    });
  //  console.log(titlearr);
    console.log("\n\n" + titlearr.length + "\n\n");
    if (titlearr.length == 1) {
      title = titlearr[0];
    } else {
      title =
         titlearr[titlearr.length - 1]  + " vs " + titlearr[titlearr.length - 2];
    }
  //------new---
    amma= undefined; 
    request (
      {
			url: "http://m.cricbuzz.com/cricket-commentary/"+id
		}, function (error, response, body)
		{
			if (!error && response.statusCode === 200)
			{
				amma=body;
				//console.log("\n \n getting match details json"+JSON.stringify(allmatches));
			}
		});
		deasync.loopWhile(function(){return (amma === undefined);
                                });
		var s=cheerio.load(amma);
    
    s(".table.table-condensed b").each(function() {
      texts = texts + s(this).text() + " " + "\n";
    });
var score=    s("span.ui-bat-team-scores").text();
    var core=s("span.ui-bowl-team-scores").text();
    var lol=s(".commtext").text();
    console.log(score);
    console.log(core);
    console.log(lol);
  var titl=titlearr[titlearr.length - 2]
  var tit=score.replace (/ /g,'+');
    var lo =lol.replace("Download Cricbuzz mobile App",' ');
 // var abbo= score 
    
 console.log(texts);
    var i = 0;
    var temp = {};
    var found = false;
    if (match !== undefined) {
      temp = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: score +" vs "+ titl,
                image_url:
                  "https://fakeimg.pl/1024x512/0084ff,255/f7f7f7,255/?text="+tit+"&font=bebas&font_size=85",
                subtitle:texts,
                buttons: [
                  {
                    type: "postback",
                    payload: "more scores " + id + "^" + text,
                    title: "Refresh ..."
                  }
                ]
              },
              {
                title: lo,
                image_url:
                  "http://placehold.it/1024x512/0084ff/f7f7f7?text=Commentary",
                subtitle: "Press the button to get last 5 balls ",
                buttons: [
                  {
                    type: "postback",
                    payload: "more scores " + id + "^" + text,
                    title: "Refresh ..."
                  },
                  {
                    type: "postback",
                    payload: "commentary " + id + "^" + text,
                    title: "Last Five Balls"
                  }
                ]
              }
            ]
          }
        }
      };
      return temp;
    } else {
      temp = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: "Couldn't get the match Details, Retry!",
                image_url:
                  "hhttp://placehold.it/1024x512/0084ff/f7f7f7?text=No+Details",
                subtitle: "Scores",
                buttons: [
                  {
                    type: "postback",
                    payload: "more scores " + id + "^" + text,
                    title: "Retry ..."
                  }
                ]
              }
            ]
          }
        }
      };
      return temp;
    }
  }
}

function tellScore(sender) {
  let messageData = getAll();

  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}

function tellScoredetails(sender, id, text) {
  let messageData = getDetails(id, text);
  console.log("got details");
  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}
/////////////////
//notice board new
//////////////
function sendGenericMessage(sender) {
  var messageData = {
   /* recipient: {
      id: recipientId
    },*/
   
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [ {
            
            title: "  একুশে ফেব্রুয়ারি উপলক্ষ আমাদের নতুন বট Noticebd24.com এ মেসেজ করুন এখনই ",
            subtitle: " Noticebd24 বটে পাচ্ছেন নতুন নতুন সব এডুকেশনাল,  চাকরির, সাপ্তাহিক চাকরির পত্রিকা এবং বিভিন্ন বই ডাউনলোড সহ বিভিন্ন অফারের নোটিশ ",
            item_url: " https://www.facebook.com/noticebd24 ",               
            image_url: " https://cdn.glitch.com/d3e2a241-36ab-414f-9781-4e47668ac65e%2Fnoticebd24_logo.png?v=1582266849413 ",
            buttons: [{
              type: "web_url",
              url: "  https://www.facebook.com/noticebd24 ",
              title: "View Page "
               },{
              type: "web_url",
              title: "Send Message",
              url: "http://m.me/noticebd24",
            }],
                   } ]
        }
      }
    
  };  
   request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}


function sendTextMessage(sender, text) {
  let messageData = { text: text };
  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}
function sendButton(sender) {
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
        /* {
            "title": "BPL will Start from 11 December 2019 to 18 January 2020.Share CLS Bot more.",
            "buttons": [
              {
                "type": "postback",
                "title": "BPL Score",
                "payload": "bpl"
              },
              {
                "type":"postback",
                "title":"BPL Teams Name",
                "payload":"name"
              },
              {
                "type": "postback",
                "title": "BPL Schedule",
                "payload": "sendphoto"
              }
            ]
          }, */{
            title: "Select which team is now playing otherwise select Random Score From menu.",
            buttons: [
              {
                type: "postback",
                title: "Bangladesh 🇧🇩",
                payload: "bangladesh"
              },
              {
                type: "postback",
                title: "India 🇮🇳",
                payload: "india"
              },
              {
                type: "postback",
                title: "Pakistan 🇵🇰",
                payload: "pakistan"
              }
            ]
          },
          {
            title: "Select which team is now playing otherwise select Random score.",
            buttons: [
              {
                type: "postback",
                title: "Sri Lanka 🇱🇰",
                payload: "srilanka"
              },
              {
                type: "postback",
                title: "South Africa 🇿🇦",
                payload: "africa"
              },
              {
                type: "postback",
                title: "West Indies ",
                payload: "windies"
              }
            ]
          },
          {
            title: "Select which team is now playing otherwise select Random Score.",
            buttons: [
              {
                type: "postback",
                title: "Australia 🇦🇺",
                payload: "australia"
              },
              {
                type: "postback",
                title: "New Zealand 🇳🇿",
                payload: "newzealand"
              },
              {
                type: "postback",
                title: "England 🇬🇧",
                payload: "england"
              }
            ]
          },
          {
            title: "Select which team is now playing otherwise select Random Score.",
            buttons: [
              {
                type: "postback",
                title: "Afghanistan 🇦🇫",
                payload: "afghan"
              },
              {
                type: "postback",
                title: "Zimbabwe 🇿🇼",
                payload: "zimbabwe"
              },
              {
                type: "postback",
                title: "IPL will coming",
                payload: "bangladesh"
              }
            ]
          }
        ]
      }
    }
  };
  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}

// Setting persistent menu
var data_start = {
      greeting: [
        {
          locale: 'default',
          text: 'Hello {{user_first_name}}, this is your cricket live score teller assistant.This bot is gifted from Saiful islam'
        }
      ]
};

setMessengerProgile(data_start);

var data_starts = {
   get_started: {
    payload: 'getstarted'
  }
};

setMessengerProgile(data_starts);

var data_startd = {
  persistent_menu: [
    {
       locale: 'default',
      composer_input_disabled: false,
      call_to_actions: [
        {
          title: 'Notice Board',
          type: 'postback',
          payload: 'generic'
        },
        {
          title: 'Random Score',
          type: 'postback',
          payload: 'refresh'
        },
        {
          title: 'User Option',
          type: 'nested',
        //  payload: 'bangladeshScore'
           call_to_actions:[
          {
            title:"User Manual",
            type:"postback",
            payload:"usermanual"
          },
          {
            title:"Request to Admin",
            type:"postback",
            payload:"admin"
          },
          {
            title:"More Notice",
            type:"postback",
            payload:"mornotice",
          }
        ]
        }
      ]
    }
  ]
};

setMessengerProgile(data_startd);

//------------

function setMessengerProgile(messageData){
   request({
     uri: 'https://graph.facebook.com/v2.6/me/messenger_profile',
     qs: { access_token: token},
     method: 'POST',
     json:  messageData
     
   }, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       //console.log("Welcome set!!");
     } else {
       //console.error("Unable to set messenger profile");
     }
   });
}

//send broadcast messages
function creativeBroadcastMessage(messageData) {
   request({
     uri: 'https://graph.facebook.com/v2.11/me/message_creatives',
     qs: { access_token: token },
     method: 'POST',
     json: messageData
     
   },  function (error, response, body) {    
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_creative_id;

      console.log("Successfully create broadcast message with id %s to recipient %s", 
        messageId, recipientId);
      callSendAPIBroadcast(messageId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });
}
//----------
function callSendAPIBroadcast(messageBCID) {
  var messageBC = {
     message_creative_id: messageBCID,
     notification_type: 'REGULAR',
     //tag: 'PAIRING_UPDATE'
  };
  
  
  request({
     uri: 'https://graph.facebook.com/v2.11/me/broadcast_messages',
     qs: { access_token: token },
     method: 'POST',
     json: messageBC
     
   },  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.broadcast_id;

      console.log("Successfully send broadcast message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
  
  
}
//--------
function broadcastMessage () {
 var messageData= {
  messages: [
    {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: 'একুশে ফেব্রুয়ারি উপলক্ষ আমাদের নতুন বট Noticebd24.com এ মেসেজ করুন এখনই ',
            image_url: 'https://cdn.glitch.com/d3e2a241-36ab-414f-9781-4e47668ac65e%2Fnoticebd24_logo.png?v=1582266849413',
            subtitle: 'Noticebd24 বটে পাচ্ছেন নতুন নতুন সব এডুকেশনাল,  চাকরির, সাপ্তাহিক চাকরির পত্রিকা এবং বিভিন্ন বই ডাউনলোড সহ বিভিন্ন অফারের নোটিশ ',
            buttons: [
              {
                type: 'web_url',
                url: 'https://www.facebook.com/noticebd24 ',
                title: 'Visit Page'
              }, {
                type: 'web_url',
                url: 'https://m.me/noticebd24 ',
                title: 'send message to Bot'
              }
            ]
          }
        ]
      }
    }
    }
  ]
};
  
  
  creativeBroadcastMessage(messageData);
}
//---------photo-------

function sendphoto(sender){
const get_random_photo = ((ar) => ( ar[ Math.floor( Math.random() * ar.length ) ] ))
var photo1 = "https://cdn.glitch.com/53ef0a4d-0dd6-4943-8d30-f20d5fb79224%2Fbpl-2019-schedule.jpg?v=1574945719306";
var photo2="https://cdn.glitch.com/53ef0a4d-0dd6-4943-8d30-f20d5fb79224%2FBD-Pratidin_2019-12-09-12.jpg?v=1575883736637";
const photo = [photo2]

{
 var messageData = {   
    
        attachment: {
            type: "image",
            payload: {
                url: get_random_photo( photo )
            }
        }
    
}
}
request(
    {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json:
        {
	    recipient : {id : sender},
            message: messageData,
        }
    }, function(error, response, body)
        {
            if (error)
            {
                console.log('Error sending messages: ', error);}
            else if (response.body.error)
            {
                console.log('Error: ', response.body.error);
            }
        });
}
//------video-------
function sendVideo(sender){
const get_random_Video = ((ar) => ( ar[ Math.floor( Math.random() * ar.length ) ] ))
var Video1 = "https://dl.dropbox.com/s/73t3o2xs9hauvjc/clsbot.mp4?dl=0";

const Video = [Video1]

{
 var messageData = {   
    
        attachment: {
            type: "video",
            payload: {
                url: get_random_Video( Video )
            }
        }
    
}
}
request(
    {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json:
        {
	    recipient : {id : sender},
            message: messageData,
        }
    }, function(error, response, body)
        {
            if (error)
            {
                console.log('Error sending messages: ', error);}
            else if (response.body.error)
            {
                console.log('Error: ', response.body.error);
            }
        });
}


//typing on 
/*
function typing(sender) {
  var messageData = {
   recipient:{
    id:sender 
  },
  "sender_action":"typing_on"
}
request(
    {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        message: messageData,
        
    }, function(error, response, body)
        {
            if (error)
            {
                console.log('Error sending messages: ', error);}
            else if (response.body.error)
            {
                console.log('Error: ', response.body.error);
            }
        });
}
*/

//India
function india() {
  console.log(
    "getting all matches............................................."
  );
  allmatches = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-match/live-scores"
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        allmatches = body;
        //console.log("\n \n getting match details json"+JSON.stringify(allmatches));
      }
    }
  );
  deasync.loopWhile(function() {
    return allmatches === undefined;
  });

  var headers = [];
  var index = 0;
  var i;
  var temp = {};
  var maintemp = null;
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: []
      }
    }
  };

  if (allmatches !== undefined) {
    var c = 0;
    var headers = [];
    var links = [];
    var result = [];
    var short_summary = [];
    var short = [];
    var id = [];
    var scount = 0;

    allmatches = cheerio.load(allmatches);

    allmatches("h4").each(function() {
      headers.push(allmatches(this).text());
    });
    //console.log('\n\n'+headers.length+'\n\n');

    allmatches(".cbz-ui-status").each(function() {
      result.push(allmatches(this).text());
    });
    allmatches(".cbz-ui-status").each(function() {
      short_summary.push(allmatches(this).text());
      scount = scount + 1;
    });
    allmatches(".btn-group.cbz-btn-group").each(function() {
      var a = allmatches(this)
        .children()
        .first()
        .attr("href");
      links.push(a);
   //   console.log(a);
    });
    //for(i=0;i<scount;i+2){
    //short.push(short_summary[i]+' '+short_summary[i+1]);
    //		}
/*    console.log(
      "\n c length " +
        c +
        "\nlinks length " +
        links.length +
        " " +
        short.length +
        " " +
        result.length +
        " " +
        headers.length
    ); */

    for (a = 0; a < links.length; a++) {
      var idtext = links[a].replace("/cricket-commentary/", "");
      var idresult = idtext.split("/", 1);
      id.push(idresult[0]);
    }
    for (i = 0; i < headers.length; i++) {
    //  console.log("inside header");
      var title = headers[i].toLowerCase();
   //   console.log("\n Teams playing are " + title);
      var imagetext = headers[i].replace(" vs ", "+vs+");
      var indext = imagetext.indexOf(",");
      var imagetxt = imagetext.substr(0, indext);
      var imaget = imagetxt.replace(/ /g,"+");
      temp = {
        title: headers[i],
        image_url:
          "http://placehold.it/1024x512/0084ff/f7f7f7?text=" + imaget,
        subtitle: result[i],
        text: short[i],
        buttons: [
          {
            type: "postback",
            payload: "refresh",
            title: "Refresh ..."
          },
          {
            type: "postback",
            payload: "more scores " + id[i] + "^" + result[i],
            title: "Show Details ..."
          }
        ]
      };
      c = c + 1;
      if (temp.title.indexOf("Ind vs ") > -1) maintemp = temp;
      else if (
        temp.title.indexOf("Ind") > -1 
        /* ||
        temp.title.indexOf("Aus vs ") > -1 ||
        temp.title.indexOf("Eng vs ") > -1 ||
        temp.title.indexOf("Pak vs ") > -1 ||
        temp.title.indexOf("SL vs ") > -1 ||
        temp.title.indexOf("RSA vs ") > -1 ||
        temp.title.indexOf("WI vs ") > -1 ||
        temp.title.indexOf("Ban vs ") > -1 ||
        temp.title.indexOf("NZ vs ") > -1 ||
        temp.title.indexOf("Zim vs ") > -1 ||
        temp.title.indexOf("Afg vs ") > -1 */
      ) {
        t.unshift(temp);
      } else t[i] = temp;
    }
    if (maintemp != null) {
      t.unshift(maintemp);
    }
    console.log("\n\nmatch index is " + index);
    if (index < c) {
      for (var a = 0; a < 10; a++) {
     //   console.log("\n \n data added in message is " + t[a + index] + "\n");

        if (t[index + a] === undefined || a + index == c) break;
        else messageData.attachment.payload.elements[a] = t[index + a];
      }
    } else {
      messageData = {
        text: "No more matches are played lately"
      };
    }
    console.log(
      "\n \n \n \n the data to be sent for all " + JSON.stringify(messageData)
    );

    return messageData;
  } else {
    temp = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Couldn't get any Matches, Retry!",
              image_url:
                "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
              subtitle: "Scores",
              buttons: [
                {
                  type: "postback",
                  payload: "refresh",
                  title: "Retry ..."
                }
              ]
            }
          ]
        }
      }
    };
    return temp;
  }
}
///////////////////
function indiaScore(sender) {
  let messageData = india();

  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}
//pakistan
function pakistan() {
  console.log(
    "getting all matches............................................."
  );
  allmatches = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-match/live-scores"
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        allmatches = body;
        //console.log("\n \n getting match details json"+JSON.stringify(allmatches));
      }
    }
  );
  deasync.loopWhile(function() {
    return allmatches === undefined;
  });

  var headers = [];
  var index = 0;
  var i;
  var temp = {};
  var maintemp = null;
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: []
      }
    }
  };

  if (allmatches !== undefined) {
    var c = 0;
    var headers = [];
    var links = [];
    var result = [];
    var short_summary = [];
    var short = [];
    var id = [];
    var scount = 0;

    allmatches = cheerio.load(allmatches);

    allmatches("h4").each(function() {
      headers.push(allmatches(this).text());
    });
    //console.log('\n\n'+headers.length+'\n\n');

    allmatches(".cbz-ui-status").each(function() {
      result.push(allmatches(this).text());
    });
    allmatches(".cbz-ui-status").each(function() {
      short_summary.push(allmatches(this).text());
      scount = scount + 1;
    });
    allmatches(".btn-group.cbz-btn-group").each(function() {
      var a = allmatches(this)
        .children()
        .first()
        .attr("href");
      links.push(a);
    //  console.log(a);
    });
    //for(i=0;i<scount;i+2){
    //short.push(short_summary[i]+' '+short_summary[i+1]);
    //		}
/*    console.log(
      "\n c length " +
        c +
        "\nlinks length " +
        links.length +
        " " +
        short.length +
        " " +
        result.length +
        " " +
        headers.length
    );  */

    for (a = 0; a < links.length; a++) {
      var idtext = links[a].replace("/cricket-commentary/", "");
      var idresult = idtext.split("/", 1);
      id.push(idresult[0]);
    }
    for (i = 0; i < headers.length; i++) {
    //  console.log("inside header");
      var title = headers[i].toLowerCase();
   //   console.log("\n Teams playing are " + title);
      var imagetext = headers[i].replace(" vs ", "+vs+");
      var indext = imagetext.indexOf(",");
      var imagetxt = imagetext.substr(0, indext);
      var imaget = imagetxt.replace(/ /g,"+");
      temp = {
        title: headers[i],
        image_url:
          "http://placehold.it/1024x512/0084ff/f7f7f7?text=" + imaget,
        subtitle: result[i],
        text: short[i],
        buttons: [
          {
            type: "postback",
            payload: "refresh",
            title: "Refresh ..."
          },
          {
            type: "postback",
            payload: "more scores " + id[i] + "^" + result[i],
            title: "Show Details ..."
          }
        ]
      };
      c = c + 1;
      if (temp.title.indexOf("Pak vs ") > -1) maintemp = temp;
      else if (
        temp.title.indexOf("Pak") > -1   
        /* ||
        temp.title.indexOf("Aus vs ") > -1 ||
        temp.title.indexOf("Eng vs ") > -1 ||
        temp.title.indexOf("Ind vs ") > -1 ||
        temp.title.indexOf("SL vs ") > -1 ||
        temp.title.indexOf("RSA vs ") > -1 ||
        temp.title.indexOf("WI vs ") > -1 ||
        temp.title.indexOf("Ban vs ") > -1 ||
        temp.title.indexOf("NZ vs ") > -1 ||
        temp.title.indexOf("Zim vs ") > -1 ||
        temp.title.indexOf("Afg vs ") > -1 */
      ) {
        t.unshift(temp);
      }  else t[i] = temp;
    }
    if (maintemp != null) {
      t.unshift(maintemp);
    }
    console.log("\n\nmatch index is " + index);
    if (index < c) {
      for (var a = 0; a < 10; a++) {
     //   console.log("\n \n data added in message is " + t[a + index] + "\n");

        if (t[index + a] === undefined || a + index == c) break;
        else messageData.attachment.payload.elements[a] = t[index + a];
      }
    } else {
      messageData = {
        text: "No more matches are played lately"
      };
    }
    console.log(
      "\n \n \n \n the data to be sent for all " + JSON.stringify(messageData)
    );

    return messageData;
  } else {
    temp = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Couldn't get any Matches, Retry!",
              image_url:
                "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
              subtitle: "Scores",
              buttons: [
                {
                  type: "postback",
                  payload: "refresh",
                  title: "Retry ..."
                }
              ]
            }
          ]
        }
      }
    };
    return temp;
  }
}

///////////////////
function pakistanScore(sender) {
  let messageData = pakistan();

  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}
//srilanka
function srilanka() {
  console.log(
    "getting all matches............................................."
  );
  allmatches = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-match/live-scores"
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        allmatches = body;
        //console.log("\n \n getting match details json"+JSON.stringify(allmatches));
      }
    }
  );
  deasync.loopWhile(function() {
    return allmatches === undefined;
  });

  var headers = [];
  var index = 0;
  var i;
  var temp = {};
  var maintemp = null;
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: []
      }
    }
  };

  if (allmatches !== undefined) {
    var c = 0;
    var headers = [];
    var links = [];
    var result = [];
    var short_summary = [];
    var short = [];
    var id = [];
    var scount = 0;

    allmatches = cheerio.load(allmatches);

    allmatches("h4").each(function() {
      headers.push(allmatches(this).text());
    });
    //console.log('\n\n'+headers.length+'\n\n');

    allmatches(".cbz-ui-status").each(function() {
      result.push(allmatches(this).text());
    });
    allmatches(".cbz-ui-status").each(function() {
      short_summary.push(allmatches(this).text());
      scount = scount + 1;
    });
    allmatches(".btn-group.cbz-btn-group").each(function() {
      var a = allmatches(this)
        .children()
        .first()
        .attr("href");
      links.push(a);
     // console.log(a);
    });
    //for(i=0;i<scount;i+2){
    //short.push(short_summary[i]+' '+short_summary[i+1]);
    //		}
    /* console.log(
      "\n c length " +
        c +
        "\nlinks length " +
        links.length +
        " " +
        short.length +
        " " +
        result.length +
        " " +
        headers.length
    ); */

    for (a = 0; a < links.length; a++) {
      var idtext = links[a].replace("/cricket-commentary/", "");
      var idresult = idtext.split("/", 1);
      id.push(idresult[0]);
    }
    for (i = 0; i < headers.length; i++) {
      // console.log("inside header");
      var title = headers[i].toLowerCase();
    //  console.log("\n Teams playing are " + title);
      var imagetext = headers[i].replace(" vs ", "+vs+");
      var indext = imagetext.indexOf(",");
      var imagetxt = imagetext.substr(0, indext);
      var imaget = imagetxt.replace(/ /g,"+");
      temp = {
        title: headers[i],
        image_url:
          "http://placehold.it/1024x512/0084ff/f7f7f7?text=" + imaget,
        subtitle: result[i],
        text: short[i],
        buttons: [
          {
            type: "postback",
            payload: "refresh",
            title: "Refresh ..."
          },
          {
            type: "postback",
            payload: "more scores " + id[i] + "^" + result[i],
            title: "Show Details ..."
          }
        ]
      };
      c = c + 1;
      if (temp.title.indexOf("SL vs ") > -1) maintemp = temp;
      else if (
        temp.title.indexOf("SL") > -1 
        /* ||
        temp.title.indexOf("Aus vs ") > -1 ||
        temp.title.indexOf("Eng vs ") > -1 ||
        temp.title.indexOf("Ind vs ") > -1 ||
        temp.title.indexOf("Pak vs ") > -1 ||
        temp.title.indexOf("RSA vs ") > -1 ||
        temp.title.indexOf("WI vs ") > -1 ||
        temp.title.indexOf("Ban vs ") > -1 ||
        temp.title.indexOf("NZ vs ") > -1 ||
        temp.title.indexOf("Zim vs ") > -1 ||
        temp.title.indexOf("Afg vs ") > -1 */
      ) {
        t.unshift(temp);
      } else t[i] = temp;
    }
    if (maintemp != null) {
      t.unshift(maintemp);
    }
    console.log("\n\nmatch index is " + index);
    if (index < c) {
      for (var a = 0; a < 10; a++) {
      //  console.log("\n \n data added in message is " + t[a + index] + "\n");

        if (t[index + a] === undefined || a + index == c) break;
        else messageData.attachment.payload.elements[a] = t[index + a];
      }
    } else {
      messageData = {
        text: "No more matches are played lately"
      };
    }
    console.log(
      "\n \n \n \n the data to be sent for all " + JSON.stringify(messageData)
    );

    return messageData;
  } else {
    temp = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Couldn't get any Matches, Retry!",
              image_url:
                "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
              subtitle: "Scores",
              buttons: [
                {
                  type: "postback",
                  payload: "refresh",
                  title: "Retry ..."
                }
              ]
            }
          ]
        }
      }
    };
    return temp;
  }
}

///////////////////
function srilankaScore(sender) {
  let messageData = srilanka();

  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}
//africa
function africa() {
  console.log(
    "getting all matches............................................."
  );
  allmatches = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-match/live-scores"
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        allmatches = body;
        //console.log("\n \n getting match details json"+JSON.stringify(allmatches));
      }
    }
  );
  deasync.loopWhile(function() {
    return allmatches === undefined;
  });

  var headers = [];
  var index = 0;
  var i;
  var temp = {};
  var maintemp = null;
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: []
      }
    }
  };

  if (allmatches !== undefined) {
    var c = 0;
    var headers = [];
    var links = [];
    var result = [];
    var short_summary = [];
    var short = [];
    var id = [];
    var scount = 0;

    allmatches = cheerio.load(allmatches);

    allmatches("h4").each(function() {
      headers.push(allmatches(this).text());
    });
    //console.log('\n\n'+headers.length+'\n\n');

    allmatches(".cbz-ui-status").each(function() {
      result.push(allmatches(this).text());
    });
    allmatches(".cbz-ui-status").each(function() {
      short_summary.push(allmatches(this).text());
      scount = scount + 1;
    });
    allmatches(".btn-group.cbz-btn-group").each(function() {
      var a = allmatches(this)
        .children()
        .first()
        .attr("href");
      links.push(a);
    //  console.log(a);
    });
    //for(i=0;i<scount;i+2){
    //short.push(short_summary[i]+' '+short_summary[i+1]);
    //		}
 /*   console.log(
      "\n c length " +
        c +
        "\nlinks length " +
        links.length +
        " " +
        short.length +
        " " +
        result.length +
        " " +
        headers.length
    ); */

    for (a = 0; a < links.length; a++) {
      var idtext = links[a].replace("/cricket-commentary/", "");
      var idresult = idtext.split("/", 1);
      id.push(idresult[0]);
    }
    for (i = 0; i < headers.length; i++) {
    //  console.log("inside header");
      var title = headers[i].toLowerCase();
  //    console.log("\n Teams playing are " + title);
      var imagetext = headers[i].replace(" vs ", "+vs+");
      var indext = imagetext.indexOf(",");
      var imagetxt = imagetext.substr(0, indext);
      var imaget = imagetxt.replace(/ /g,"+");
      temp = {
        title: headers[i],
        image_url:
          "http://placehold.it/1024x512/0084ff/f7f7f7?text=" + imaget,
        subtitle: result[i],
        text: short[i],
        buttons: [
          {
            type: "postback",
            payload: "refresh",
            title: "Refresh ..."
          },
          {
            type: "postback",
            payload: "more scores " + id[i] + "^" + result[i],
            title: "Show Details ..."
          }
        ]
      };
      c = c + 1;
      if (temp.title.indexOf("RSA vs ") > -1) maintemp = temp;
      else if (
        temp.title.indexOf("RSA") > -1 
        /* ||
        temp.title.indexOf("Aus vs ") > -1 ||
        temp.title.indexOf("Eng vs ") > -1 ||
        temp.title.indexOf("Ind vs ") > -1 ||
        temp.title.indexOf("SL vs ") > -1 ||
        temp.title.indexOf("Pak vs ") > -1 ||
        temp.title.indexOf("WI vs ") > -1 ||
        temp.title.indexOf("Ban vs ") > -1 ||
        temp.title.indexOf("NZ vs ") > -1 ||
        temp.title.indexOf("Zim vs ") > -1 ||
        temp.title.indexOf("Afg vs ") > -1 */
      ) {
        t.unshift(temp);
      } else t[i] = temp;
    }
    if (maintemp != null) {
      t.unshift(maintemp);
    }
    console.log("\n\nmatch index is " + index);
    if (index < c) {
      for (var a = 0; a < 10; a++) {
      //  console.log("\n \n data added in message is " + t[a + index] + "\n");

        if (t[index + a] === undefined || a + index == c) break;
        else messageData.attachment.payload.elements[a] = t[index + a];
      }
    } else {
      messageData = {
        text: "No more matches are played lately"
      };
    }
    console.log(
      "\n \n \n \n the data to be sent for all " + JSON.stringify(messageData)
    );

    return messageData;
  } else {
    temp = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Couldn't get any Matches, Retry!",
              image_url:
                "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
              subtitle: "Scores",
              buttons: [
                {
                  type: "postback",
                  payload: "refresh",
                  title: "Retry ..."
                }
              ]
            }
          ]
        }
      }
    };
    return temp;
  }
}

///////////////////
function africaScore(sender) {
  let messageData = africa();

  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}
//windies
function windies() {
  console.log(
    "getting all matches............................................."
  );
  allmatches = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-match/live-scores"
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        allmatches = body;
        //console.log("\n \n getting match details json"+JSON.stringify(allmatches));
      }
    }
  );
  deasync.loopWhile(function() {
    return allmatches === undefined;
  });

  var headers = [];
  var index = 0;
  var i;
  var temp = {};
  var maintemp = null;
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: []
      }
    }
  };

  if (allmatches !== undefined) {
    var c = 0;
    var headers = [];
    var links = [];
    var result = [];
    var short_summary = [];
    var short = [];
    var id = [];
    var scount = 0;

    allmatches = cheerio.load(allmatches);

    allmatches("h4").each(function() {
      headers.push(allmatches(this).text());
    });
    //console.log('\n\n'+headers.length+'\n\n');

    allmatches(".cbz-ui-status").each(function() {
      result.push(allmatches(this).text());
    });
    allmatches(".cbz-ui-status").each(function() {
      short_summary.push(allmatches(this).text());
      scount = scount + 1;
    });
    allmatches(".btn-group.cbz-btn-group").each(function() {
      var a = allmatches(this)
        .children()
        .first()
        .attr("href");
      links.push(a);
     // console.log(a);
    });
    //for(i=0;i<scount;i+2){
    //short.push(short_summary[i]+' '+short_summary[i+1]);
    //		}
 /*   console.log(
      "\n c length " +
        c +
        "\nlinks length " +
        links.length +
        " " +
        short.length +
        " " +
        result.length +
        " " +
        headers.length
    ); */

    for (a = 0; a < links.length; a++) {
      var idtext = links[a].replace("/cricket-commentary/", "");
      var idresult = idtext.split("/", 1);
      id.push(idresult[0]);
    }
    for (i = 0; i < headers.length; i++) {
     // console.log("inside header");
      var title = headers[i].toLowerCase();
   //   console.log("\n Teams playing are " + title);
      var imagetext = headers[i].replace(" vs ", "+vs+");
      var indext = imagetext.indexOf(",");
      var imagetxt = imagetext.substr(0, indext);
      var imaget = imagetxt.replace(/ /g,"+");
      temp = {
        title: headers[i],
        image_url:
          "http://placehold.it/1024x512/0084ff/f7f7f7?text=" + imaget,
        subtitle: result[i],
        text: short[i],
        buttons: [
          {
            type: "postback",
            payload: "refresh",
            title: "Refresh ..."
          },
          {
            type: "postback",
            payload: "more scores " + id[i] + "^" + result[i],
            title: "Show Details ..."
          }
        ]
      };
      c = c + 1;
      if (temp.title.indexOf("WI vs ") > -1) maintemp = temp;
      else if (
        temp.title.indexOf("WI") > -1 
        /* ||
        temp.title.indexOf("Aus vs ") > -1 ||
        temp.title.indexOf("Eng vs ") > -1 ||
        temp.title.indexOf("Ind vs ") > -1 ||
        temp.title.indexOf("SL vs ") > -1 ||
        temp.title.indexOf("Pak vs ") > -1 ||
        temp.title.indexOf("RSA vs ") > -1 ||
        temp.title.indexOf("Ban vs ") > -1 ||
        temp.title.indexOf("NZ vs ") > -1 ||
        temp.title.indexOf("Zim vs ") > -1 ||
        temp.title.indexOf("Afg vs ") > -1 */
      ) {
        t.unshift(temp);
      } else t[i] = temp;
    }
    if (maintemp != null) {
      t.unshift(maintemp);
    }
    console.log("\n\nmatch index is " + index);
    if (index < c) {
      for (var a = 0; a < 10; a++) {
      //  console.log("\n \n data added in message is " + t[a + index] + "\n");

        if (t[index + a] === undefined || a + index == c) break;
        else messageData.attachment.payload.elements[a] = t[index + a];
      }
    } else {
      messageData = {
        text: "No more matches are played lately"
      };
    }
    console.log(
      "\n \n \n \n the data to be sent for all " + JSON.stringify(messageData)
    );

    return messageData;
  } else {
    temp = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Couldn't get any Matches, Retry!",
              image_url:
                "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
              subtitle: "Scores",
              buttons: [
                {
                  type: "postback",
                  payload: "refresh",
                  title: "Retry ..."
                }
              ]
            }
          ]
        }
      }
    };
    return temp;
  }
}

///////////////////
function windiesScore(sender) {
  let messageData = windies();

  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}
//australia
function australia() {
  console.log(
    "getting all matches............................................."
  );
  allmatches = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-match/live-scores"
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        allmatches = body;
        //console.log("\n \n getting match details json"+JSON.stringify(allmatches));
      }
    }
  );
  deasync.loopWhile(function() {
    return allmatches === undefined;
  });

  var headers = [];
  var index = 0;
  var i;
  var temp = {};
  var maintemp = null;
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: []
      }
    }
  };

  if (allmatches !== undefined) {
    var c = 0;
    var headers = [];
    var links = [];
    var result = [];
    var short_summary = [];
    var short = [];
    var id = [];
    var scount = 0;

    allmatches = cheerio.load(allmatches);

    allmatches("h4").each(function() {
      headers.push(allmatches(this).text());
    });
    //console.log('\n\n'+headers.length+'\n\n');

    allmatches(".cbz-ui-status").each(function() {
      result.push(allmatches(this).text());
    });
    allmatches(".cbz-ui-status").each(function() {
      short_summary.push(allmatches(this).text());
      scount = scount + 1;
    });
    allmatches(".btn-group.cbz-btn-group").each(function() {
      var a = allmatches(this)
        .children()
        .first()
        .attr("href");
      links.push(a);
     // console.log(a);
    });
    //for(i=0;i<scount;i+2){
    //short.push(short_summary[i]+' '+short_summary[i+1]);
    //		}
  /*  console.log(
      "\n c length " +
        c +
        "\nlinks length " +
        links.length +
        " " +
        short.length +
        " " +
        result.length +
        " " +
        headers.length
    ); */

    for (a = 0; a < links.length; a++) {
      var idtext = links[a].replace("/cricket-commentary/", "");
      var idresult = idtext.split("/", 1);
      id.push(idresult[0]);
    }
    for (i = 0; i < headers.length; i++) {
    //  console.log("inside header");
      var title = headers[i].toLowerCase();
  //    console.log("\n Teams playing are " + title);
      var imagetext = headers[i].replace(" vs ", "+vs+");
      var indext = imagetext.indexOf(",");
      var imagetxt = imagetext.substr(0, indext);
      var imaget = imagetxt.replace(/ /g,"+");
      temp = {
        title: headers[i],
        image_url:
          "http://placehold.it/1024x512/0084ff/f7f7f7?text=" + imaget,
        subtitle: result[i],
        text: short[i],
        buttons: [
          {
            type: "postback",
            payload: "refresh",
            title: "Refresh ..."
          },
          {
            type: "postback",
            payload: "more scores " + id[i] + "^" + result[i],
            title: "Show Details ..."
          }
        ]
      };
      c = c + 1;
      if (temp.title.indexOf("Aus vs ") > -1) maintemp = temp;
      else if (
        temp.title.indexOf("Aus") > -1 
        /* ||
        temp.title.indexOf("WI vs ") > -1 ||
        temp.title.indexOf("Eng vs ") > -1 ||
        temp.title.indexOf("Ind vs ") > -1 ||
        temp.title.indexOf("SL vs ") > -1 ||
        temp.title.indexOf("Pak vs ") > -1 ||
        temp.title.indexOf("RSA vs ") > -1 ||
        temp.title.indexOf("Ban vs ") > -1 ||
        temp.title.indexOf("NZ vs ") > -1 ||
        temp.title.indexOf("Zim vs ") > -1 ||
        temp.title.indexOf("Afg vs ") > -1 */
      ) {
        t.unshift(temp);
      } else t[i] = temp;
    }
    if (maintemp != null) {
      t.unshift(maintemp);
    }
    console.log("\n\nmatch index is " + index);
    if (index < c) {
      for (var a = 0; a < 10; a++) {
      //  console.log("\n \n data added in message is " + t[a + index] + "\n");

        if (t[index + a] === undefined || a + index == c) break;
        else messageData.attachment.payload.elements[a] = t[index + a];
      }
    } else {
      messageData = {
        text: "No more matches are played lately"
      };
    }
    console.log(
      "\n \n \n \n the data to be sent for all " + JSON.stringify(messageData)
    );

    return messageData;
  } else {
    temp = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Couldn't get any Matches, Retry!",
              image_url:
                "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
              subtitle: "Scores",
              buttons: [
                {
                  type: "postback",
                  payload: "refresh",
                  title: "Retry ..."
                }
              ]
            }
          ]
        }
      }
    };
    return temp;
  }
}

///////////////////
function australiaScore(sender) {
  let messageData = australia();

  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}
//newzealand
function newzealand() {
  console.log(
    "getting all matches............................................."
  );
  allmatches = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-match/live-scores"
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        allmatches = body;
        //console.log("\n \n getting match details json"+JSON.stringify(allmatches));
      }
    }
  );
  deasync.loopWhile(function() {
    return allmatches === undefined;
  });

  var headers = [];
  var index = 0;
  var i;
  var temp = {};
  var maintemp = null;
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: []
      }
    }
  };

  if (allmatches !== undefined) {
    var c = 0;
    var headers = [];
    var links = [];
    var result = [];
    var short_summary = [];
    var short = [];
    var id = [];
    var scount = 0;

    allmatches = cheerio.load(allmatches);

    allmatches("h4").each(function() {
      headers.push(allmatches(this).text());
    });
    //console.log('\n\n'+headers.length+'\n\n');

    allmatches(".cbz-ui-status").each(function() {
      result.push(allmatches(this).text());
    });
    allmatches(".cbz-ui-status").each(function() {
      short_summary.push(allmatches(this).text());
      scount = scount + 1;
    });
    allmatches(".btn-group.cbz-btn-group").each(function() {
      var a = allmatches(this)
        .children()
        .first()
        .attr("href");
      links.push(a);
    //  console.log(a);
    });
    //for(i=0;i<scount;i+2){
    //short.push(short_summary[i]+' '+short_summary[i+1]);
    //		}
  /*   console.log(
      "\n c length " +
        c +
        "\nlinks length " +
        links.length +
        " " +
        short.length +
        " " +
        result.length +
        " " +
        headers.length
    ); */

    for (a = 0; a < links.length; a++) {
      var idtext = links[a].replace("/cricket-commentary/", "");
      var idresult = idtext.split("/", 1);
      id.push(idresult[0]);
    }
    for (i = 0; i < headers.length; i++) {
    //  console.log("inside header");
      var title = headers[i].toLowerCase();
  //    console.log("\n Teams playing are " + title);
      var imagetext = headers[i].replace(" vs ", "+vs+");
      var indext = imagetext.indexOf(",");
      var imagetxt = imagetext.substr(0, indext);
      var imaget = imagetxt.replace(/ /g,"+");
      temp = {
        title: headers[i],
        image_url:
          "http://placehold.it/1024x512/0084ff/f7f7f7?text=" + imaget,
        subtitle: result[i],
        text: short[i],
        buttons: [
          {
            type: "postback",
            payload: "refresh",
            title: "Refresh ..."
          },
          {
            type: "postback",
            payload: "more scores " + id[i] + "^" + result[i],
            title: "Show Details ..."
          }
        ]
      };
      c = c + 1;
      if (temp.title.indexOf("NZ vs ") > -1) maintemp = temp;
      else if (
        temp.title.indexOf("NZ") > -1 
        /* ||
        temp.title.indexOf("Aus vs ") > -1 ||
        temp.title.indexOf("Eng vs ") > -1 ||
        temp.title.indexOf("Ind vs ") > -1 ||
        temp.title.indexOf("Pak vs ") > -1 ||
        temp.title.indexOf("RSA vs ") > -1 ||
        temp.title.indexOf("WI vs ") > -1 ||
        temp.title.indexOf("Ban vs ") > -1 ||
        temp.title.indexOf("SL vs ") > -1 ||
        temp.title.indexOf("Zim vs ") > -1 ||
        temp.title.indexOf("Afg vs ") > -1 */
      ) {
        t.unshift(temp);
      } else t[i] = temp;
    }
    if (maintemp != null) {
      t.unshift(maintemp);
    }
    console.log("\n\nmatch index is " + index);
    if (index < c) {
      for (var a = 0; a < 10; a++) {
       // console.log("\n \n data added in message is " + t[a + index] + "\n");

        if (t[index + a] === undefined || a + index == c) break;
        else messageData.attachment.payload.elements[a] = t[index + a];
      }
    } else {
      messageData = {
        text: "No more matches are played lately"
      };
    }
    console.log(
      "\n \n \n \n the data to be sent for all " + JSON.stringify(messageData)
    );

    return messageData;
  } else {
    temp = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Couldn't get any Matches, Retry!",
              image_url:
                "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
              subtitle: "Scores",
              buttons: [
                {
                  type: "postback",
                  payload: "refresh",
                  title: "Retry ..."
                }
              ]
            }
          ]
        }
      }
    };
    return temp;
  }
}

///////////////////
function newzealandScore(sender) {
  let messageData = newzealand();

  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}
//England
function england() {
  console.log(
    "getting all matches............................................."
  );
  allmatches = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-match/live-scores"
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        allmatches = body;
        //console.log("\n \n getting match details json"+JSON.stringify(allmatches));
      }
    }
  );
  deasync.loopWhile(function() {
    return allmatches === undefined;
  });

  var headers = [];
  var index = 0;
  var i;
  var temp = {};
  var maintemp = null;
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: []
      }
    }
  };

  if (allmatches !== undefined) {
    var c = 0;
    var headers = [];
    var links = [];
    var result = [];
    var short_summary = [];
    var short = [];
    var id = [];
    var scount = 0;

    allmatches = cheerio.load(allmatches);

    allmatches("h4").each(function() {
      headers.push(allmatches(this).text());
    });
    //console.log('\n\n'+headers.length+'\n\n');

    allmatches(".cbz-ui-status").each(function() {
      result.push(allmatches(this).text());
    });
    allmatches(".cbz-ui-status").each(function() {
      short_summary.push(allmatches(this).text());
      scount = scount + 1;
    });
    allmatches(".btn-group.cbz-btn-group").each(function() {
      var a = allmatches(this)
        .children()
        .first()
        .attr("href");
      links.push(a);
     //  console.log(a);
    });
    //for(i=0;i<scount;i+2){
    //short.push(short_summary[i]+' '+short_summary[i+1]);
    //		}
 /*   console.log(
      "\n c length " +
        c +
        "\nlinks length " +
        links.length +
        " " +
        short.length +
        " " +
        result.length +
        " " +
        headers.length
    ); */

    for (a = 0; a < links.length; a++) {
      var idtext = links[a].replace("/cricket-commentary/", "");
      var idresult = idtext.split("/", 1);
      id.push(idresult[0]);
    }
    for (i = 0; i < headers.length; i++) {
      // console.log("inside header");
      var title = headers[i].toLowerCase();
   //   console.log("\n Teams playing are " + title);
      var imagetext = headers[i].replace(" vs ", "+vs+");
      var indext = imagetext.indexOf(",");
      var imagetxt = imagetext.substr(0, indext);
      var imaget = imagetxt.replace(/ /g,"+");
      temp = {
        title: headers[i],
        image_url:
          "http://placehold.it/1024x512/0084ff/f7f7f7?text=" + imaget,
        subtitle: result[i],
        text: short[i],
        buttons: [
          {
            type: "postback",
            payload: "refresh",
            title: "Refresh ..."
          },
          {
            type: "postback",
            payload: "more scores " + id[i] + "^" + result[i],
            title: "Show Details ..."
          }
        ]
      };
      c = c + 1;
      if (temp.title.indexOf("Eng vs ") > -1) maintemp = temp;
      else if (
        temp.title.indexOf("Eng") > -1 
        /* ||
        temp.title.indexOf("Aus vs ") > -1 ||
        temp.title.indexOf("NZ vs ") > -1 ||
        temp.title.indexOf("Ind vs ") > -1 ||
        temp.title.indexOf("Pak vs ") > -1 ||
        temp.title.indexOf("RSA vs ") > -1 ||
        temp.title.indexOf("WI vs ") > -1 ||
        temp.title.indexOf("Ban vs ") > -1 ||
        temp.title.indexOf("SL vs ") > -1 ||
        temp.title.indexOf("Zim vs ") > -1 ||
        temp.title.indexOf("Afg vs ") > -1 */
      ) {
        t.unshift(temp);
      } else t[i] = temp;
    }
    if (maintemp != null) {
      t.unshift(maintemp);
    }
    console.log("\n\nmatch index is " + index);
    if (index < c) {
      for (var a = 0; a < 10; a++) {
     //   console.log("\n \n data added in message is " + t[a + index] + "\n");

        if (t[index + a] === undefined || a + index == c) break;
        else messageData.attachment.payload.elements[a] = t[index + a];
      }
    } else {
      messageData = {
        text: "No more matches are played lately"
      };
    }
    console.log(
      "\n \n \n \n the data to be sent for all " + JSON.stringify(messageData)
    );

    return messageData;
  } else {
    temp = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Couldn't get any Matches, Retry!",
              image_url:
                "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
              subtitle: "Scores",
              buttons: [
                {
                  type: "postback",
                  payload: "refresh",
                  title: "Retry ..."
                }
              ]
            }
          ]
        }
      }
    };
    return temp;
  }
}

///////////////////
function englandScore(sender) {
  let messageData = england();

  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}
//Afghanistan
function afghan() {
  console.log(
    "getting all matches............................................."
  );
  allmatches = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-match/live-scores"
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        allmatches = body;
        //console.log("\n \n getting match details json"+JSON.stringify(allmatches));
      }
    }
  );
  deasync.loopWhile(function() {
    return allmatches === undefined;
  });

  var headers = [];
  var index = 0;
  var i;
  var temp = {};
  var maintemp = null;
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: []
      }
    }
  };

  if (allmatches !== undefined) {
    var c = 0;
    var headers = [];
    var links = [];
    var result = [];
    var short_summary = [];
    var short = [];
    var id = [];
    var scount = 0;

    allmatches = cheerio.load(allmatches);

    allmatches("h4").each(function() {
      headers.push(allmatches(this).text());
    });
    //console.log('\n\n'+headers.length+'\n\n');

    allmatches(".cbz-ui-status").each(function() {
      result.push(allmatches(this).text());
    });
    allmatches(".cbz-ui-status").each(function() {
      short_summary.push(allmatches(this).text());
      scount = scount + 1;
    });
    allmatches(".btn-group.cbz-btn-group").each(function() {
      var a = allmatches(this)
        .children()
        .first()
        .attr("href");
      links.push(a);
   //   console.log(a);
    });
    //for(i=0;i<scount;i+2){
    //short.push(short_summary[i]+' '+short_summary[i+1]);
    //		}
 /*   console.log(
      "\n c length " +
        c +
        "\nlinks length " +
        links.length +
        " " +
        short.length +
        " " +
        result.length +
        " " +
        headers.length
    ); */

    for (a = 0; a < links.length; a++) {
      var idtext = links[a].replace("/cricket-commentary/", "");
      var idresult = idtext.split("/", 1);
      id.push(idresult[0]);
    }
    for (i = 0; i < headers.length; i++) {
    //  console.log("inside header");
      var title = headers[i].toLowerCase();
   //   console.log("\n Teams playing are " + title);
      var imagetext = headers[i].replace(" vs ", "+vs+");
      var indext = imagetext.indexOf(",");
      var imagetxt = imagetext.substr(0, indext);
      var imaget = imagetxt.replace(/ /g,"+");
      temp = {
        title: headers[i],
        image_url:
          "http://placehold.it/1024x512/0084ff/f7f7f7?text=" + imaget,
        subtitle: result[i],
        text: short[i],
        buttons: [
          {
            type: "postback",
            payload: "refresh",
            title: "Refresh ..."
          },
          {
            type: "postback",
            payload: "more scores " + id[i] + "^" + result[i],
            title: "Show Details ..."
          }
        ]
      };
      c = c + 1;
      if (temp.title.indexOf("Afg vs ") > -1) maintemp = temp;
      else if (
        temp.title.indexOf("Afg") > -1 
        /*  ||
        temp.title.indexOf("Aus vs ") > -1 ||
        temp.title.indexOf("NZ vs ") > -1 ||
        temp.title.indexOf("Ind vs ") > -1 ||
        temp.title.indexOf("Pak vs ") > -1 ||
        temp.title.indexOf("RSA vs ") > -1 ||
        temp.title.indexOf("WI vs ") > -1 ||
        temp.title.indexOf("Ban vs ") > -1 ||
        temp.title.indexOf("SL vs ") > -1 ||
        temp.title.indexOf("Zim vs ") > -1 ||
        temp.title.indexOf("Eng vs ") > -1  */
      ) {
        t.unshift(temp);
      } else t[i] = temp;
    }
    if (maintemp != null) {
      t.unshift(maintemp);
    }
    console.log("\n\nmatch index is " + index);
    if (index < c) {
      for (var a = 0; a < 10; a++) {
    //    console.log("\n \n data added in message is " + t[a + index] + "\n");

        if (t[index + a] === undefined || a + index == c) break;
        else messageData.attachment.payload.elements[a] = t[index + a];
      }
    } else {
      messageData = {
        text: "No more matches are played lately"
      };
    }
    console.log(
      "\n \n \n \n the data to be sent for all " + JSON.stringify(messageData)
    );

    return messageData;
  } else {
    temp = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Couldn't get any Matches, Retry!",
              image_url:
                "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
              subtitle: "Scores",
              buttons: [
                {
                  type: "postback",
                  payload: "refresh",
                  title: "Retry ..."
                }
              ]
            }
          ]
        }
      }
    };
    return temp;
  }
}

///////////////////
function afghanScore(sender) {
  let messageData = afghan();

  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}
//Zimbabwe
function zimbabwe() {
  console.log(
    "getting all matches............................................."
  );
  allmatches = undefined;
  request(
    {
      url: "http://m.cricbuzz.com/cricket-match/live-scores"
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        allmatches = body;
        //console.log("\n \n getting match details json"+JSON.stringify(allmatches));
      }
    }
  );
  deasync.loopWhile(function() {
    return allmatches === undefined;
  });

  var headers = [];
  var index = 0;
  var i;
  var temp = {};
  var maintemp = null;
  var messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: []
      }
    }
  };

  if (allmatches !== undefined) {
    var c = 0;
    var headers = [];
    var links = [];
    var result = [];
    var short_summary = [];
    var short = [];
    var id = [];
    var scount = 0;

    allmatches = cheerio.load(allmatches);

    allmatches("h4").each(function() {
      headers.push(allmatches(this).text());
    });
    //console.log('\n\n'+headers.length+'\n\n');

    allmatches(".cbz-ui-status").each(function() {
      result.push(allmatches(this).text());
    });
    allmatches(".cbz-ui-status").each(function() {
      short_summary.push(allmatches(this).text());
      scount = scount + 1;
    });
    allmatches(".btn-group.cbz-btn-group").each(function() {
      var a = allmatches(this)
        .children()
        .first()
        .attr("href");
      links.push(a);
  //    console.log(a);
    });
    //for(i=0;i<scount;i+2){
    //short.push(short_summary[i]+' '+short_summary[i+1]);
    //		}
 /*   console.log(
      "\n c length " +
        c +
        "\nlinks length " +
        links.length +
        " " +
        short.length +
        " " +
        result.length +
        " " +
        headers.length
    ); */

    for (a = 0; a < links.length; a++) {
      var idtext = links[a].replace("/cricket-commentary/", "");
      var idresult = idtext.split("/", 1);
      id.push(idresult[0]);
    }
    for (i = 0; i < headers.length; i++) {
    //  console.log("inside header");
      var title = headers[i].toLowerCase();
    //  console.log("\n Teams playing are " + title);
      var imagetext = headers[i].replace(" vs ", "+vs+");
      var indext = imagetext.indexOf(",");
      var imagetxt = imagetext.substr(0, indext);
      var imaget = imagetxt.replace(/ /g,"+");
      temp = {
        title: headers[i],
        image_url:
          "http://placehold.it/1024x512/0084ff/f7f7f7?text=" + imaget,
        subtitle: result[i],
        text: short[i],
        buttons: [
          {
            type: "postback",
            payload: "refresh",
            title: "Refresh ..."
          },
          {
            type: "postback",
            payload: "more scores " + id[i] + "^" + result[i],
            title: "Show Details ..."
          }
        ]
      };
      c = c + 1;
      if (temp.title.indexOf("Zim vs ") > -1) maintemp = temp;
      else if (
        temp.title.indexOf("Zim") > -1 
        /* ||
        temp.title.indexOf("Aus vs ") > -1 ||
        temp.title.indexOf("NZ vs ") > -1 ||
        temp.title.indexOf("Ind vs ") > -1 ||
        temp.title.indexOf("Pak vs ") > -1 ||
        temp.title.indexOf("RSA vs ") > -1 ||
        temp.title.indexOf("WI vs ") > -1 ||
        temp.title.indexOf("Ban vs ") > -1 ||
        temp.title.indexOf("SL vs ") > -1 ||
        temp.title.indexOf("Afg vs ") > -1 ||
        temp.title.indexOf("Eng vs ") > -1 */
      ) {
        t.unshift(temp);
      } else t[i] = temp;
    }
    if (maintemp != null) {
      t.unshift(maintemp);
    }
    console.log("\n\nmatch index is " + index);
    if (index < c) {
      for (var a = 0; a < 10; a++) {
      //  console.log("\n \n data added in message is " + t[a + index] + "\n");

        if (t[index + a] === undefined || a + index == c) break;
        else messageData.attachment.payload.elements[a] = t[index + a];
      }
    } else {
      messageData = {
        text: "No more matches are played lately"
      };
    }
    console.log(
      "\n \n \n \n the data to be sent for all " + JSON.stringify(messageData)
    );

    return messageData;
  } else {
    temp = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Couldn't get any Matches, Retry!",
              image_url:
                "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
              subtitle: "Scores",
              buttons: [
                {
                  type: "postback",
                  payload: "refresh",
                  title: "Retry ..."
                }
              ]
            }
          ]
        }
      }
    };
    return temp;
  }
}

///////////////////
function zimbabweScore(sender) {
  let messageData = zimbabwe();

  request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: token },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log("Error sending messages: ", error);
      } else if (response.body.error) {
        console.log("Error: ", response.body.error);
      }
    }
  );
}
//Bangladesh

function bangladesh()
{

	console.log('getting all matches.............................................');
	allmatches = undefined;
	request(
	{
		url: "http://m.cricbuzz.com/cricket-match/live-scores"
	}, function (error, response, body)
	{
		if (!error && response.statusCode === 200)
		{
			allmatches=body;
			//console.log("\n \n getting match details json"+JSON.stringify(allmatches));
		}
	});
	deasync.loopWhile(function(){return (allmatches === undefined);});
	
	
	var headers=[];
	var index =0; 
	var i;
	var temp = {};
	var maintemp = null
	var messageData =
	{
		"attachment" :
	    {
	        "type" : "template",
	        "payload" : 
	        {
	        	"template_type" : "generic",
	        	"elements" :[]
		}
	     }
	};
	
        if(allmatches !==undefined)
        {
			var c =0;
			var headers=[];
			var links=[];
			var result=[];
			var short_summary=[];
			var short = [];
			var id=[];
			var scount=0
			
			allmatches=cheerio.load(allmatches);
			
			allmatches('h4').each(function()
			{
				headers.push(allmatches(this).text());
			});
			//console.log('\n\n'+headers.length+'\n\n');
			
			allmatches('.cbz-ui-status').each(function()
			{
				result.push(allmatches(this).text());
			});
			allmatches('.cbz-ui-status').each(function()
			{
				short_summary.push(allmatches(this).text());
				scount=scount+1
			})
			allmatches('.btn-group.cbz-btn-group').each(function()
			{
				var a=allmatches(this).children().first().attr('href');
				links.push(a);
			//	console.log(a);
			});
			//for(i=0;i<scount;i+2){
				//short.push(short_summary[i]+' '+short_summary[i+1]);
					//		}
		//	console.log("\n c length "+ c+"\nlinks length "+links.length+" "+short.length+" "+result.length+" "+headers.length);
			
			for (a=0;(a<links.length);a++)
			{
	
					var idtext=links[a].replace('/cricket-commentary/','');
					var idresult=idtext.split('/',1);
					id.push(idresult[0]);}			
	    		    	for(i=0;i<headers.length;i++)
			        {	
			//		console.log("inside header");
			        	var title = headers[i].toLowerCase();
	    		    //		console.log("\n Teams playing are "+title);
	        			var imagetext=headers[i].replace(' vs ','+vs+')
					var indext=imagetext.indexOf(',')
					var imagetxt=imagetext.substr(0,indext)
          var imaget = imagetxt.replace(/ /g,"+");
	        			temp = 
	        			{
	        				"title" : headers[i],
							"image_url" : "http://placehold.it/1024x512/0084ff/f7f7f7?text="+imaget,
							"subtitle" :result[i],
							"text":short[i],
	    	    			"buttons" :
			        		[
								{
        							"type" : "postback",
        							"payload" : "refresh",
		        					"title" : "Refresh ..."
								},
							    {
	        						"type" : "postback",
			        				"payload" : "more scores "+id[i]+'^'+result[i],
	    		    				"title" : "Show Details ..."
			    		    	}
						    ]
						};
						c=c+1;
						if (temp.title.indexOf('Ban vs ')>-1)
							maintemp = temp;
						else if((temp.title.indexOf('Ban')>-1)
/*||(temp.title.indexOf('Eng vs ')>-1)||(temp.title.indexOf('Ind vs ')>-1)||(temp.title.indexOf('Pak vs ')>-1)||(temp.title.indexOf('RSA vs ')>-1)||(temp.title.indexOf('WI vs ')>-1)||(temp.title.indexOf('SL vs ')>-1)||(temp.title.indexOf('NZ vs ')>-1)||(temp.title.indexOf('Zim vs ')>-1)||(temp.title.indexOf('Afg vs ')>-1)*/
             )
						{
				   			t.unshift(temp);
						}
						else
							t[i] = temp;
						}
						if (maintemp != null)
						{
							t.unshift(maintemp);
						}
						console.log("\n\nmatch index is "+index);
						if(index < c)
						{
							for(var a=0; a<10; a++)
							{
							//	console.log("\n \n data added in message is "+t[a+index]+"\n");
					
								if((t[index+a] === undefined)||(a+index == c))
									break;
								else
									messageData.attachment.payload.elements[a] = t[index+a];
							}
						}
						else
						{
							messageData =
							{
								text : "No more matches are played lately"
							};
						}
						console.log("\n \n \n \n the data to be sent for all "+JSON.stringify(messageData));
			
						return messageData;
       	}
        else
        {
        	temp = 
        		{
        			"attachment" :
        			{
        				"type" : "template",
        				"payload" : 
        				{
        					"template_type" : "generic",
        					"elements" :
        					[
        						{
        							"title" : "Couldn't get any Matches, Retry!",
									"image_url" : "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
				        			"subtitle" : "Scores",
    	    						"buttons" :
        							[
				        				{
        									"type" : "postback",
        									"payload" : "refresh",
        									"title" : "Retry ..."
		        						}
			        				]
			        			},
			        		]
			        	}
			        }
       			};
        	return temp;
        }
        
}

///////////////////
function bangladeshScore(sender)
{	
  
    let messageData = bangladesh();
    
    request(
    {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json:
        {
	    recipient : {id : sender},
            message: messageData,
        }
    }, function(error, response, body)
        {
            if (error)
            {
                console.log('Error sending messages: ', error);}
            else if (response.body.error)
            {
                console.log('Error: ', response.body.error);
            }
        });
}

//BPL will coming soon
function bpl()
{

	console.log('getting all matches.............................................');
	allmatches = undefined;
	request(
	{
		url: "http://m.cricbuzz.com/cricket-match/live-scores"
	}, function (error, response, body)
	{
		if (!error && response.statusCode === 200)
		{
			allmatches=body;
			//console.log("\n \n getting match details json"+JSON.stringify(allmatches));
		}
	});
	deasync.loopWhile(function(){return (allmatches === undefined);});
	
	
	var headers=[];
	var index =0; 
	var i;
	var temp = {};
	var maintemp = null
	var messageData =
	{
		"attachment" :
	    {
	        "type" : "template",
	        "payload" : 
	        {
	        	"template_type" : "generic",
	        	"elements" :[]
		}
	     }
	};
	
        if(allmatches !==undefined)
        {
			var c =0;
			var headers=[];
			var links=[];
			var result=[];
			var short_summary=[];
			var short = [];
			var id=[];
			var scount=0
			
			allmatches=cheerio.load(allmatches);
			
			allmatches('h4').each(function()
			{
				headers.push(allmatches(this).text());
			});
			//console.log('\n\n'+headers.length+'\n\n');
			
			allmatches('.cbz-ui-status').each(function()
			{
				result.push(allmatches(this).text());
			});
			allmatches('.cbz-ui-status').each(function()
			{
				short_summary.push(allmatches(this).text());
				scount=scount+1
			})
			allmatches('.btn-group.cbz-btn-group').each(function()
			{
				var a=allmatches(this).children().first().attr('href');
				links.push(a);
			//	console.log(a);
			});
			//for(i=0;i<scount;i+2){
				//short.push(short_summary[i]+' '+short_summary[i+1]);
					//		}
		//	console.log("\n c length "+ c+"\nlinks length "+links.length+" "+short.length+" "+result.length+" "+headers.length);
			
			for (a=0;(a<links.length);a++)
			{
	
					var idtext=links[a].replace('/cricket-commentary/','');
					var idresult=idtext.split('/',1);
					id.push(idresult[0]);}			
	    		    	for(i=0;i<headers.length;i++)
			        {	
				//	console.log("inside header");
			        	var title = headers[i].toLowerCase();
	    		    //		console.log("\n Teams playing are "+title);
	        			var imagetext=headers[i].replace(' ','+')
					var indext=imagetext.indexOf(',')
					var imagetxt=imagetext.substr(0,indext)
          var vai= imagetxt.replace(/cgc/gi,"Chittagong")
      var va=vai.replace(/klt/gi,"Khulna")
      var saivai=va.replace(/dp/gi,"Dhaka")
      var sai=saivai.replace(/cw/gi,"Cumilla")
      var saif=sai.replace(/slt/gi,"Sylhet")
      var saifu=saif.replace(/rpr/gi,"Rangpur")
      var sa=saifu.replace(/rsr/gi,"Rajshahi")
      
					var imaget = sa.replace(/ /g,"+");
             console.log(imaget); 
	        			temp = 
	        			{
	        				"title" : headers[i],
							"image_url" : "http://placehold.it/1024x512/0084ff/f7f7f7?text="+imaget,
							"subtitle" :result[i],
							"text":short[i],
	    	    			"buttons" :
			        		[
								{
        							"type" : "postback",
        							"payload" : "refresh",
		        					"title" : "Refresh ..."
								},
							    {
	        						"type" : "postback",
			        				"payload" : "more scores "+id[i]+'^'+result[i],
	    		    				"title" : "Show Live Score..."
			    		    	}
						    ]
						};
						c=c+1;
						if (temp.title.indexOf('CGC')>-1 )
							maintemp = temp;
						else if((temp.title.indexOf('SLT')>-1)
   ||(temp.title.indexOf('CGC vs SLT')>-1)||(temp.title.indexOf('CW')>-1)||(temp.title.indexOf('RPR')>-1)||(temp.title.indexOf('RSR')>-1)||(temp.title.indexOf('DP')>-1)||(temp.title.indexOf('KLT')>-1)||(temp.title.indexOf('Chattogram')>-1)||(temp.title.indexOf('Sylhet')>-1)||(temp.title.indexOf('Chattogram')>-1)
)
						{
				   			t.unshift(temp);
						}
						else
							t[i] = temp;
						}
						if (maintemp != null)
						{
							t.unshift(maintemp);
						}
					//	console.log("\n\nmatch index is "+index);
						if(index < c)
						{
							for(var a=0; a<10; a++)
							{
							//	console.log("\n \n data added in message is "+t[a+index]+"\n");
					
								if((t[index+a] === undefined)||(a+index == c))
									break;
								else
									messageData.attachment.payload.elements[a] = t[index+a];
							}
						}
						else
						{
							messageData =
							{
								text : "No more matches are played lately"
							};
						}
				//		console.log("\n \n \n \n the data to be sent for all "+JSON.stringify(messageData));
			
						return messageData;
       	}
        else
        {
        	temp = 
        		{
        			"attachment" :
        			{
        				"type" : "template",
        				"payload" : 
        				{
        					"template_type" : "generic",
        					"elements" :
        					[
        						{
        							"title" : "Couldn't get any Matches, Retry!",
									"image_url" : "http://placehold.it/1024x512/0084ff/f7f7f7?text=No+Matches",
				        			"subtitle" : "Scores",
    	    						"buttons" :
        							[
				        				{
        									"type" : "postback",
        									"payload" : "refresh",
        									"title" : "Retry ..."
		        						}
			        				]
			        			},
			        		]
			        	}
			        }
       			};
        	return temp;
        }
        
}

///////////////////
function bplScore(sender)
{	
  
    let messageData = bpl();
    
    request(
    {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json:
        {
	    recipient : {id : sender},
            message: messageData,
        }
    }, function(error, response, body)
        {
            if (error)
            {
                console.log('Error sending messages: ', error);}
            else if (response.body.error)
            {
                console.log('Error: ', response.body.error);
            }
        });
}