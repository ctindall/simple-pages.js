function Page(element) {
    this.jq = $(element);
    this.id = this.jq.attr('id');

    console.log(this.id);
}

Page.prototype.show = function() {
    this.jq.show();
}

Page.prototype.hide = function() {
    this.jq.hide();
}

var Pages = {
    pages: [],
    gather: function() {
	var that = this;
	this.pages = [];
	
	$("div.page").each(function(i, page) {
	    that.pages.push(new Page(page));
	});
    },
    moveTo: function(id) {
	$("div.page:visible").hide();
	$("div.page#" + id).show();
	this.currentPage = id;
    },
    indexOf: function() {
	var that = this;
	var curIndex = -1;

	this.pages.forEach(function(page, index) {
	    if(page.id == that.currentPage)
		curIndex = index;
	});

	return curIndex;
    },
    back: function() {
	var cur = this.indexOf(this.currentPage);
	
	if( cur ==  0 )
	    return;

	this.moveTo(this.pages[cur - 1].id);
    },
    next: function() {
	var cur = this.indexOf(this.currentPage);
	
	if( cur == Pages.pages.length )
	    return;
	
	this.moveTo(this.pages[cur + 1].id);
    },
    refresh: function() {
	var that = this;

	//set up back and next buttons
	$("button.btn-next").each(function(i, elem) {
	    $(elem).click(function() {
		that.next();
	    });
	});

	$("button.btn-back").each(function(i, elem) {
	    $(elem).click(function() {
		that.back();
	    });
	});
	
    },
    registerKeys: function() {
	$(document).on('keydown', function(e) {
	    
	    var tag = e.target.tagName.toLowerCase();
	    var RARROW = 39;
	    var LARROW = 37;
	    
	    if (tag == 'input' || tag == 'textarea') {
		return;
	    }
	    
	    if (e.which === RARROW) {
		Pages.next();
	    }
	    
	    if (e.which === LARROW) {
		Pages.back();
	    }
	});
    },
    setup: function() {
	this.gather();
	this.moveTo(this.pages[0].id);
	this.refresh();
	this.registerKeys();
    }
};

Pages.setup();

