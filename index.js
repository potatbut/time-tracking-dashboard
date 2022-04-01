
setTimeout(function(){
  onTransition()
}, 1000)

function onTransition() {
    document.querySelector('body').removeAttribute('id')
}