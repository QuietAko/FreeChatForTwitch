fs = require('fs')

jQuery(document).ready(function($) {
    $('#options-chat').hide();
    $('#save-btn').click(function(event) {
        writeNewUser();
    });
});



function treatData(badge, global_emotes, streamer_emotes, data, name, start, token, botName, client_id) {
    if (data != '' && start == false) {
        console.log(data);

        cl = client_id
        bn = botName
        tn = token

        bootbox.prompt({
            title: "Мы нашли настроеные каналы",
            message: '<p>Выберите канал или настройте новый</p>',
            buttons: {
                confirm: {
                    label: 'Использовать',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Настроить новый',
                    className: 'btn-danger'
                }
            },
            inputType: 'select',
            inputOptions: createObjects(JSON.parse(data)['items']),
            callback: function(result) {
                if (result != null) {
                    getData(result, cl, tn)
                } else {
                    $('#options-chat').show();
                }
            }
        });

    } 
    else if (data == '' && start == false) {
        bootbox.alert("Здравствуйте мы не нашли настроек для канала пожалуйста настройте свой чат!");
        $('#options-chat').show();
    } 
    else if (start == true && name != null) {
        data = JSON.parse(data)['items']
            for(key in data)
                if (data[key].streamer == name) {
                    console.log('Starting bot .....')
                    startTwtchBot(badge, global_emotes, streamer_emotes, data[key], name, client_id, token, botName)
                } else {
                    console.log('Error')
                }
    }



}



function createObjects(data){
    json = [];
    console.log(data);
    for (key in data){
            a = '{"text":' + '"' + data[key].streamer + '"' + ',' + '"value":' + '"' +data[key].streamer+ '"' + '}'
            json.push(a)
            
    }
    return JSON.parse('{"items":[' + json.join(', ') + ']}').items;
}

function writeNewUser() {
    background_exchat = $('#background-exchat').css('color');
    ex_sub_color = $('#ex-sub').css('color');
    ex_notsub_color = $('#ex-notsub').css('color')
    limits = $("#limit-message").val();
    name = $('#name-streamer').val();
    file = '';

    json = '{"items":[{"streamer":"' + name + '", "sub_color":"' + ex_sub_color + '", "notsub_color":"' + ex_notsub_color + '", "limit_messages":"' + limits + '","platform":"yt", "bg_color":"' + background_exchat + '"}]}'

    fs.readFile('./js/options.json', 'utf8', function(error, data) {
        c = [];

        if (data == '') {
            fs.writeFile("./js/options.json", json, function(error) {
                bootbox.alert("Настройки были созданы и успешно сохранены!");
            })
        } else {
            file = JSON.parse(data);
            for (key in file['items']) {
                    c.push(JSON.stringify(file['items'][key]))
            }
            c.push(JSON.stringify(JSON.parse(json)['items'][0]))

            final = '{"items":[' + c.join(', ') + ']}';

            fs.writeFile("./js/options.json", final, function(error) {
                bootbox.alert("Настройки были созданы и успешно сохранены!");
            })
        }


    })

}

function distBadges(username, badge) {
    sub = username['badges'];
    if (sub != null && sub != undefined) {
        s = sub.subscriber
        b = badge.badge_sets.subscriber.versions['' + s + ''].image_url_1x
        return b;
    } else {
        return null;
    }

}

function findEmotes(global_emotes, streamer_emotes, message) {

    var st_emotes = streamer_emotes.emoticons;

    var mess = message.split(' ')

    for (key in mess) {
        if (key != ' ') {
            e = global_emotes[mess[key]]
            if (e != undefined) {
                mess[key] = '<img src="https://static-cdn.jtvnw.net/emoticons/v1/' + e.id + '/1.0">'
            }
        }

    }

    return (mess.join(' '))

}


function createMessage(badge, global_emotes, streamer_emotes, username, message) {

    b = distBadges(username, badge)

    if (b != null) {
        $('#chat').append('<div class="message_block"><div class="wrap"><img class="badge_image" src=' + b + '><p class="author_sub">' + username['display-name'] + ' : ' + findEmotes(global_emotes, streamer_emotes, message) + '</p></div></div>');
    } else {
        $('#chat').append('<div class="message_block"><div class="wrap"><p class="author">' + username['display-name'] + ' : ' + findEmotes(global_emotes, streamer_emotes, message) + '</p></div></div>');
    }

}



fs.readFile('./settings.json', 'utf-8', function(error, data){

        data = JSON.parse(data);

        if (data["settings"]["token"] != "" && data["settings"]["botName"] != "" && data["settings"]["client_id"] != "") {
            getOptions(null, null, null, null, false, data["settings"]["token"], data["settings"]["botName"], data["settings"]["client_id"])
        }
        else{
        console.log("Token or bot's name aren't indicated")
        }


})

