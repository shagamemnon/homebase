# HomeBase

A fast, AJAX-driven theme for Ghost that can be navigated end-to-end without reloading the page. HomeBase has *no frontend library dependencies* besides jQuery & the Ghost Public API.
* * *


## Features

* Media Carousel w/ support for images, videos & iframe. Automatically generated for all posts.
* Responsive layout w/ flexbox
* SEO-friendly URL structure
* AMP support
* 100/100 on Google's Page Speed test
* * *
<img src="https://github.com/shagamemnon/homebase/blob/master/assets/img/homebase-carousel-demo.gif?raw=true" style="width:100%;display:flex">

## Quick Start

1. Download the `.zip` file. Navigate to Settings → General in the Ghost admin panel and upload.
2. Navigate to Settings → Labs and check the green box next to **Public API**

<img src="https://raw.githubusercontent.com/shagamemnon/homebase/master/assets/img/homebase-settings-screenshots.png" style="width:100%;display:flex">

## Options

The media carousel is included by default in `functions.min.js`. **If you do *not* want to modify the carousel's default behavior, then stop reading!**

### Media Carousel

Every time a visitor opens a post or page, the  `Carousel` object clones every `img`, `video`, `figure` or `iframe` that was via the Ghost admin panel. `Carousel` works with embedded videos (i.e. YouTube or Vimeo) and external image links. `Carousel` is made visible when a visitor clicks on any media within the post (all `img,` `video,` `figure` and `iframe` tags have the `cursor: zoom-out` property).

To modify the Carousel's default behavior, insert this snippet after `functions.min.js` has loaded:

```javascript
Carousel.options({
    // default options...
    swipe: 'on',
    vertical: 'contained',
    items: ['img', 'video', 'figure', 'iframe', 'object', 'embed']
});
```

##### SETTINGS

```javascript
swipe: 'off'
```
Hide arrows and turn off left-right swiping.

```javascript
vertical: 'full'
```
Enable up-down scroll on images with vertical orientation. *Note: inside the carousel, a vertical scrollbar will display besides oversized *`img`*, *`iframe`* etc (e.g. `overflow-y: scroll`).*

```javascript
items: ['img', 'video', 'figure', 'iframe', 'object', '.carousel-item', '#MY_SELECTOR'`, ...]
```
Modify parent tags and/or selectors to be included inside carousel.

```javascript
init: '.MY_SELECTOR'
```
Initiate carousel using a specified selector or tag. Default behavior is to initiate carousel whenever a `click` event is triggered on a selector in the `items` array.
