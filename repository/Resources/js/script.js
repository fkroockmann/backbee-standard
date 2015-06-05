/*
Lp digital - v1.2.1 June2015
Backbee Demo
required: jquery
*/


jQuery(document).ready(function() {

  //init SHORTCUTS
  $("#access-shortcuts-wrapper>ul").initShortcuts();

    //Placeholder Fix (no Modernizr)
  $('.lt-ie10 [placeholder]').focus(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
    input.val('');
    input.removeClass('placeholder');
    }
  }).blur(function() {
    var input = $(this);
    if (input.val() == '' || input.val() == input.attr('placeholder')) {
    input.addClass('placeholder');
    input.val(input.attr('placeholder'));
    }
  }).blur();
  $('.lt-ie10 [placeholder]').parents('form').submit(function() {
    $(this).find('.lt-ie10 [placeholder]').each(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
      input.val('');
    }
    });
  });

  //Printable version
  $('.btn-printer').on('click', function(e) {
      e.preventDefault(); window.print();
  });
  
  //Video RWD
  $(".content-video iframe").resizeEmbed(); 
	
  //RWD table - 991px
  $("table.table-responsive").tableRwd({breakpoint:991});

  //NAV main - .rwd-is-desktop 
  $('.navbar-wrapper').affix(); 


//END ready
});


// Window Load
$(window).load(function(){
	//FW
	$('.slider-wrapper.slider-fw .slider-list').each(function(){
		var owl = $(this);
		var hasPagination = ($(this).hasClass("slider-has-pagination")) ? true : false;
		owl.owlCarousel({
			pagination: hasPagination, 
			singleItem: true, 
			navigation: true, 
			autoPlay: 6000, //default 5000 
			autoHeight: true, 
			lazyLoad: true, 
			navigationText: ["<i class=\"fa fa-angle-left\"></i>","<i class=\"fa fa-angle-right\"></i>"],
			afterInit : function(){
				//console.log("ignition done");
				//
				owl.parent(".slider-wrapper").removeClass('slider-loader');
				//
			}, 
			beforeMove : function(){
				//console.log("move done");
				//
				owl.parent(".slider-wrapper").find('.owl-item').eq(this.owl.currentItem).find('.figcaption .ttl').removeClass('animated fadeIn');
				//
			},
			afterMove : function(){
				//console.log("move done");
				//
				owl.parent(".slider-wrapper").find('.owl-item').eq(this.owl.currentItem).find('.figcaption .ttl').addClass('animated fadeIn');
				//
			}
		//
		});
	});
	//

});
// End window load


//initShortcuts
$.fn.initShortcuts = function(options) {

  var obj = $(this);
  obj.find('a').focus(function(e) {obj.css('height', 'auto'); });
  obj.find('a').blur(function(e) {obj.css('height', '0px'); });     
  
  return this;        
};


//FN Video RWD
$.fn.resizeEmbed = function(options) {
    var defaults = {
    };
    var options = $.extend(defaults, options);
    var obj = $(this);

    obj.each(function() {
     var newWidth = $(this).parent().width();
     $(this)
      // jQuery .data does not work on object/embed elements
      .attr('data-aspectRatio', this.height / this.width)
      .removeAttr('height')
      .removeAttr('width')
      .width(newWidth)
      .height(newWidth * $(this).attr('data-aspectRatio'));
    });

    $(window).on("resize",function() { 
       obj.each(function() {
        var newWidth = $(this).parent().width();
        $(this)
          .width(newWidth)
          .height(newWidth * $(this).attr('data-aspectRatio'));
       });                                
    });

    return this;
};


//FN Table RWD
//MOD - based on: http://zurb.com/playground/playground/responsive-tables/responsive-tables.js 
$.fn.tableRwd = function(options) {
  var defaults = {
    breakpoint : 991
  };
  var options = $.extend(defaults, options);
  var obj = $(this);

  var switched = false;
  var updateTables = function () {
    if (($(window).width() < options.breakpoint) && !switched) {
      switched = true;
      obj.each(function (i, element) {
        splitTable($(element));
      });
      return true;
    } else if (switched && ($(window).width() > options.breakpoint)) {
      switched = false;
      obj.each(function (i, element) {
        unsplitTable($(element));
      });
    }
  };

  $(window).load(updateTables);
  $(window).bind("resize", updateTables);

  function splitTable(original) {
    original.attr("data-margin",original.css("margin")).css("margin",0).wrap(
      $("<div class='table-wrapper'></div>").css({"overflow-x":"scroll", "overflow-y":"visible", "margin": original.attr("data-margin")})
    );
  }

  function unsplitTable(original) {
    original.css("margin","").removeAttr("data-margin");
    original.unwrap();
  }

  return this;
};
