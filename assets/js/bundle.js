(function e(t,o,r){function n(a,c){if(!o[a]){if(!t[a]){var s=typeof require=="function"&&require;if(!c&&s)return s(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=o[a]={exports:{}};t[a][0].call(u.exports,function(e){var o=t[a][1][e];return n(o?o:e)},u,u.exports,e,t,o,r)}return o[a].exports}var i=typeof require=="function"&&require;for(var a=0;a<r.length;a++)n(r[a]);return n})({1:[function(e,t,o){var r=e("./post.js");var n=document.querySelector(".base-gallery");var i=document.querySelector(".arrow-left");var a=document.querySelector(".arrow-right");var c=function(e){r.call(this,e)};c.prototype=Object.create(r.prototype);c.prototype.constructor=c;var s=function(e){var t=n.querySelectorAll(".gallery-item"),o=t.length-1;var r=n.querySelector(".is-active").tabIndex;var i=Number(r);switch(e){case"left":i<1?i=o:i--;break;case"right":i===o?i=0:i++;break;default:return}t.forEach(function(e){e.tabIndex!==i?e.className="gallery-item":e.className="gallery-item is-active"})};c.prototype.display=function(e){var t=this,o=document.querySelector(e),r=document.querySelectorAll(".gallery-item");if(n.className!=="base-gallery is-visible"){o.className+=" is-active";r.forEach(function(e){if(e!==o){e.className="gallery-item"}else{e.className="gallery-item is-active"}});n.className="base-gallery is-visible"}};c.prototype.build=function(){var e=this;var t=document.createElement("div");t.innerHTML=this.HTMLdata;var o="div > figure, div > img, div > .custom-selector, div > video, div > iframe",r=t.querySelectorAll(o),c=activePost.querySelectorAll(o),l=r.length,u=[];while(this.container.firstChild){this.container.removeChild(this.container.firstChild)}Array.prototype.forEach.call(r,function(t,o){var r=document.createElement("div");r.className="gallery-item";r.appendChild(t);r.setAttribute("tabindex",""+o+++"");u.push(r.outerHTML);while(o===l){var d=u.join("");n.innerHTML=d;n.addEventListener("click",e.cloak);i.addEventListener("click",function(){s("left")});a.addEventListener("click",function(){s("right")});c.forEach(function(t,o){t.setAttribute("tabindex",""+o+++"");t.addEventListener("click",function(){var o=t.getAttribute("tabindex");e.display('.gallery-item[tabindex="'+o+'"]')})});o++}})};c.prototype.cloak=function(){n.className="base-gallery"};t.exports=c},{"./post.js":4}],2:[function(e,t,o){var r=e("./post.js");var n=function(e,t,o){r.call(this,e,t,o)};n.prototype=Object.create(r.prototype);n.prototype.constructor=n;n.prototype.display=function(){var e=document.createElement("div"),t=document.createElement("h1"),o=document.createElement("h5");e.innerHTML=this.HTMLdata;t.innerHTML=this.title;o.innerHTML=this.metaDesc;while(activePost.firstChild){this.activePost.removeChild(activePost.firstChild)}while(activePostHeader.firstChild){this.activePostHeader.removeChild(activePostHeader.firstChild)}this.activePost.appendChild(e);this.activePostHeader.appendChild(t);this.activePostHeader.appendChild(o)};t.exports=n},{"./post.js":4}],3:[function(e,t,o){var r=e("./layout.js");var n=e("./carousel.js");var i=r();var a=n();var c=document.querySelector(".splash-screen"),s=document.querySelector(".nav-contact"),l=document.querySelector(".contact-section"),u=document.querySelector(".x-icon"),d=document.querySelector(".home-link"),m=document.querySelectorAll(".box-link"),p=document.querySelectorAll(".arrow"),v=document.querySelector("input#name"),h=document.querySelector(".contact"),f=document.querySelectorAll(".contact-section input"),y=document.getElementById("topMenu"),g=document.getElementById("projects-dropdown"),b=document.querySelectorAll(".thumbnail-buttons .gallery-button");var w=function(){window.scrollTo(0,0);return{isPost:function(){return document.body.className="post-template"},isHome:function(){return document.body.className="home-template"},isCarousel:function(){return document.body.className="post-template carousel-template"},isContact:function(){return document.body.className+="contact-template"}}}();var q={getURL:function(){if(window.location.pathname.length>1){w.isPost();c.className="splash-screen"}else{w.isHome();history.replaceState(null,null,"/");c.className="splash-screen"}},showDropdown:function(){g.className="projects-dropdown is-active";document.body.addEventListener("click",q.hideDropdown)},hideDropdown:function(){g.className="projects-dropdown";document.body.removeEventListener("click",q.hideDropdown)},showContact:function(e){e.preventDefault();w.isContact();var t=document.querySelectorAll("input");var o=document.querySelector(".contact-section")},closeContact:function(){w.isHome()},goBack:function(e){e.preventDefault();history.replaceState(null,null,"/");w.isHome()},fetchPost:function(e){var t=new XMLHttpRequest;c.classList.add("is-visible");t.onreadystatechange=function(){if(t.readyState==XMLHttpRequest.DONE){setTimeout(function(){c.classList.remove("is-visible")},80);if(t.status==200){var o=JSON.parse(t.responseText);console.log(o.posts[0]);w.isPost();i=new r(o.posts[0].html,o.posts[0].title,o.posts[0].meta_description);a=new n(o.posts[0].html);history.pushState(null,null,"/"+e+"/");i.display();a.build()}else if(t.status==400){w.isHome()}else{console.log("something else other than 200 was returned")}}};t.open("GET",ghost.url.api("posts/slug/"+e));t.send()}};window.onload=q.getURL;m.forEach(function(e,t,o){e.setAttribute("data-project",t);e.addEventListener("click",function(t){var o=e.pathname.slice(1,-1);t.preventDefault();q.fetchPost(o)})});y.addEventListener("mouseover",q.showDropdown);s.addEventListener("click",q.showContact);u.addEventListener("click",q.closeContact);d.addEventListener("click",q.goBack);b.forEach(function(e,t,o){e.addEventListener("click",function(e){var t=document.querySelector(".gallery-item");t.className="gallery-item is-active"})})},{"./carousel.js":1,"./layout.js":2}],4:[function(e,t,o){var r=function(e,t,o,r){this.HTMLdata=e;this.title=t;this.metaDesc=o;this.slug=r;this.activePost=document.querySelector(".active-post-body");this.activePostHeader=document.querySelector(".active-post-header");this.arrow=document.querySelectorAll(".arrow");this.container=document.getElementById("base-gallery")};t.exports=r},{}]},{},[3]);
//# sourceMappingURL=bundle.js.map
