$(function() {
    $('#pageContent').fullpage({
        'resize': true,
        'navigation': true,
        'easing': 'easeOutCubic',
        'ccs3': true,
        'navigationTooltips': ['首页', '团队', '小组', '招新', '报名'],
        afterLoad: function(anchorLink, index) {
            var $ww = $(window).width();
            if (index == 1) {
                    $('.section1').find('h1').animate({
                        top: '0',
                        opacity:'1'
                    }, 1500, 'easeOutQuad');
                    $('.section1').find('h2').animate({
                        right: '0',
                        opacity:'1'
                    }, 1500, 'easeOutQuad');
                    $('.section1').find('p').animate({
                        left: '0',
                        opacity:'1'
                    }, 1500, 'easeOutQuad');       
            }
            if (index == 2) {
                if ($ww > 1024) {
                    $('.section2').find('.right').animate({
                        right: '0'
                    }, 1500, 'easeOutQuad');
                    $('.section2').find('.left').animate({
                        left: '0'
                    }, 1500, 'easeOutQuad');
                }else{
                    $('.section2').find('.right').animate({
                        right: '0'
                    }, 1500, 'easeOutQuad');
                }
            }
            if (index == 3) {
                if ($ww > 1024) {
                    $('.section3').find('.frontend').animate({
                        bottom: '0',
                        opacity: '1',
                    }, 1500, 'easeOutBack');
                    $('.section3').find('.lastend').delay(1000).animate({
                        bottom: '0',
                        opacity: '1',
                    }, 1500, 'easeOutBack');
                    $('.section3').find('.android').delay(2000).animate({
                        bottom: '0',
                        opacity: '1',
                    }, 1500, 'easeOutBack');
                    $('.section3').find('.ios').delay(3000).animate({
                        bottom: '0',
                        opacity: '1',
                    }, 1500, 'easeOutBack');

                }
            }
            if (index == 4) {
                if ($ww > 1024) {
                    $('.section4').find('.session').animate({
                        right: '0',
                    });
                    $('.section4').find('.test').delay(500).animate({
                        right: '0',
                    });
                    $('.section4').find('.interview').delay(1000).animate({
                        right: '0',
                    });
                    $('.section4').find('.lasttest').delay(1500).animate({
                        right: '0',
                    });
                }
            }
        },
        onLeave: function(index, direction) {
            var $ww = $(window).width();
            if (index == '1') {
               
                    $('.section1').find('h1').animate({
                        top: '-100%',
                        opacity:'0'
                    }, 1500, 'easeOutQuad');
                    $('.section1').find('h2').animate({
                        right: '-100%',
                        opacity:'0'
                    }, 1500, 'easeOutQuad');
                    $('.section1').find('p').animate({
                        left: '-100%',
                        opacity:'0'
                    }, 1500, 'easeOutQuad');
              
            }
            if (index == '2') {
                 if ($ww > 1024) {
                 $('.section2').find('.right').animate({
                        right: '-100%'
                    }, 1500, 'easeOutQuad');
                if ($ww > 1024) {
                    $('.section2').find('.left').animate({
                        left: '-80%'
                    }, 1500, 'easeOutQuad');
                }
            }
            }
            if (index == '3') {
                if ($ww > 1024) {
                    $('.section3').find('.frontend').delay(1000).animate({
                        bottom: '-100%',
                        opacity: '0'
                    }, 1500, 'easeInOutQuad');
                    $('.section3').find('.lastend').delay(1000).animate({
                        bottom: '-100%',
                        opacity: '0'
                    }, 1500, 'easeInOutQuad');
                    $('.section3').find('.android').delay(1000).animate({
                        bottom: '-100%',
                        opacity: '0'
                    }, 1500, 'easeInOutQuad');
                    $('.section3').find('.ios').delay(1000).animate({
                        bottom: '-100%',
                        opacity: '0'
                    }, 1500, 'easeInOutQuad');
                }
            }
            if (index == '4') {

                if ($ww > 1024) {
                    $('.section4').find('.session').animate({
                        right: '-600%',
                    });
                    $('.section4').find('.test').animate({
                        right: '-600%',
                    });
                    $('.section4').find('.interview').animate({
                        right: '-600%',
                    });
                    $('.section4').find('.lasttest').animate({
                        right: '-600%',
                    });
                }
            }
        },
        afterRender:function(){
        	$('.section1').find('h1').animate({
        		top:'0',
        		opacity:'1'
        	},1500,'easeOutExpo');
        	$('.section1').find('h2').animate({
        		right:'0',
        		opacity:'1'
        	},1500,'easeOutExpo');
        	$('.section1').find('p').animate({
        		left:'0',
        		opacity:'1'
        	},1500,'easeOutExpo');
        }
    });

    $(window).resize(function() {
        autoScrolling();
    });

    function autoScrolling() {
        var $ww = $(window).width();
        if ($ww < 1024) {
            $.fn.fullpage.setAutoScrolling(false);
        } else {
            $.fn.fullpage.setAutoScrolling(true);
        }
    }
    autoScrolling();
});
