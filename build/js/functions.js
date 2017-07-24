(function() {
    'use strict';
    var splash = document.querySelector('.splash-screen'),
        contactBtn = document.querySelector('.nav-contact'),
        contactSection = document.querySelector('.contact-section'),
        contactClose = document.querySelector('.x-icon'),
        backArrow = document.querySelector('.home-link'),
        box = document.querySelectorAll('.box-link'),
        arrow = document.querySelectorAll('.arrow'),
        contactInput = document.querySelector('input#name'),
        contactModule = document.querySelector('.contact'),
        activePost = document.querySelector('.active-post-body'),
        activePostHeader = document.querySelector('.active-post-header'),
        contactEntries = document.querySelectorAll('.contact-section input'),
        container = document.getElementById('base-gallery'),
        navMenu = document.getElementById('topMenu'),
        mediaItems = 'div > figure, div > img, div > .custom-selector, div > video, div > iframe',
        arrowLeft = document.querySelector('.arrow-left'),
        arrowRight = document.querySelector('.arrow-right'),
        projDropdown = document.getElementById('projects-dropdown'),
        galleryBtn = document.querySelectorAll('.thumbnail-buttons .gallery-button'),
        mediaCount,
        post,
        layout,
        slide,
        carousel;

    var updateClassOn = function(selector, clazzes, toggle) {
        var classes = document.querySelectorAll('' + selector + '');
        if (toggle === 'add') {
            for (var i = 0; i < classes.length; i++) {
                classes[i].classList.add('' + clazzes + '')
            }
        }
        if (toggle === 'remove' || toggle === false) {
            for (var i = 0; i < classes.length; i++) {
                classes[i].classList.remove('' + clazzes + '')
            }
        }
    };


    var updateView = function(selector) {
        if (document.body.classList.contains('' + selector + '') !== true) {
            document.body.classList.add('' + selector + '')
        }
    };


    function postURL(event) {
        if (window.location.pathname.length > 1) {
            var slug = window.location.pathname.slice(-1,1);
            events.fetchPost(slug);
            setTimeout(function(){
                splash.classList.remove("is-visible");
            }, 200);
        } else {
            splash.classList.remove("is-visible");
        }
    }
    window.onload = postURL;
    window.onpopstate = postURL;


    var pageState = {
        isPost: function() {
            window.scrollTo(0, 0);
            updateView('post-template');
        },
        isHome: function() {
            window.scrollTo(0, 0);
            document.body.className = 'home-template';
        },
        isCarousel: function() {
            updateView('carousel-template');
        },
        isContact: function() {
            updateView('contact-template');
        }
    };


    var Post = function(HTMLdata, title, metaDesc, slug) {
        this.HTMLdata = HTMLdata;
        this.title = title;
        this.metaDesc = metaDesc;
        this.slug = slug;
    };


    var Layout = function(HTMLdata, title, metaDesc) {
        Post.call(this, HTMLdata, title, metaDesc);
    };

    Layout.prototype = Object.create(Post.prototype);
    Layout.prototype.constructor = Layout;


    Layout.prototype.display = function() {
        var bodyData = document.createElement('div');
        var postHeadline = document.createElement('h1');
        var postSubHed = document.createElement('h5');
        bodyData.innerHTML = this.HTMLdata;
        postHeadline.innerHTML = this.title;
        postSubHed.innerHTML = this.metaDesc;

        while (activePost.firstChild) {
            activePost.removeChild(activePost.firstChild);
        }
        while (activePostHeader.firstChild) {
            activePostHeader.removeChild(activePostHeader.firstChild);
        }
        activePost.appendChild(bodyData);
        activePostHeader.appendChild(postHeadline);
        activePostHeader.appendChild(postSubHed);
    };


    var Carousel = function(HTMLdata) {
        Layout.call(this, HTMLdata);
    };

    Carousel.prototype = Object.create(Layout.prototype);
    Carousel.prototype.constructor = Carousel;

    Carousel.prototype.display = function(elem) {
        var activeImg = document.querySelector(elem);
        var slides = document.querySelectorAll('.gallery-item');

        if (container.className !== 'base-gallery is-visible') {
            updateClassOn((elem), 'is-active', 'add');
            slides.forEach(function(elem) {
                if (elem !== activeImg) {
                    elem.className = 'gallery-item';
                } else {
                    elem.className = "gallery-item is-active";
                }
            })
            updateClassOn('.arrow', 'is-visible', 'add');
            container.className = 'base-gallery is-visible';
        }
    };

    Carousel.prototype.build = function() {
        var that = this;
        var slideTemplate = document.createElement('div');
        slideTemplate.innerHTML = this.HTMLdata;

        var carouselMedia = slideTemplate.querySelectorAll(mediaItems),
            postMedia = activePost.querySelectorAll(mediaItems),
            mediaCount = carouselMedia.length,
            gallery = [],
            newGallery,
            mediaLen;

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        Array.prototype.forEach.call(carouselMedia, function(item, i) {
            var slide = document.createElement('div');
            slide.className = 'gallery-item';
            slide.appendChild(item);
            slide.setAttribute('tabindex', '' + i++ + '');
            gallery.push(slide.outerHTML);

            while (i === mediaCount) {
                var newGallery = gallery.join('');
                container.innerHTML = newGallery;
                container.addEventListener('click', that.cloak);
                arrowLeft.addEventListener('click', move.left);
                arrowRight.addEventListener('click', move.right);

                postMedia.forEach(function(elem, x) {
                    elem.setAttribute('tabindex', '' + x++ + '');
                    elem.addEventListener('click', function() {
                        var imgIndex = elem.getAttribute('tabindex');
                        that.display('.gallery-item[tabindex="' + imgIndex + '"]');
                    })
                });
                i++;
            }
        })
    };


    Carousel.prototype.cloak = function() {
        arrow.forEach(function(elem) {
            elem.classList.remove('is-visible')
        })
        container.className = 'base-gallery';
    };


    var move = {
        left: function() {
            changeSlide('left')
        },
        right: function() {
            changeSlide('right')
        }
    };

    function changeSlide(direction) {
        var slides = container.querySelectorAll('.gallery-item'),
            activeImg = container.querySelector('.is-active').tabIndex,
            loc = Number(activeImg),
            maxLen = (slides.length) - 1;
        console.log(activeImg, slides.length);
        if (direction === 'left') {
            loc < 1 ? loc = maxLen : loc--;
        }
        if (direction === 'right') {
            loc === maxLen ? loc = 0 : loc++;
        }
        slides.forEach(function(elem) {
            if (elem.tabIndex !== loc) {
                elem.className = 'gallery-item';
            } else {
                elem.className = 'gallery-item is-active';
            }
        });
    };



    var events = {

        showDropdown: function() {
            projDropdown.className = 'projects-dropdown is-active';
            document.body.addEventListener('click', events.hideDropdown);
        },

        hideDropdown: function() {
            projDropdown.className = 'projects-dropdown';
            document.body.removeEventListener('click', events.hideDropdown);
        },

        showContact: function(e) {
            e.preventDefault();
            pageState.isContact();
            var input = document.querySelectorAll('input');
            var contactSection = document.querySelector('.contact-section');

            function moveLabel() {
                var label = $(this).next('label');
                var activeInput = $(this).prev('label');
                label.addClass('hasEntry');
            }
            // input.addEventListener('focusin', moveLabel);
        },

        closeContact: function() {
            pageState.isHome();
        },

        goBack: function(event) {
            event.preventDefault();
            history.replaceState(null, null, '/');
            pageState.isHome();
        },

        fetchPost: function(slug) {
            var httpRequest = new XMLHttpRequest();
            pageState.isPost();
            splash.classList.add("is-visible");

            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState == XMLHttpRequest.DONE) {
                    setTimeout(function(){
                        splash.classList.remove("is-visible");
                    }, 80);
                    if (httpRequest.status == 200) {
                        var data = JSON.parse(httpRequest.responseText);
                        console.log(data.posts[0]);
                        layout = new Layout(data.posts[0].html, data.posts[0].title, data.posts[0].meta_description);
                        carousel = new Carousel(data.posts[0].html);
                        history.pushState(null, null, '/'+slug+'/');
                        layout.display();
                        carousel.build();
                    } else if (httpRequest.status == 400) {
                        pageState.isHome();
                    } else {
                        console.log('something else other than 200 was returned');
                    }
                }
            };

            httpRequest.open("GET", ghost.url.api('posts/slug/' + slug));
            httpRequest.send();
        }
    };

    window.onpopstate = function(){
        if (window.location.pathname.length > 1) {
            pageState.isPost();
        } else {
            pageState.isHome();
            history.replaceState(null, null, '/');
        }
    };

    // EVENT LISTENERS

    box.forEach(function(elem, i, x) {
        elem.setAttribute('data-project', i);
        elem.addEventListener('click', function(event) {
            var slug = elem.pathname.slice(1, -1);
            event.preventDefault();
            events.fetchPost(slug);
        })
    });

    navMenu.addEventListener('mouseover', events.showDropdown);

    contactBtn.addEventListener('click', events.showContact);

    contactClose.addEventListener('click', events.closeContact);

    backArrow.addEventListener('click', events.goBack);

    galleryBtn.forEach(function(elem, i, x) {
        elem.addEventListener('click', function(event){
            var firstGalleryImg = document.querySelector('.gallery-item');
            firstGalleryImg.className = "gallery-item is-active";
        })
    });

})();
