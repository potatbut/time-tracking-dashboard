const infoCards = document.querySelectorAll('.info__button')

setTimeout(function(){
  onTransition()
}, 1000)

function onTransition() {
    document.querySelector('body').removeAttribute('id')
}


infoCards.forEach(infoCard => {
  infoCard.addEventListener('mouseover', function() {
    infoCard.closest('.info__wrapper').classList.add('buttonActive')
  })
  infoCard.addEventListener('mouseleave', function() {
    infoCard.closest('.info__wrapper').classList.remove('buttonActive')
  })
});