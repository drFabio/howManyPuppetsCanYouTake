document.addEventListener("DOMContentLoaded", function(){
  const root = document.getElementById('root')

  const BASE_AVATAR_HEIGHT = 100
  const BASE_AVATAR_WEIGHT = 100

  const PUPPET_PER_HEIGHT = 30
  const PUPPET_PER_WEIGHT = 20
  const PUPPET_PER_AGE = 5
  const PUPPETS_IF_WORKOUT = 1.3
  const puppetColors = ['BlueViolet', 'Crimson', 'DarkMagenta', 'DarkOliveGreen', 'DeepPink', 'LightSeaGreen', 'MediumSeaGreen', 'OrangeRed', 'Turquoise']
  const appState = {
    scales: {
      y: 1,
      x: 1
    }
  }

  let ageRange
  let ageValue
  let heightRange
  let heightValue
  let weightRange
  let weightValue
  let workoutNo
  let workoutYes
  let puppetsToFightTemplate
  let puppetContainerTemplate
  let avatarView

  let askAgain

  let puppetForm

  let resultValue

  let avatar
  let person
  let initialViewBox
  let baseViewBoxWidth
  let baseViewBoxHeight
  function showResults (numberOfPuppets) {
    resultValue.innerHTML = numberOfPuppets
    root.classList.remove('app--asking')
    root.classList.add('app--answering')
    person.classList.add('avatar__personGroup--fighting')
    const container = document.importNode(puppetContainerTemplate.content, true)
    const puppetContainer = container.querySelector('.puppetContainer')
    for (let i = 0; i < numberOfPuppets; i++) {
      const puppet = document.importNode(puppetsToFightTemplate.content, true)
      const top = Math.floor(Math.random() * 100)
      const svg = puppet.querySelector('svg')
      const animationDelay = Math.floor(Math.random() * 3000)
      svg.style.top = `${top}px`
      svg.style.color = getRandomColor()
      svg.style['animation-delay'] = `${animationDelay}ms, ${animationDelay + 1000}ms`
      puppetContainer.appendChild(puppet)
    }
    avatarView.appendChild(container)

  }
  function onAskAgain () {
    root.classList.add('app--asking')
    root.classList.remove('app--answering')
    document.querySelector('.puppetContainer').remove()
    person.classList.remove('avatar__personGroup--fighting')
  }
  function handleSubmit (e) {
    if (e) {
      e.preventDefault()
    }
    const formData = new FormData(puppetForm)
    const height = formData.get('height')
    const weight = formData.get('weight')
    const age = formData.get('age')
    const workout = formData.get('workout')
    let numberOfPuppets = height / PUPPET_PER_HEIGHT
      + weight / PUPPET_PER_WEIGHT
      + age / PUPPET_PER_AGE
    if (workout) {
      numberOfPuppets *= PUPPETS_IF_WORKOUT
    }
    numberOfPuppets = Math.floor(numberOfPuppets)
    showResults(numberOfPuppets)
  }
  function handleChange (e) {
    const {name, value} = e.target
    switch (name) {
      case 'age':
        ageValue.innerHTML = value
        break
      case 'weight':
        weightValue.innerHTML = `${value} kg`
        const xScale = e.target.value / BASE_AVATAR_WEIGHT
        scaleAvatar({xScale})
        break
      case 'height':
        heightValue.innerHTML = `${value} cm`
        const yScale = e.target.value / BASE_AVATAR_WEIGHT
        scaleAvatar({yScale})
        break
    }
  }
  function scaleAvatar ({xScale, yScale}) {
    if (!xScale) {
        xScale = appState.scales.x
      }
      if (!yScale) {
        yScale = appState.scales.y
      }
      const width = baseViewBoxWidth * xScale
      const height = baseViewBoxHeight * yScale
      appState.scales.x = xScale
      appState.scales.y = yScale
      appState.currentViewBox = {width, height}
      const scaleTransform = `scale(${xScale} ${yScale})`
      const transform = `${scaleTransform}`
      person.setAttribute('transform', transform)
      avatar.setAttribute('viewBox', `0 0 ${width} ${height}`)
  }
  function onFormKey (e) {
    if (e.code === 'Enter') {
      handleSubmit()
    }
  }
  function getRandomColor () {
    const index = Math.floor(Math.random() * puppetColors.length)
    return puppetColors[index]
  }
  function createPuppetNode () {
    const svg = document.createElement('svg')
  }

  function initialize () {
    ageRange = document.getElementById('age')
    ageValue = document.getElementById('ageValue')
    heightRange = document.getElementById('height')
    heightValue = document.getElementById('heightValue')
    weightRange = document.getElementById('weight')
    weightValue = document.getElementById('weightValue')
    workoutNo = document.getElementById('workoutNo')
    workoutYes = document.getElementById('workoutYes')
    askAgain = document.getElementById('askAgain')
    puppetForm = document.getElementById('puppetForm')
    resultValue = document.getElementById('resultValue')
    puppetsToFightTemplate = document.getElementById('puppetsToFightTemplate')
    puppetContainerTemplate = document.getElementById('puppetContainerTemplate')
    avatarView = document.getElementById('avatarView')

    avatar = document.querySelector('.avatar')
    person = document.querySelector('.avatar__personGroup')
    initialViewBox = avatar.getAttribute('viewBox').split(' ')
    baseViewBoxWidth = initialViewBox[2]
    baseViewBoxHeight = initialViewBox[3]

    appState.currentViewBox = {
      width: baseViewBoxWidth,
      height: baseViewBoxHeight
    }
    ageRange.addEventListener('change', handleChange)
    weightRange.addEventListener('change', handleChange)
    heightRange.addEventListener('change', handleChange)

    heightRange.value = BASE_AVATAR_HEIGHT
    weightRange.value = BASE_AVATAR_WEIGHT

    handleChange({target: ageRange})
    handleChange({target: weightRange})
    handleChange({target: heightRange})

    workoutNo.addEventListener('change', handleChange)
    workoutYes.addEventListener('change', handleChange)

    puppetForm.addEventListener('submit', handleSubmit, false)
    puppetForm.addEventListener('keypress', onFormKey)
    askAgain.addEventListener('click', onAskAgain)
  }
  initialize()
})
