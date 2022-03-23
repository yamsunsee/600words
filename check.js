const index = document.querySelector("#index")
const input = document.querySelector("input")
const english = document.querySelector("#english")
const image = document.querySelector("#image")
const meaning = document.querySelector("#meaning")
const audio = document.querySelector("#audio")
const next = document.querySelector("#next")
const correct = document.querySelector("#correct")
const incorrect = document.querySelector("#incorrect")
const excellent = document.querySelector("#excellent")
const good = document.querySelector("#good")
const normal = document.querySelector("#normal")
const fail = document.querySelector("#fail")
const result = document.querySelector("#result")

const words = data.sort(() => Math.random() - 0.5)
const length = words.length
let currentIndex = 0
let excellentScore = 0
let goodScore = 0
let normalScore = 0
let failScore = 0
let isAudio = false
let isImage = false

next.onclick = () => {
  currentIndex = Math.min(++currentIndex, length - 1)
  update()
}

audio.onclick = () => {
  var audio = new Audio(words[currentIndex].audio)
  audio.play()
  isAudio = true
}

const check = (standard, input) => {
  standard = standard.split(" /")[0].replace(" N/A", "").trim()
  input = input.trim()
  return standard.includes(input.toLowerCase()) && input.length / standard.length === 1
}

document.addEventListener("keydown", (key) => {
  switch (key.code) {
    case "Enter":
      if (english.innerHTML === "") {
        if (check(words[currentIndex].english, input.value)) {
          if (isAudio && isImage) {
            normalScore++
          } else if (isAudio || isImage) {
            goodScore++
          } else {
            excellentScore++
          }
          correct.classList.remove("hidden")
        } else {
          failScore++
          incorrect.classList.remove("hidden")
        }
        english.innerText = words[currentIndex].english
        excellent.innerText = excellentScore
        good.innerText = goodScore
        normal.innerText = normalScore
        fail.innerText = failScore
        audio.click()
      } else {
        next.click()
      }
      break

    case "ArrowDown":
      audio.click()
      break

    case "ArrowRight":
      isImage = true
      image.src = words[currentIndex].image
      break

    default:
      break
  }
})

const update = () => {
  input.value = ""
  input.focus()
  english.innerText = ""
  correct.classList.add("hidden")
  incorrect.classList.add("hidden")
  image.src = ""
  meaning.innerText = words[currentIndex].meaning
  index.innerText = `${currentIndex + 1}/${length}`
  isAudio = false
  isImage = false
  if (excellentScore + goodScore + normalScore + failScore === length) {
    index.classList.add("hidden")
    input.classList.add("hidden")
    meaning.classList.add("hidden")
    audio.classList.add("hidden")
    result.classList.remove("hidden")
    result.innerText = `${(((excellentScore * 3 + goodScore * 2 + normalScore) * 100) / (length * 3)).toFixed(2)}%`
    document.removeEventListener("keydown")
  }
}

update()
