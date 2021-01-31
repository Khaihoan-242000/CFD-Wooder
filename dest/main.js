let openMenu = document.querySelector('.menuMB')
let nav = document.querySelector('nav')
let closeMenu = document.querySelector('nav .menu-close')

let opneLang = document.querySelector('.language .language__original')
let menuLang = document.querySelector('.language .language__final')
let itemLang = document.querySelectorAll('.language .language__final ul li')

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