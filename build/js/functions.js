$(function() {
    window.scrollTo(0, 0);
    function postURL(event) {
        if (window.location.pathname.length > 1) {
            var slug = window.location.pathname.slice(1, -1);
            history.replaceState(fetchPost(slug), null, '/' + slug + '/');
            setTimeout(function(){
                updateClassOn('.splash-screen', 'is-visible', 'remove');
            }, 200);
        } else {
            updateClassOn('.splash-screen', 'is-visible', 'remove');
        }
    }
    window.onload = postURL;

    let container = document.getElementById('base-gallery');
    let arrow = document.querySelectorAll('.arrow');

    var galleryLen,
        historyState,
        postHTMLarr = $('.active-post-header h1, .active-post-header h5, .active-post-body'),
        backArrow = $('.home-link, .back-icon'),
        links = document.querySelectorAll('.box-link'),
        galleryItem = document.getElementsByClassName('gallery-item'),
        boxContainer = document.querySelector('.box-container'),
        closeButton = document.querySelector('.x-icon'),
        topMenu = document.querySelectorAll('ul#topMenu li'),
        navContact = document.querySelector('.nav-contact'),
        iconX = document.querySelector('.x-icon'),
        input = $('input'),
        contactSection = $('.contact-section');

    function changeSlide(i) {
        $('.gallery-item[tabindex=' + i + ']').addClass('is-active').siblings('.gallery-item').removeClass('is-active');
    }

    var Post = function(slug) {
        this.slug = slug;
    };

    Post.prototype = Object.create(Post.prototype);
    Post.prototype.constructor = Post;

    var updateClassOn = function(selector, clazzes, toggle) {
        var classes = document.querySelectorAll(''+selector+'');
        if (toggle === 'add') {
            for (var i = 0; i < classes.length; i++) {
                classes[i].classList.add(''+clazzes+'')
            }
        }
        if (toggle === 'remove' || toggle === false) {
            for (var i = 0; i < classes.length; i++) {
                classes[i].classList.remove(''+clazzes+'')
            }
        }
    };

    var elemArr = [];

    var getImageSiblings = function(selector) {
        var elements = document.querySelector(''+selector+'').nextElementSibling;
        elemArr.splice(0);
        while (elements) {
            console.log(elements.nodeName);
            elemArr.push(elements);
            elements = elements.nextElementSibling;
        }
        return elemArr;
    };

    var pageState = function(status) {
        window.scrollTo(0, 0);

        switch (status) {
            case 'isPost':
                updateClassOn('body', 'post-template', 'add');
                updateClassOn('.active-post', 'is-visible', 'add');
                updateClassOn('.box-container', 'is-visible', 'remove');
                break;

            case 'isHome':
                updateClassOn('body', 'post-template', 'remove');
                updateClassOn('.active-post', 'is-visible', 'remove');
                updateClassOn('.box-container', 'is-visible', 'add');
                break;

            case 'isContact':
                updateClassOn('.contact-section', 'is-active', 'add');
                $('.nav-contact').addClass('is-active').siblings('.nav-projects').removeClass('is-active');
                setTimeout(function() {
                    $('input#email').focus();
                }, 50);
                break;

            case 'closeContact':
                updateClassOn('.contact-section', 'is-active', 'remove');
                $('.nav-projects').addClass('is-active').siblings().removeClass('is-active');
                break;

            default:
                return
        }

        if (status === 'closeContact' || status === 'isHome') {
            updateClassOn('.x-icon', 'x-visible', 'remove');
        }
        if (status === 'isContact') {
            updateClassOn('.x-icon', 'x-visible', 'add');
        }
    };


    var Carousel = {

        build: function() {
            var container = document.getElementById('base-gallery');
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            // $(container).empty();
            var elements = Array.from(document.getElementsByTagName('figure')),
                gallery = [];

            for (var i = 0; i < elements.length; i++) {
                var newImg = document.createElement("gallery-item"),
                    galleryItem = newImg.append(elements[i].innerHTML);
                elements[i].setAttribute('tabindex', i);
                gallery.push("<div class='gallery-item' tabindex='" + i + "'>" + elements[i].innerHTML + "</div>");
            }

            $(container).append(gallery.join(""));
            return galleryLen = gallery.length;
        },

        display: function() {
            var imgIndex = $(this).attr('tabindex'),
                activeImg = '.gallery-item[tabindex="' + imgIndex + '"]',
                $activeImg = $(activeImg);

            if (container.className !== 'base-gallery is-visible') {
                updateClassOn((activeImg), 'is-active', 'add');
                getImageSiblings('.gallery-item');
                $activeImg.siblings('.gallery-item').removeClass('is-active');
                updateClassOn('.arrow', 'is-visible', 'add');
                container.className = 'base-gallery is-visible';
            }
        },

        cloak: function() {
            $(arrow).removeClass('is-visible');
            container.className = 'base-gallery';
        },

        shift: function() {
            var that = $(this).attr('data-navigate'),
                imageLoc = $('.gallery-item.is-active').attr('tabindex'),
                maxLen = Number(galleryLen - 1);
            if (that === 'left') {
                if (imageLoc == 0) {
                    return changeSlide(maxLen);
                } else {
                    imageLoc--;
                }
            }
            if (that === 'right') {
                if (imageLoc == maxLen) {
                    return changeSlide(0);
                } else {
                    imageLoc++;
                }
            }
            return changeSlide(imageLoc);
        }
    };

    Post.prototype.build = function(postData) {
        for (var i = 0; i <= postData.length; i++) {
            while (i === postData.length) {
                var media = document.querySelectorAll('figure');
                Carousel.build();
                media.forEach(function(elem){
                    elem.addEventListener('click', Carousel.display)
                });
                arrow.forEach(function(elem){
                    elem.addEventListener('click', Carousel.shift);
                });
                container.addEventListener('click', Carousel.cloak);
                i++;
            }
            $(postHTMLarr[i]).html(postData[i]);
        }
    };

    function parseLink(e) {
        var slug = $(this).attr('href').slice(1, -1);
        e.preventDefault();
        fetchPost(slug);
    }


    function fetchPost(slug) {
        var post = new Post();

        $.get(ghost.url.api('posts/slug/' + slug)).done(function(data) {
            post.build(
                    [data.posts[0].title, data.posts[0].meta_description, data.posts[0].html]
            );
            pageState('isPost');
            history.pushState(null, null, '/' + slug);
            closeButton.addEventListener('click', newPost);
        })
    }


    function newPost() {
        pageState('isHome');
        history.replaceState(null, null, '/');
    }


    function showDropdown(e) {
        e.preventDefault();
        var title = $.trim($(this).text().toLowerCase());

        $('#' + title + '-dropdown').addClass('is-active').removeClass('is-next')
            .siblings('ul').addClass('is-next').removeClass('is-active');

        $('*').on('click', function() {
            $('.dropdown').parents('ul').removeClass('is-active is-next');
        });
    }


    function buildContact(e) {
        e.preventDefault();
        pageState('isContact');
        var input = document.querySelector('input');
        var contactSection = document.querySelector('.contact-section');

        function moveLabel() {
            var label = $(this).next('label');
            var activeInput = $(this).prev('label');
            // if ($(this).charCount <= 0) {
            label.addClass('hasEntry');
        }
        input.addEventListener('focusin', moveLabel);

        function closeContact() {
            pageState('closeContact');
        }
        contactSection.addEventListener("click", closeContact);
    }

    navContact.addEventListener('click', buildContact);

    topMenu.forEach(function(elem) {
        elem.addEventListener('mouseover', showDropdown);
    })

    links.forEach(function(elem) {
        elem.addEventListener('click', parseLink);
    })

});
