// Smooth Scroll
(function(){
    'use strict';

    $('.logo').click(function () { 

        $('html, body').stop().animate( { 
            scrollTop: $('#page').offset().top - 101
        }, 600, 'easeInCirc');
    
        $('nav ul li a').removeAttr('class');
    
        return false     
    });
    
    $('nav ul li a').click(function () { 
        const thisSection = $(this).attr('href');
        const thisLink = $(this)
        
        $('html, body').stop().animate( { 
            scrollTop: $(thisSection).offset().top - 101
        }, 600, 'easeInCirc');
    
        return false    
    });
    
    $(window).on('load', function () {
        let allLinks = $('nav ul li a');
    
        let posts = $('#page > section');
        let pageTop;
        let postPos;
        let counter = 0;
        let prevcounter = 0;
        let doneResizeing;
        let postTops = [];
    
        resetPagePosition();
    
        $(window).scroll( function () {
            pageTop = $(window).scrollTop()  + 200;
    
            if ( pageTop > postTops[counter + 1] ) {
                counter++;
            } else if (counter > -1 && pageTop < postTops[counter] ) {
                counter--;
            }
            if (counter != prevcounter) {
                $(allLinks).removeAttr('class');
                $('nav ul li a').eq(counter).addClass('selected');
                prevcounter = counter;
            }
        });
    
        $(window).on('resize', function () {
            clearTimeout(doneResizeing);
            doneResizeing = setTimeout( function () {
                resetPagePosition();
            }, 200);
        });
    
        function resetPagePosition() { 
            postTops = [];
            posts.each( function () { 
                postTops.push( Math.floor($(this).offset().top)-10);
            });
    
            var pagePosition = $(window).scrollTop() + 200;
            counter = -1;
    
            for (let i=0; i<postTops.length; i++) {
                if (pagePosition > postTops[i]) { counter++; }
            }
    
            $(allLinks).removeAttr('class');
            $('nav ul li a').eq(counter).addClass('selected');
        }
    });
})();

// Flexslider

$(window).on('load', function() {
    let mySlides = $('.flexslider ul li div div');
    
    mySlides.each( function () { 
        $(this).css("bottom","-230px");
    });

    $('.flexslider').flexslider(
        {
            animation: "slide",
            slideshowSpeed: 2000,
            direction: "horizontal",
            reverse: true,
            pauseOnHover: true,
            directionNav: false,
            before: function () {
                $('.cta').css("bottom","-230px")
              },
            after: function(){
                let activeSlide = $('.cta');
                $(activeSlide).animate({bottom: '0px'}, 600, 'easeInCirc'); 
            },
            start: function () { 
                let activeSlide = $('.cta');
                $(activeSlide).animate({bottom: '0px'}, 600, 'easeInCirc');
            }
        }
    );
});



// Tabs

(function(){
    'use strict';

    $('#tabs > ul > li > a').click(function(){
        $('#tabs > ul > li > a').css({ background: `var(--tea-green)`, color: `var(--rich-black)`});
        
        $(this).css({ background: `var(--tea-green-light)`});
        
        const thisTab = $(this).attr('href');
        
        $('#tabs > div:visible').fadeOut(200, function(){
            $(thisTab).fadeIn(200);
        });
    });
})();





// Content Rotator

(function(){
	"use strict";

	let counter = 1;

	function contentRotator () { 
		$(`#rotator blockquote:nth-child(${counter})`).fadeIn(2000, function(){
            if ($('#rotator blockquote:last-child')){
                setTimeout( function () {
                    $(`#rotator blockquote:nth-child(${counter})`).fadeOut(2000, function () { 
                        counter = 1;
                        contentRotator();
                    });
                }, 5000 );

            } else {
                
                setTimeout( function () {
                    $(`#rotator blockquote:nth-child(${counter})`).fadeOut(2000, function () { 
                        counter++;
                        contentRotator();
                    });
                }, 5000 );
            }
        });
	 };
	
	contentRotator();

}());


// Features Rotator 

(function (){
    'use strict';

    const totalfeatures = $('.eachfeature li');
    let nextPosition = 30;
    let counter = 0;
    const totalFeaturesHeigth = (totalfeatures.length) * 30

    $('.eachfeature').clone().appendTo('#features');
    let actualFeature = $('#features ul:first-of-type');

    animateFeature();

    setInterval(function () {
        if (counter < totalfeatures.length) {
            animateFeature();

        } else {
            actualFeature = $('#features ul:last-of-type');

            $('#features ul:first-of-type').remove();
            actualFeature.clone().appendTo('#features');
            actualFeature = $('#features ul:first-of-type');
            counter = 0;
            nextPosition = 30;
            $('#features').css({'top':'30px'});

            animateFeature();
        }
    }, 1500);

    function animateFeature () {
        nextPosition -= 30;
        console.log(`Counter: ${counter} - Position: ${nextPosition}px`);
        $('#features').animate({top: `${nextPosition}px`}, 500, function () { 
            $(actualFeature).children(`li:nth-child(${counter})`).css({
                "color":'rgb(255, 89, 100)',
                "font-weight": '600'
            })
        });
        counter++;
    };
})();


