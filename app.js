const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['red', 'blue', 'purple', 'green', 'orange'];

let time = 0
let score = 0


startBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    createRandomCircle()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event)=>{
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time')) 
        startGame()
    }
})

board.addEventListener('click', (event)=>{
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    screens[2].classList.add('up')
    setInterval(decreaseTime, 1000)
    timeEl.innerHTML = `00:${time}`
}

function decreaseTime(){
    if (time === 0) {
        finishGame()
    }else{
        let current = --time
        if (current <10) {
            current = `0${current}`
        }
        timeEl.innerHTML = `00:${current}`
    }
}

function finishGame(){
    timeEl.parentNode.remove()
    board.innerHTML = `<h1> Wynik: <span class="primary">${score}</span>`
}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNum(10, 50)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNum(0, width - size)
    const y = getRandomNum(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
    circle.style.background = getColor()
}

function getRandomNum(min, max){
   return Math.round(Math.random() * (max - min) + min)
}

function getColor() {
    const randomColor = Math.floor(Math.random()* colors.length);
return colors[randomColor]
}