var request = require('request');
var express = require('express');
var myParser = require('body-parser');
var firebase = require("firebase");
var app = express();

var config = {
    apiKey: "AIzaSyCh04pqF8dkLwue9bvmNfqcQD5VrH9u11o",
    authDomain: "worklogbot-b32b9.firebaseapp.com",
    databaseURL: "https://worklogbot-b32b9.firebaseio.com",
    projectId: "worklogbot-b32b9",
    storageBucket: "worklogbot-b32b9.appspot.com",
    messagingSenderId: "893925247304"
  };
  firebase.initializeApp(config);


app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json());

app.post("/worklog/:project/:issue", function (req, res) {
    console.log(req.params.project);
    console.log(req.params.issue);
    var post_data = {
        channel: 'UCYJDN9C1',
        text: `*${req.body.worklog.author.displayName}*: _${req.body.worklog.comment}_ (${req.body.worklog.timeSpent})`
    };
    request({
        method: 'POST',
        uri: 'https://slack.com/api/chat.postMessage',
        json: true,
        body: post_data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer xoxb-441022530244-441390597989-HszCEhYWOZtlx7bWHJx0r3zq'
        }
    }, function (error, response, body) {
        console.log(response.text);
        console.log(response.statusCode);
    })
    res.json({success: true});
});

app.listen(8080);


