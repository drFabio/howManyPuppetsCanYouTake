document.addEventListener("DOMContentLoaded", function(){
  const ageRange = document.getElementById('age')
  const ageValue = document.getElementById('ageValue')
  const heightRange = document.getElementById('height')
  const heightValue = document.getElementById('heightValue')
  const weightRange = document.getElementById('weight')
  const weightValue = document.getElementById('weightValue')
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
  ageRange.addEventListener('change', handleChange)
  weightRange.addEventListener('change', handleChange)
  heightRange.addEventListener('change', handleChange)

})
