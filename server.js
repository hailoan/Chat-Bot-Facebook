    // # SimpleServer
    // A simple chat bot server
    var logger = require('morgan');
    var http = require('http');
    var bodyParser = require('body-parser');
    var express = require('express');
    var request = require('request');
    var router = express();
    var app = express();
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    var server = http.createServer(app);
    app.listen(process.env.PORT || 3000);
    app.get('/', (req, res) => {
      res.send("Server ch?y ngon lành.");
    });
    app.get('/webhook', function(req, res) {
      if (req.query['hub.verify_token'] === 'mimi_shop') {
        res.send(req.query['hub.challenge']);
      }
      res.send('Error, wrong validation token');
    });
    // ?o?n code x? lý khi có ng??i nh?n tin cho bot
    app.post('/webhook', function(req, res) {
      var entries = req.body.entry;
      for (var entry of entries) {
        var messaging = entry.messaging;
        for (var message of messaging) {
          var senderId = message.sender.id;
          if (message.message) {
            // N?u ng??i dùng g?i tin nh?n ??n
            if (message.message.text) {
              var text = message.message.text;
              if(text == 'hi' || text == "hello")
              {
                sendMessage(senderId, "Mimi shop: " + 'Chào bạn');
              }
              else{sendMessage(senderId, "Mimi shop: " + "Shop sẽ trả lời câu hỏi của bạn nhanh nhất");}
            }
          }
        }
      }
      res.status(200).send("OK");
    });
    // G?i thông tin t?i REST API ?? Bot t? tr? l?i
    function sendMessage(senderId, message) {
      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
          access_token: "EAAMiJkXQAukBAAQkMaO7Cv4fs0dYsGtdE0c4CqNy39y5ZBrIvhMts2pseNINt09H9Fwhs272RktWC9ZA7RPjB3kxWHYUbmKZAq7slWdXF7mV8GRP4aiUtLmqVXVYU16wdMRhzQJRrqWMwQvjigQEjxY3MRQmasyjfUZAcEkItl836gsTqYntPGh0YTZCVwk0ZD",
        },
        method: 'POST',
        json: {
          recipient: {
            id: senderId
          },
          message: {
            text: message
          },
        }
      });
    }