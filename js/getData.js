fs = require('fs');


/*Собираем всю Информацию которая будет нужна, и передаем боту твича где уже она обрабатывается в скрипте botTwitch.js*/

function getOptions(badge, global_emotes, streamer_emotes, name, start, token, botName) {
    fs.readFile('./js/options.json', 'utf8', function(error, data) {
        treatData(badge, global_emotes, streamer_emotes, data, name, start);
    })
}


function getData(name) {
    $.ajax({
        async: false,
        url: 'https://api.twitch.tv/kraken/channels/' + name + '?client_id='+token+'',
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            getBadges(data['_id'], name);
            console.log('Информация о стримере ' + name + ' успешно получена!')
        }
    }).fail(function() {
        console.log('fail')
    })
}

function getBadges(id, name) {
    $.ajax({
        url: 'https://badges.twitch.tv/v1/badges/channels/' + id + '/display?language=en',
        type: 'GET',
        dataType: 'jsonp',
        success: function(badge) {
            getEmotesListGlobal(badge, name)
            console.log('Информация о бэйджах получена')
        }
    }).fail(function() {
        console.log('fail')
    })
}

function getEmotesListGlobal(badge, name) {
    $.ajax({
        url: 'https://twitchemotes.com/api_cache/v3/global.json',
        type: 'get',
        dataType: 'json',
        success: function(global_emotes) {
            getEmotesListStreamer(badge, global_emotes, name);
            console.log('Эмоции получены!')
        }
    }).fail(function() {
        console.log('fail')
    })
}

function getEmotesListStreamer(badge, global_emotes, name){
  $.ajax({
    url: 'https://api.twitch.tv/api/channels/'+optionsBot.channels[0]+'/product?client_id='+token+'',
    type: 'get',
    dataType: 'json',
    success: function(streamer_emotes){
      start = true;
      getOptions(badge, global_emotes, streamer_emotes, name, start);
      console.log('Эмоции стримера получены!')
    }
  }).fail(function(){
    console.log('fail')
  })
}
