document.addEventListener("DOMContentLoaded", function(){
  const ageRange = document.getElementById('age')
  const ageValue = document.getElementById('ageValue')
  const heightRange = document.getElementById('height')
  const heightValue = document.getElementById('heightValue')
  const weightRange = document.getElementById('weight')
  const weightValue = document.getElementById('weightValue')
  const workoutNo = document.getElementById('workoutNo')
  const workoutYes = document.getElementById('workoutYes')

  const puppetForm = document.getElementById('puppetForm')

  const resultValue = document.getElementById('resultValue')

  const PUPPET_PER_HEIGHT = 30
  const PUPPET_PER_WEIGHT = 20
  const PUPPET_PER_AGE = 5
  const PUPPETS_IF_WORKOUT = 1.3

  function handleSubmit (e) {
    e.preventDefault()
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
    resultValue.innerHTML = numberOfPuppets
  }
  function handleChange (e) {
    const {name, value} = e.target
    switch (name) {
      case 'age':
        ageValue.innerHTML = value
        break
      case 'weight':
        weightValue.innerHTML = `${value} kg`
        break
      case 'height':
        heightValue.innerHTML = `${value} cm`
        break
    }
  }

  function initialize () {
    ageRange.addEventListener('change', handleChange)
    weightRange.addEventListener('change', handleChange)
    heightRange.addEventListener('change', handleChange)
    handleChange({target: ageRange})
    handleChange({target: weightRange})
    handleChange({target: heightRange})
    workoutNo.addEventListener('change', handleChange)
    workoutYes.addEventListener('change', handleChange)

    puppetForm.addEventListener('submit', handleSubmit, false)
  }
  initialize()
})
