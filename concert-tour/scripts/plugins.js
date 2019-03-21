$(document).ready(function () {

    var logoToggler = $('.responsive-logo-toggler');
    var navigation = $('nav');
    var slider = $('.slider');
    var categorySlider1 = $('#electro');

    logoToggler.click(function() {
        navigation.toggleClass('responsive-show');
    });

    slider.slider({
        data: [
            {
                id: 0,
                image: 'images/slider-1.jpg',
                textTitle: 'Раммштайн!!!',
                textDescription: 'зашибись будет приключение, ждем вас',
                linkTo: '#'
            },
            {
                id: 1,
                image: 'images/slider-2.jpeg',
                textTitle: 'Ван Бюрен',
                textDescription: 'когда, как не сейчас?',
                linkTo: '#'
            },
            {
                id: 2,
                image: 'images/slider-3.jpeg',
                textTitle: 'Омния',
                textDescription: 'круто вышло, я считаю',
                linkTo: '#'
            },
            {
                id: 3,
                image: 'images/slider-4.jpeg',
                textTitle: 'Линкин Парк',
                textDescription: 'кавер шоу крутой группы',
                linkTo: '#'
            },

        ]
    });
    categorySlider1.categorySlider({
        id: 0,
        
    })
});

//slider startpage
(function ($) {

    jQuery.fn.slider = function(options) {
        var sliderData = options.data;
        var sliderContainer = $(this);
        var slideNavigationContainer = sliderContainer.find('.slider-navigation');
        var sliderInfo = sliderContainer.find('.slider-info');
        var slideImage = sliderContainer.find('img');
        var slideTitle = sliderInfo.find('h3');
        var slideDescription = sliderInfo.find('p');
        var slideLinkTo = sliderInfo.find('a');
        var count = 0;
        var interval;

        for (var i = 0; i < sliderData.length; i++) {
            var slideNavigator = $('<div/>').addClass('slider-navigator')
                .attr('data-id', sliderData[i].id)
                .click(toggleSlideByClick);
            slideNavigationContainer.append(slideNavigator);
        }

        toggleSlide(sliderData[0].id);
        initSliderAutoToggling();

        function initSliderAutoToggling() {

            interval = setInterval(function() {
                if (count >= sliderData.length) {
                    count = 0;
                }
                toggleSlide(count);

            }, 15000);
        }

        function toggleSlideByClick(e) {

            clearInterval(interval);

            var id = $(e.target).attr('data-id');
            count = id;

            toggleSlide(id);
            initSliderAutoToggling();
        }

        function toggleSlide(id) {

            var data = sliderData[id];

            var sliderToggler = slideNavigationContainer.find('.slider-navigator[data-id="' + id + '"]');
            sliderToggler.addClass("active");
            sliderToggler.siblings().removeClass("active");

            sliderInfo.animate({'opacity': 0}, 1000, function() {
                slideImage.animate({'opacity': 0}, 1000, function() {
                    slideImage.attr('src', data.image);
                    slideTitle.text(data.textTitle);
                    slideDescription.text(data.textDescription);
                    slideLinkTo.attr('src', data.linkTo);

                    slideImage.animate({'opacity': 1}, 1000, function() {
                        sliderInfo.animate({'opacity': 1}, 1000);
                        count++;
                    });
                });
            });
        }
    }

})(jQuery);

//category startpage toggler
(function ($) {

    jQuery.fn.categorySlider = function(options) {
        console.log(options);
    };

})(jQuery);