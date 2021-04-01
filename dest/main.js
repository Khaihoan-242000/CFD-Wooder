let openMenu = document.querySelector('.menuMB')
let nav = document.querySelector('nav')
let closeMenu = document.querySelector('nav .menu-close')

let opneLang = document.querySelector('.language .language__original')
let menuLang = document.querySelector('.language .language__final')
let itemLang = document.querySelectorAll('.language .language__final ul li')

let headerMenu = document.querySelector('header')

let listItemSlider = document.querySelectorAll('.slider__list-item')
let currentSlider = 0
let number = document.querySelector('.number')
let dot = document.querySelectorAll('.page ul li')

let toTop = document.querySelector('.totop')

/* Menu Mobile */ 
openMenu.addEventListener("click", function() {
    nav.classList.add('active')
  });
closeMenu.addEventListener('click', function() {
    nav.classList.remove('active')
  })
/* lang */ 
opneLang.addEventListener('click', function(e) {
    e.stopPropagation();
    menuLang.classList.toggle('active')
  })  
document.addEventListener('click', function() {
  menuLang.classList.remove('active')
})
/* get lang */ 
itemLang.forEach(function(item) {
  item.addEventListener('click', function() {
    let textLang = document.querySelector('.language .language__original span')
    const languageOriginal = textLang.textContent
    const text = item.textContent;
    textLang.innerHTML = text
    item.innerHTML = languageOriginal
  })
})
// header menu
window.addEventListener('scroll', function() {
  let scrollY = window.pageYOffset
  if(scrollY > 200) {
    headerMenu.classList.add('active')
  }else {
    headerMenu.classList.remove('active')
  }
})

// slider
// listItemSlider.forEach(function(itemSlider, index) {
//   if(itemSlider.classList.contains('active')) {
//       currentSlider = index;
//   }
// })
// function showNumber(index) {
//   number.innerHTML = (index).toString().padStart(2,'0')
// }
// document.querySelector('.next__right').addEventListener('click', function(e) {
//   console.log('ok')
//   e.preventDefault()
//   if(currentSlider < listItemSlider.length - 1) {
//       goTo(currentSlider +1)
//       // listItemSlider[currentSlider].classList.remove('active')
//       // listItemSlider[currentSlider +1].classList.add('active')
//       // currentSlider++
//   } else {
//       goTo(0)
//       // listItemSlider[currentSlider].classList.remove('active')
//       // listItemSlider[0].classList.add('active')
//       // currentSlider = 0
//   }
// })
// document.querySelector('.next__left').addEventListener('click', function(e) {
//   console.log('ok')
//     e.preventDefault()
//   if(currentSlider > 0) {
//       goTo(currentSlider - 1)
//       // listItemSlider[currentSlider].classList.remove('active')
//       // listItemSlider[currentSlider - 1].classList.add('active')
//       // currentSlider--
//   } else {
//       goTo(listItemSlider.length -1)
//       // listItemSlider[currentSlider].classList.remove('active')
//       // listItemSlider[listItemSlider.length -1].classList.add('active')
//       // currentSlider = listItemSlider.length -1
//   }
// })
// dot.forEach(function(li, index) {
//   li.addEventListener('click', function() {
//       goTo(index)
//   })
// })
// function goTo(index) {
//   listItemSlider[currentSlider].classList.remove('active')
//   listItemSlider[index].classList.add('active')
//   dot[currentSlider].classList.remove('active')
//   dot[index].classList.add('active')
//   currentSlider = index
//   showNumber(currentSlider + 1)
// }

// back to top

toTop.addEventListener('click', function() {
    console.log('ok')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
  
  // slider dow
  

  var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// $(window).load(function () {
//     initPhotoSwipeFromDOM('.carousel-img');
// });

window.onload = function() {
  initPhotoSwipeFromDOM('.carousel-img');
}


// menu scroll
function removeActiveMenu() {
    menu.forEach(function(menu__element, index) {
        menu__element.classList.remove('active')
    })
}
let menu = document.querySelectorAll('header .menu a')
let headerMenuTop = document.querySelector('header').offsetHeight;
let sections = []
menu.forEach(function(element, index) {
    let className = element.getAttribute('href').replace('#', '')
    let section = document.querySelector('.' + className)
    sections.push(section)
    element.addEventListener('click', function(e) {
        e.preventDefault()
        window.scrollTo({
            top: section.offsetTop - headerMenuTop,
            behavior: 'smooth'
        });
        // active menu
        removeActiveMenu()
        element.classList.add('active')
    })
})
window.addEventListener('scroll', function(e) {
    e.preventDefault()
    let positionScroll = window.pageYOffset
    sections.forEach(function(section, index) {
        if(positionScroll > section.offsetTop - headerMenuTop - 10) {
            removeActiveMenu()
            menu[index].classList.add('active')
        } else {
            menu[index].classList.remove('active')
        }
    })
})

// video
let buttom_video = document.querySelectorAll('.cd-video')
let popup_video = document.querySelector('.popup-video')
let close_popup = document.querySelector('.close-popup')
buttom_video.forEach(function(item) {
    item.addEventListener('click', function() {
        popup_video.classList.add('active')
    })
})

close_popup.addEventListener('click', function() {
    popup_video.classList.remove('active')
})

// flickity Thư viên
let $carousel = $(".slider__list")
$carousel.flickity({
    cellAlign: 'left',
    contain: false,
    wrapAround: true,
    prevNextButtons: false, 
    on: {

    }
})

$(".next__left").on('click', function() {
    $carousel.flickity('previous')
})
$(".next__right").on('click', function() {
    $carousel.flickity('next')
})