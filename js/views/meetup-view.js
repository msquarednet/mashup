//Meetup View (LI)
var app = app || {};

(function ($) {
	
	app.MeetupView = Backbone.View.extend({

		tagName: 'li',

		initialize: function() {
			_.bindAll(this, 'render');
			this.render();
		},

		events: {},

		render: function(){
			var meetupName = this.model.get('name');
			this.$el.text(meetupName);
		}

	});

})(jQuery);
