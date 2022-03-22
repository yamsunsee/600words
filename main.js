const index = document.querySelector("#index")
const english = document.querySelector("#english")
const image = document.querySelector("#image")
const meaning = document.querySelector("#meaning")
const audio = document.querySelector("#audio")
const previous = document.querySelector("#previous")
const next = document.querySelector("#next")

const words = data.sort(() => Math.random() - 0.5)
const length = words.length
console.log("words:", words)
let currentIndex = 0

next.onclick = () => {
  currentIndex = Math.min(++currentIndex, length - 1)
  update()
}

previous.onclick = () => {
  currentIndex = Math.max(--currentIndex, 0)
  console.log(currentIndex)
  update()
}

audio.onclick = () => {
  var audio = new Audio(words[currentIndex].audio)
  audio.play()
}

document.addEventListener("keydown", (key) => {
  switch (key.code) {
    case "ArrowRight":
      next.click()
      break

    case "ArrowLeft":
      previous.click()
      break

    case "Space":
    case "ArrowDown":
      audio.click()
      break

    default:
      break
  }
})

const update = () => {
  english.innerText = words[currentIndex].english
  meaning.innerText = words[currentIndex].meaning
  image.src = words[currentIndex].image
  index.innerText = `${currentIndex + 1}/${length}`
  audio.click()
}

update()
