const remote = require('electron').remote
var click = 0

$(document).ready(function() {
	app = remote.getCurrentWindow();
	$('.close-btn').on('click', e => {
    	app.close()
	})
	$('.max-btn').on('click', e => {
		if (click == 0) {
			app.maximize();
			click = 1
		}
		else{
			app.unmaximize();
			click = 0
		}
	})
	$('.min-btn').on('click', e => {
		app.minimize()
	})
});