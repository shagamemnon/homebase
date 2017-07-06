$(function() {
    let container = document.getElementById('base-gallery');
    let arrow = document.getElementsByClassName('arrow');

    var postHTMLarr = $('.active-post-header h1, .active-post-header h5, .active-post-body'),
        zoomHTMLarr = $('figure, figure img, video, img'),
        backgroundHTML = $(".project-thumbs-background, .project-thumbs-container, .home-header"),
        galleryLen,
        link = $('.box-link'),
        iconX = $('.x-icon');


    function changeSlide(i) {
        $('.gallery-item[tabindex=' + i + ']').addClass('is-active').siblings('.gallery-item').removeClass('is-active');
    }


    var Post = function(slug) {
        this.slug = slug;
    };

    Post.prototype = Object.create(Post.prototype);
    Post.prototype.constructor = Post;


    var pageState = function(status) {
        window.scrollTo(0, 0);

        switch (status) {
            case 'isPost':
                $('body').addClass('post-template');
                $('.index-container, body, nav, .top-bar').addClass('is-white');
                $('.active-post').addClass('is-visible');
                $('.box-container').removeClass('is-visible');
                break;

            case 'isHome':
                $('body').removeClass('post-template');
                $('.index-container, body, nav, .top-bar').removeClass('is-white');
                $('.active-post').removeClass('is-visible');
                $('.box-container').addClass('is-visible');
                break;

            case 'isContact':
                $('.contact-section').addClass('is-active');
                $('.nav-contact').addClass('is-active').siblings('.nav-projects').removeClass('is-active');
                setTimeout(function() {
                    $('input#email').focus();
                }, 50);
                break;

            case 'closeContact':
                $('.contact-section').removeClass('is-active');
                $('.nav-projects').addClass('is-active').siblings().removeClass('is-active');
                break;

            default:
                return
        }

        if (status === 'closeContact' || status === 'isHome') {
            iconX.removeClass('post-visible contact-visible').hide();
        }
        if (status === 'isPost' || status === 'isContact') {
            iconX.addClass('post-visible contact-visible').show();
        }

    };


    var Carousel = {
        build: function() {
            $(container).empty();
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
                activeImg = $('.gallery-item[tabindex=' + imgIndex + ']');

            if (container.className !== 'base-gallery is-visible') {
                activeImg.addClass('is-active').siblings('.gallery-item').removeClass('is-active');
                $(arrow).addClass('is-visible');
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

    var historyState;

    Post.prototype.build = function(postData) {
        for (var i = 0; i <= postData.length; i++) {
            while (i === postData.length) {
                Carousel.build();
                $('figure').on("click", Carousel.display);
                $(arrow).on("click", Carousel.shift);
                $(container).on("click", Carousel.cloak);
                if (i === postData.length) {
                    console.log(historyState);
                    return historyState = $('.active-post-body').html();
                }
                i++;
            }
            $(postHTMLarr[i]).html(postData[i]);
        }
    };

    function postURL(e){
        var x = 0;
        if (window.location.pathname.length > 1) {
            var slug = window.location.pathname.slice(1, -1);
            history.replaceState(fetchPost(slug), null, '/'+slug+'/')
        }
        if (window.location.pathname.length === 1) {
            window.location.pathname = '/';
            pageState('isHome');
        }
    }

    // window.onpopstate = postURL;
    window.onload = postURL;

    function parseLink(e) {
        var slug = $(this).attr('href').slice(1, -1);
        e.preventDefault();
        fetchPost(slug);
    }
    link.on("click", parseLink);


    function fetchPost(slug) {
        var post = new Post();

        $.get(ghost.url.api('posts/slug/' + slug)).done(function(data) {
            post.build(
                    [data.posts[0].title, data.posts[0].meta_description, data.posts[0].html]
            );
            pageState('isPost');
            if (window.location.pathname.length === 1) {
                history.pushState(null, null, '/');
            }
            history.pushState(null, null, '/'+slug);
            iconX.on("click", function() {
                pageState('isHome');
                history.replaceState(null, null, '/');
            })

        })
    }


    function showDropdown(e) {
        e.preventDefault();
        var title = $.trim($(this).text().toLowerCase());

        $('#' + title + '-dropdown').addClass('is-active').removeClass('is-next')
            .siblings('ul').addClass('is-next').removeClass('is-active');

        $('*').on("click", function() {
            $('.dropdown').parents('ul').removeClass('is-active is-next');
        });
    }
    $('ul#topMenu li[role="presentation"], ul#topMenu li[role="presentation"] a').on("mouseover", showDropdown);


    function buildContact(e) {
        e.preventDefault();
        pageState('isContact');

        function moveLabel() {
            var label = $(this).next('label');
            var activeInput = $(this).prev('label');
            // if ($(this).charCount <= 0) {
            label.addClass('hasEntry');
        }
        $('input').on("focusin", moveLabel);

        function closeContact() {
            pageState('closeContact');
        }
        $('.contact-section').on("click", closeContact);
    }
    $('.nav-contact').on("click", buildContact);
});
