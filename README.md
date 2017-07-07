# HomeBase

A fast, AJAX-driven theme for Ghost that can be navigated end-to-end without reloading the page. HomeBase has *no frontend library dependencies* besides jQuery & the Ghost Public API.
* * *


## Features

* Media Carousel that supports images, videos and iframe. Automatically generated for every post. View demo here.
* Responsive layout w/ flexbox
* SEO-friendly URL structure
* AMP support
* 100/100 on Google's Page Speed test

## Quick Start

1. Download the .zip file. Navigate to Settings → General in the Ghost admin panel and upload.
2. Navigate to Settings → Labs and check the green box next to **Public API**

## Options

*Note: The media carousel is included by default in `functions.min.js`. If you *do not* want to modify the carousel's default behavior, then stop reading!*

### Media Carousel

Every time a visitor opens a post or page, the  `Carousel` object clones every `img`, `video`, `figure` or `iframe` that was via the Ghost admin panel. Carousel works with embedded videos (i.e. YouTube or Vimeo) and external image links. `Carousel` is made visible when a visitor clicks on any media within the post (all `img,` `video,` `figure` and `iframe` tags have the `cursor: zoom-out` property).

To modify the Carousel's default behavior, insert this *snippet* after `functions.min.js` has loaded:

```
Carousel.options({
    // default options...
    swipe: 'on',
    vertical: 'contained',
    items: ['img', 'video', 'figure', 'iframe', 'object', 'embed']
});
```

##### SETTINGS

`swipe: 'off'`
Hide arrows and turn off left-right swiping.

`vertical: 'full'`
Enable up-down scroll on images with vertical orientation. *Note: for *`img`*, *`iframe`* etc. in the carousel, enabling this will display a vertical scrollbar on oversized images *(i.e. `overflow-y: scroll`)*.*

`items: ['img', 'video', 'figure', 'iframe', 'object', '.carousel-item', '#MY_SELECTOR'`, ...`]`
Modify parent tags and/or selectors to be included inside carousel.

`init: '.MY_SELECTOR'`
Initiate carousel using a specified selector or tag. Default behavior is to initiate carousel whenever a `click` event is triggered on a selector in the `items` array.
