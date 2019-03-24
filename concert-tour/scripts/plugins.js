$(document).ready(function () {

    var logoToggler = $('.responsive-logo-toggler');
    var navigation = $('nav');
    var slider = $('.slider');
    var categorySlider = $('.category-items-slider-container');
    var orderForm = $('#order');

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
    categorySlider.each(function(i, item) {
        $(item).categorySlider();
    });

    orderForm.handleStickyElement();
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
        var count = 1;
        var interval;

        for (var i = 0; i < sliderData.length; i++) {
            var slideNavigator = $('<div/>').addClass('slider-navigator')
                .attr('data-id', sliderData[i].id)
                .click(toggleSlideByClick);
            slideNavigationContainer.append(slideNavigator);
        }

        slideNavigationContainer.find('.slider-navigator:first').addClass('active');

        // toggleSlide(sliderData[0].id);
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

            sliderInfo.animate({'opacity': 0}, 1000, function() {
                slideImage.animate({'opacity': 0}, 1000, function() {
                    slideImage.attr('src', data.image);
                    slideTitle.text(data.textTitle);
                    slideDescription.text(data.textDescription);
                    slideLinkTo.attr('src', data.linkTo);

                    slideImage.animate({'opacity': 1}, 1000, function() {
                        sliderInfo.animate({'opacity': 1}, 1000);
                        count++;

                        sliderToggler.addClass("active");
                        sliderToggler.siblings().removeClass("active");
                    });
                });
            });
        }
    };

})(jQuery);

//category startpage toggler
(function ($) {

    jQuery.fn.categorySlider = function() {

        var scretch = $(this).find('.scretch');
        var categorySliderWrapper = $(this).find('.category-items-slider-wrapper').get(0);
        var items = $(this).find('.category-item');
        var item = items[0];
        var dispositionValue = getDisposition();
        var arrowLeft = $(this).find('.arrow.left');
        var arrowRight = $(this).find('.arrow.right');
        var left = 0;
        var counter = 0;
        var countOfElementsInViewBox = computeItemsCount();
        var countNextLevel = 0;

        console.log(countOfElementsInViewBox);

        arrowLeft.click(function() {
            moveScratch('left');
        });

        arrowRight.click(function() {
            moveScratch('right');
        });

        function getDisposition() {

            var style = window.getComputedStyle(item);
            var width = item.offsetWidth; // or use style.width
            var margin = parseFloat(style.marginRight) + parseFloat(style.marginLeft);
            return (width + margin) + 0.5;
        }

        function moveScratch(direction) {

            switch (direction) {
                case 'left':
                    counter++;
                    left+= dispositionValue;
                    break;
                case 'right':
                    counter--;
                    left-= dispositionValue;
                    break;
            }

            makeEndlessSliding();

            scretch.animate({
                'left': left
            }, 500);
        }

        function makeEndlessSliding() {
            var numberOfToggledSlide = counter !== 0 ? counter * (-1) : 0;

            if (numberOfToggledSlide + countOfElementsInViewBox > items.length) {

                if (countNextLevel < countOfElementsInViewBox) {

                    var newItem = items.eq(0).clone();

                    items.eq(0).remove();
                    newItem.insertAfter(items.eq(items.length - 1));
                }

                console.log(items.eq(0).find('h4').text());

                countNextLevel++;
                console.log(countNextLevel, countOfElementsInViewBox);
            }

            console.log(numberOfToggledSlide);
        }

        function computeItemsCount() {
            var wrapperWidth = categorySliderWrapper.offsetWidth;
            return Math.round(wrapperWidth / dispositionValue);
        }

        $(window).resize(function() {
            dispositionValue = getDisposition();
            left = dispositionValue * counter;
            scretch.css({
                'left': left + 'px'
            });

            countOfElementsInViewBox = computeItemsCount();
        });
    };

})(jQuery);

(function ($) {
    jQuery.fn.handleStickyElement = function() {

        var stickyElement = $(this);
        var stickyHeader = stickyElement.find('.order-header');

        var stickyBeginPosition = stickyElement.offset().top + 20;

        $(document).ready(function() {
            addSticky();
        });

        $(window).scroll(function() {

            addSticky();
        });

        stickyHeader.click(function() {
           toggleStickyFormMobileVisibility();
        });

        function toggleStickyFormMobileVisibility() {
            stickyElement.toggleClass('show');
        }

        function addSticky() {
            if ($(window).scrollTop() > stickyBeginPosition) {
                stickyElement.addClass('sticky');
            } else {
                stickyElement.removeClass('sticky');
            }
        }
    };
})(jQuery);