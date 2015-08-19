var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },
	showAlert: function (message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},
	renderHomeView: function() {
		//$.ajax({
		//	url:"http://util.eti.br",
		//	type:"get",
		//	dataType:"html",
		//	success:function(r){
		//		$('body').html(r);
				
		//	}
			
		//});
		$('.search-key').on('keyup', $.proxy(this.findByName, this));
	},
	addLocation : function(event) {
		event.preventDefault();
		console.log('addLocation');
		navigator.geolocation.getCurrentPosition(
			function(position) {
				$('.location').html(position.coords.latitude + ',' + position.coords.longitude);
			},
			function() {
				alert('Error getting location');
			});
		return false;
	},
    initialize: function() {
		
		$(".employee-list").on('click', '.add-location-btn', this.addLocation);
		var self = this;
		this.store = new MemoryStore(function() {
			self.renderHomeView();
		});
	}
	
};

app.initialize();