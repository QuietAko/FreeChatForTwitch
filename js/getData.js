fs = require('fs');


/*Собираем всю Информацию которая будет нужна, и передаем боту твича где уже она обрабатывается в скрипте botTwitch.js*/

function getOptions(badge, global_emotes, streamer_emotes, name, start, token, botName, client_id) {
    fs.readFile('./js/options.json', 'utf8', function(error, data) {
        treatData(badge, global_emotes, streamer_emotes, data, name, start, token, botName, client_id);
    })
}


function getData(name, client_id, token, botName) {
    $.ajax({
        async: false,
        url: 'https://api.twitch.tv/kraken/channels/' + name + '?client_id='+client_id+'',
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            getBadges(data['_id'], name, client_id, token, botName);
            console.log('Информация о стримере ' + name + ' успешно получена!')
        }
    }).fail(function(data) {
        console.log('fail', data, client_id)
    })
}

function getBadges(id, name, client_id, token, botName) {
    $.ajax({
        url: 'https://badges.twitch.tv/v1/badges/channels/' + id + '/display?language=en',
        type: 'GET',
        dataType: 'jsonp',
        success: function(badge) {
            getEmotesListGlobal(badge, name, client_id, token, botName)
            console.log('Информация о бэйджах получена')
        }
    }).fail(function() {
        console.log('fail')
    })
}

function getEmotesListGlobal(badge, name, client_id, token, botName) {
    $.ajax({
        url: 'https://twitchemotes.com/api_cache/v3/global.json',
        type: 'get',
        dataType: 'json',
        success: function(global_emotes) {
            getEmotesListStreamer(badge, global_emotes, name, client_id, token, botName);
            console.log('Эмоции получены!')
        }
    }).fail(function() {
        console.log('fail')
    })
}

function getEmotesListStreamer(badge, global_emotes, name, client_id, token, botName){
  $.ajax({
    url: 'https://api.twitch.tv/api/channels/'+optionsBot.channels[0]+'/product?client_id='+client_id+'',
    type: 'get',
    dataType: 'json',
    success: function(streamer_emotes){
      start = true;
      getOptions(badge, global_emotes, streamer_emotes, name, start, token, botName, client_id);
      console.log('Эмоции стримера получены!')
    }
  }).fail(function(){
    console.log('fail')
  })
}
