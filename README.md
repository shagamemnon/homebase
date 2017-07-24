# HomeBase

> A fast, AJAX-driven theme for Ghost that can be navigated end-to-end without reloading the page. HomeBase has *no frontend library dependencies* besides the Ghost Public API.


## Features

* Media Carousel w/ support for images, videos & iframe. Automatically generated for all posts.
* Responsive layout w/ flexbox
* SEO-friendly URL structure
* AMP support
<!--<img src="https://github.com/shagamemnon/homebase/blob/master/assets/img/homebase-carousel-demo.gif?raw=true" style="width:100%;display:flex">-->

## Quick Start

1. <a href="https://github.com/shagamemnon/homebase/archive/master.zip">Download theme .zip file</a>. Navigate to <span style="background:#57A3E8;color:white;padding: 2px;border-radius:2px">Settings</span> → <span style="background:#57A3E8;color:white;padding: 2px;border-radius:2px">General</span> in the Ghost admin panel and upload.
2. Navigate to <span style="background:#57A3E8;color:white;padding: 2px;border-radius:2px">Settings</span> → <span style="background:#57A3E8;color:white;padding: 2px;border-radius:2px">Labs</span>  and check the green box next to **Public API**

<img src="https://raw.githubusercontent.com/shagamemnon/homebase/master/assets/img/homebase-settings-screenshots.png" style="width:100%;display:flex">

## Options

> The media carousel is included by default in `functions.min.js`. **If you do *not* want to modify the carousel's default behavior, then stop reading!**

### Media Carousel

Every time a visitor clicks the thumbnail post or page, an Ajax request is made to the Ghost API. The request returns an HTML string that is copied by both the Layout and  `Carousel` object. The `Carousel` object parses the HTML response, looking for every `img`, `video`, `figure` or `iframe` that is a direct descendant of the parent selector, `.active-post-body`. 


* `Carousel` was inspired by [Dropbox Paper](https://github.com/shagamemnon/homebase/blob/master/paper.dropbox.com) and works with all media - including embedded videos (i.e. YouTube or Vimeo) and external image links.
* `Carousel` is made visible when a visitor clicks on any media within the post (all `img,` `video,` `figure` and `iframe` tags have the `cursor: zoom-in` property to convey a clickable region to visitors).

### Settings

To modify the Carousel's default behavior, insert this snippet after `functions.min.js` has loaded:


```javascript
<script>
Carousel.options({
	// 	default options...
    items: ['img', 'video', 'figure', 'iframe', 'embed'],
    swipe: 'on',
    verticalOrient: 'contained'
});
</script>
```


#### init
```javascript
init: '.MY_SELECTOR'
```
Initialize carousel using a specified selector or tag. Default behavior is to initialize whenever a `click` event is fired on a selector in the `items` array.

#### items
```javascript
items: ['img', 'video', 'figure', 'iframe', '.carousel-item', '.MY_SELECTOR' ...]
```
Modify list of parent tags and/or selectors that you want to include inside carousel.

#### swipe
```javascript
swipe: 'off'  // default 'on'
```
Hide arrows and turn off left-right swiping.

#### verticalOrient
```javascript
verticalOrient: 'full'  // default 'contained'
```
Enable up-down scroll on images with vertical orientation. *Note: on desktop browsers, a vertical scrollbar (e.g. `overflow-y: scroll`) will display beside oversized `<img>`, `<iframe>` etc. inside the carousel.*
