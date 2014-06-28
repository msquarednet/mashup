//Meetup Model
var app = app || {};

(function () {
	
	app.Meetup = Backbone.Model.extend({
		
		defaults: {
			id: 0,
			name: "foo"
		}

	});
	
})();
