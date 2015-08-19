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
	$.ajax({
		url:"http://util.eti.br",
		type:"get",
		dataType:"html",
		success:function(r){
			$('body').html(r);
			
		}
		
	});
		var html =
				"<div class='header'><h1>Home 2</h1></div>" +
				"<div class='search-view'>" +
				"<input class='search-key'/>" +
				"<ul class='employee-list'></ul>" +
				"</div>"
		$('body').html(html);
		$('.search-key').on('keyup', $.proxy(this.findByName, this));
	},
    initialize: function() {
		var self = this;
		this.store = new MemoryStore(function() {
			self.renderHomeView();
		});
	}
	
};

app.initialize();