//twitch
var tmi = require('tmi.js');

var optionsBot = {
    options: {
      debug: true
    },
    connection: {
      cluster: "aws",
      reconnect: true
    },
    identity: {
        username: "bot_name",//имя бота
        password: "token_bot"//токен бота
    },
    channels: ['']
};


function startTwtchBot(badge, global_emotes, streamer_emotes, options, name){

  streamer = options['streamer']
  sub_color = options['sub_color']
  notsub_color = options['notsub_color']
  limit_messages = options['limit_messages']
  platform = options['platform']
  bg_color = options['bg_color'];
  optionsBot.channels = [streamer]

 console.log(streamer);


var client = new tmi.client(optionsBot);
client.connect();

messages = 0;
$('body').css('background-color', bg_color);


client.on('chat', function (channel, username, message, self) {

messages = messages + 1;

  if ($('.message_block').length > limit_messages) {
    $("#chat").empty();
  }
  else{
    sH = document.getElementsByTagName('html')[0].scrollHeight;
    $("html").scrollTop(sH + 300);
    createMessage(badge, global_emotes, streamer_emotes, username, message);
    $('.author').css('color', notsub_color);
    $('.author_sub').css('color', sub_color);
  }

})


//a = a.match(/\d{0,20}:/g).join('').split(':');
}


