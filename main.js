const form = document.querySelector('.form')
const input = document.querySelector('.form input')
const nickEl = document.querySelector('.nick')
const loadingEl = document.querySelector('.loading')
const errorEl = document.querySelector('.error-txt')

form.addEventListener('submit', (e)=> {
  e.preventDefault();
  nickEl.innerText = ''
  errorEl.innerText = ''
  const count = countLetters(e)

  if (count.length === 0) {
    errorEl.innerText = "Empty field!!"
    return
  }

  generateNick(count)
})

const countLetters = (e) => {
  const string = input.value.trim()
  const splited = string.split('')

  const grouped = splited.map(letter => {
    const restricted = ['a', 'e', 'i', 'o', 'u', 'á', 'â', 'ã', 'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú', ' ']

    if (letter === 'ç') {
      return 'c'
    }

    if (restricted.includes(letter)) {
      return
    }

    return letter
  }).filter(item => item !== undefined)

  const count = []
  grouped.forEach((letter, index)=> {

    if (index === 0 ) {
      count.push({
        letter: letter,
        count: 1 
      })

      return
    } else {
      let hasTheLetter = false

      count.forEach((item, cIndex) => {
        if (item.letter === letter) {
          count[cIndex].count++
          hasTheLetter = true
          return 
        }
      })
      if (!hasTheLetter) {
        count.push({
          letter: letter,
          count: 1 
        })
      }
    }
  })

  return count
}

const generateNick = (count) => {
  let nick = "";

  count.forEach((item) => {

    if (item.count === 1) {
      return nick += item.letter
    }
    return nick += `${item.count}${item.letter}`
  })

  loadingEl.classList.add('active')
  
  setTimeout(()=> {
    loadingEl.classList.remove('active')

  }, 1000)

  setTimeout(()=> {
    nickEl.innerText = nick.toLowerCase()
  }, 1200)
}
