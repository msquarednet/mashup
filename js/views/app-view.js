//App View
var app = app || {};

(function ($) {

	$.ajaxSetup({
		headers: {'Access-Control-Allow-Origin':'http://mashup.dev'}
	});

	app.AppView = Backbone.View.extend({

		el: $('body'),
		foo: "bar",

		initialize: function() {
			_.bindAll(this, 'render', 'doMap', 'doMeetups', 'addMarkers', 'placeMarker', 'markerClick');
			this.doMap();
			this.doMeetups();
			this.render();
		},

		events: {},

		doMap: function(){
			var mapProp = {
				center:new google.maps.LatLng(40.7330,-73.9823),
				zoom:12,
				mapTypeId:google.maps.MapTypeId.ROADMAP
			};
			this.map = new google.maps.Map($('#googleMap')[0],mapProp);
			//google.maps.event.addDomListener(window, 'load', this.doMap);
			//google.maps.event.addListener(this.map, 'click', function(event) {
			//	this.placeMarker(event.latLng);
			//});
		},

		doMeetups: function() {
			var that = this;
			app.meetups = new app.Meetups();
			app.meetups.fetch({'dataType':'jsonp'}).then(function(){
				var meetupsView = new app.MeetupsView({collection: app.meetups});
				//meetupsView.render();
				//console.log("meetups collection is...",this);
				//console.log("that...", that);
				//console.log("$that.el...", $(that.el));
				$(that.el).append(meetupsView.$el);
				//that.foo();
				that.addMarkers();
				//$('body').html(meetupsView.$el);
			}, function(xhr) {console.log("status", xhr.status)});

		},

		addMarkers: function() {
			for (var i=0, len=app.meetups.length; i<len; i++){
				var m = app.meetups.models[i];
				var mname = m.attributes.name;
				var venue = m.attributes.venue;
				var group = m.attributes.group;
				var lat = (venue) ? venue.lat: (group) ? group.group_lat: 0;
				var lon = (venue) ? venue.lon: (group) ? group.group_lon: 0;
				//var lat = (venue) ? venue.lat:0;
				//var lon = (venue) ? venue.lon:0;
/*				console.log("i: ",i);
				console.log("name: ", m.attributes.name);
				console.log("venue: ",venue);
				console.log("group: ", group);
				console.log(" - ", (lat), (lon));*/				
				if (lat!==0 && lon!==0) { this.placeMarker(new google.maps.LatLng(lat,lon),i, mname); }
			}
		},

		placeMarker: function(location,ii, mname) {
			//console.log("placeMarker", ii);
			var marker = new google.maps.Marker({
				position: location,
				map: this.map,
				index: ii,
				title: mname
			});
			//google.maps.events.addListener(marker, 'click', this.markerClick);
			//var infowindow = new google.maps.InfoWindow({
			//	content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
			//});
			//infowindow.open(this.map,marker);
		},		

		markerClick: function(e) {
			console.log("markerClick", e)
		},

		foo: function() {
			console.log("trace meetups collection...");
			console.log(app.meetups)
		},

		render: function() {
			//$(this.el).append('<div>yo!</div>');
		}

	});

})(jQuery);
