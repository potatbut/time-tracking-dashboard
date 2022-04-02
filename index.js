const dataLink = `data/data.json`
const dashboard = document.querySelector('.dashboard')
const timelineButtons = document.querySelector('.profile__navigation')
let activeTimeline = timelineButtons.querySelector('.button-active').textContent.toLowerCase()


fetch(dataLink)
  .then(responce => {
    return responce.json()
  })
  .then(cardData => {
    setCardData(cardData, activeTimeline)

    onTransition()
    updateTimelineData(cardData, activeTimeline)
  })



function setCardData(cardData, timeline) {

  cardData.forEach((element, index) => {

    const extraClass = element.title.toLowerCase().replace(' ', '-')
    const cardWrapper = document.createElement('div')
    cardWrapper.classList.add('info')
    cardWrapper.classList.add(`${extraClass}`)
    cardWrapper.innerHTML = cardTemplate
      .replace('%CARD_TITLE%', element.title)
      .replace('%CARD_CURRENT_TITLE%', element.timeframes[timeline].current)
      .replace('%CARD_PREVIOUS_TITLE%', element.timeframes[timeline].previous)
      .replace('%CARD_TIMELINE%', (timeline == 'daily') ? 'Day' : (timeline == 'weekly') ? 'Week' : (timeline == 'monthly') ? 'Month' : '')

      console.log(cardWrapper.querySelector('.info__amount').classList.add('opacity'))
    dashboard.appendChild(cardWrapper)
    
    setTimeout(() => {
      cardWrapper.querySelector('.info__amount').classList.remove('opacity')
    }, 100);
  })

  addEffectsOnMoreButton()

}


function onTransition() {
  document.querySelector('body').removeAttribute('id')
}

function addEffectsOnMoreButton() {
  const infoCards = document.querySelectorAll('.info__button')

  infoCards.forEach(infoCard => {
    infoCard.addEventListener('mouseover', function () {
      infoCard.closest('.info__wrapper').classList.add('buttonActive')
    })
    infoCard.addEventListener('mouseout', function () {
      infoCard.closest('.info__wrapper').classList.remove('buttonActive')
    })
  });
}

function updateTimelineData(cardData) {
  timelineButtons.addEventListener('click', function (element) {
    if (element.target.classList.contains('profile__button')) {
      const timelineButtonsArray = Array.from(timelineButtons.children)

      timelineButtonsArray.forEach(element =>
        element.classList.remove('button-active')
      )

      if (element.target.classList.contains('profile__button')) element.target.classList.add('button-active')

      activeTimeline = element.target.getAttribute('data-timeline')
      removeLastInfo()
      setCardData(cardData, activeTimeline)
    }

  })

}

function removeLastInfo() {
  const cards = document.querySelectorAll('.info')
  cards.forEach(e => e.remove())
}


const cardTemplate = `
            <div class="info__wrapper">
              <div class="info__label">%CARD_TITLE%</div>
              <button class="info__button"><img src="images/icon-ellipsis.svg" alt="button icon"> </button>
              <div class="info__amount">%CARD_CURRENT_TITLE%hrs</div>
              <div class="info__note">Last %CARD_TIMELINE% - %CARD_PREVIOUS_TITLE%hrs</div>
            </div>`