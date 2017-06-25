/*
	Last.fm recent tracks plugin
	https://github.com/wiredimage/Last.fm-recent-tracks
*/
function recentLFM(user,apikey,limit,container) {
	// Defaults
	var html = '';
	var counter = 0;
	var list = '<p></p>';

    $.getJSON("//ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user="+user+"&api_key="+apikey+"&limit="+limit+"&format=json&callback=?", function(data) {
     	console.log(data);
        $.each(data.recenttracks.track, function(i, item) {
	         
            
            if(counter < (limit)) {

            	var timing =  Date.parse(item.date['#text'])
				ts = Number(timing);
	             var date = new Date(ts);

					html += date.toLocaleDateString() + ' &mdash; ' + item.artist['#text'] + ' &mdash; ' +item.name+'<br/>';
			             
				
            } // close the if statement
            counter++ // add 1 to the counter variable each time the each loop runs
        }); // close each loop
        
        $(container).append(html).wrapInner(list);
    }); // close JSON call
}

$(document).ready(function() {

if ( $('.listening-to').length ) {

		$.each($('.listening-to'), function (index, value) {
			var user = $(this).data('lfm-user');
			var apikey = $(this).data('lfm-api');
			var limit = $(this).data('lfm-limit');
			recentLFM(user,apikey,limit,this);
		});

}

});