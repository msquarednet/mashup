//Meetup Collection
var app = app || {};

(function () {
	
	app.Meetups = Backbone.Collection.extend({
		
		model: app.Meetup,
		url: 'https://api.meetup.com/2/open_events?&state=NY&city=New York&country=us&category=34&page=100&time=,1w&text=javascript&key=475523447b954445254365816766257',
		//url: 'shazbot',

		initialize: function() {
			//console.log("Meetups Collection initialized.")
/*			var url="https://api.meetup.com/2/open_events?&state=NY&city=New York&country=us&category=34&page=100&time=,1w&text=javascript&key=475523447b954445254365816766257&callback=foo";
			$.ajax({
				url: url,
				dataType: 'jsonp',
				success: function(result){
					console.log(result);
							          var data = result.results;
					  for (var i = 0; i < data.length; i++){
					    $('body').append(data[i].group.name+'<br>');
					  }
							        
				}
			});
*/		},
		
		parse: function(data){
			//console.log("data from url...",data);
			return data.results;
		}

	});

})();
