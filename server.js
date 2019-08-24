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
  res.send("Server chạy ngon lành.");
});
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'mimi_shop') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.get('/setup', function (req, res) {
  setupGetStartedButton(res)
});

// Đoạn code xử lý khi có người nhắn tin cho bot
app.post('/webhook', function (req, res) {
  var entries = req.body.entry;
  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        // Nếu người dùng gửi tin nhắn đến
        if (message.message.text) {
          var text = message.message.text;
          var upper = text.toUpperCase();
          var messSend = '';
          switch (upper) {
            case 'MK_01':
              messSend = "Móc khóa có giá: 50k";
              break;
            case 'KT_01':
            case 'KT_02':
            case 'KT_03':
            case 'KT_04':
            case 'KT_05':
            case 'KT_06':
            case 'KT_07':
            case 'KT_08':
            case 'KT_09':
            case 'KT_10':
            case 'KT_11':
            case 'KT_12':
            case 'KT_13':
            case 'KT_14':
            case 'KT_15':
            case 'KT_16':
            case 'KT_17':
            case 'KT_18':
            case 'KT_19':
            case 'KT_20':
              messSend = "Khuyên tai có giá: 20k";
              break;
            default: messSend = '';
          }
          if (messSend != '') {
            sendMessage(senderId, messSend);
          }
        }
      }
      else if (message.postback && message.postback.payload === "GET_STARTED") {
        var mes = "Xin chào bạn đến với MimiShop. Hãy nhập mã mặt hàng để được biết giá.";
        sendMessage(senderId, mes);
      }
    }
  }

  res.status(200).send("OK");
});
// Gửi thông tin tới REST API để Bot tự trả lời
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: "EAAMiJkXQAukBAFCMT83gqh8bXDThNLeDLfUrsxZCEYIbSIMSll2GurZB8gwpelUTtDHklrwPoUIxspKYs4BCVf5E0bTZA0eHow0ckyH4tRRZAavYyQsWZC2JxrNHUVfWyAehTL5I0ZB7aBbSDsmmIiBYY5BdYaPFjTaucFMoi5Swzyx8CwcFYAKBPUIwjtrMcZD",

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

// setup button GET_STARTED
function setupGetStartedButton(res) {
  var messageData = {
    "get_started": [
      {
        "payload": "GET_STARTED"
      }
    ]
  };

  // Start the request
  request({
    url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAMiJkXQAukBAFCMT83gqh8bXDThNLeDLfUrsxZCEYIbSIMSll2GurZB8gwpelUTtDHklrwPoUIxspKYs4BCVf5E0bTZA0eHow0ckyH4tRRZAavYyQsWZC2JxrNHUVfWyAehTL5I0ZB7aBbSDsmmIiBYY5BdYaPFjTaucFMoi5Swzyx8CwcFYAKBPUIwjtrMcZD',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    form: messageData
  },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // Print out the response body
        res.send(body);

      } else {
        // TODO: Handle errors
        res.send(body);
      }
    });
}

//EAAMiJkXQAukBAHwfRAeGcR70vpv4CLCr3rfJ8G2y6aOrChp6k3lheSL9nqEnmGlFITKEnk6WOTFsPrVjuZA5F3lJNmNis0EFEJgyiGqHLvfOqUPPSsU17LSd1jLyMAVlhNjcYtQUW7kou6X4hKjwSGTrusoC6WtH1VOzPvA0vU184STvWwnbxdZBUkjJsZD
//EAAMiJkXQAukBAFCMT83gqh8bXDThNLeDLfUrsxZCEYIbSIMSll2GurZB8gwpelUTtDHklrwPoUIxspKYs4BCVf5E0bTZA0eHow0ckyH4tRRZAavYyQsWZC2JxrNHUVfWyAehTL5I0ZB7aBbSDsmmIiBYY5BdYaPFjTaucFMoi5Swzyx8CwcFYAKBPUIwjtrMcZD

// curl -X POST -H "Content-Type: application/json" -d '{ 
// "get_started": {
//   "payload": "GET_STARTED_PAYLOAD"
// }
// }' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAMiJkXQAukBAHwfRAeGcR70vpv4CLCr3rfJ8G2y6aOrChp6k3lheSL9nqEnmGlFITKEnk6WOTFsPrVjuZA5F3lJNmNis0EFEJgyiGqHLvfOqUPPSsU17LSd1jLyMAVlhNjcYtQUW7kou6X4hKjwSGTrusoC6WtH1VOzPvA0vU184STvWwnbxdZBUkjJsZD"