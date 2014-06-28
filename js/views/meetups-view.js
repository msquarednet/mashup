//MeetupS View (UL)
var app = app || {};

(function ($) {

	app.MeetupsView = Backbone.View.extend({

		tagName: 'ul',

		initialize: function() {
			_.bindAll(this, 'render');
			this.render();
		},

		events: {},

		render: function(){
			//console.log("MeetupsView this: ",this);	//colletion prop was passed in
			this.collection.forEach(function(meetup){
				var meetupView = new app.MeetupView({model: meetup});
				//meetupView.render();
				this.$el.append(meetupView.$el);
			}, this);
		}

	});

})(jQuery);

