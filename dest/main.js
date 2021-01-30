let openMenu = document.querySelector('.menuMB')
let nav = document.querySelector('nav')
let closeMenu = document.querySelector('nav .menu-close')
openMenu.addEventListener("click", function() {
    nav.classList.add('active')
  });
  closeMenu.addEventListener('click', function() {
    nav.classList.remove('active')
  })