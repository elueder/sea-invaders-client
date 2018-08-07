'use strict'

// use canvas
const canvas = document.getElementById('gameboard')
const ctx = canvas.getContext('2d')

// set gameboard size
const x = canvas.width / 2
const y = canvas.height - 20

// create player (cuttlefish) attributes
// use cuttlefish images
const playerHeight = 14
const playerWidth = 16
let playerX = (canvas.width - playerWidth) / 2
const playerImg = new Image()
playerImg.src = 'public/img/cuttlefishsmallicon.png'

// set default values for actions
let rightPressed
let leftPressed
// let spacePressed = false

// create player
const drawPlayer = function () {
  ctx.beginPath()
  ctx.rect(playerX, canvas.height - playerHeight, playerWidth, playerHeight)
  // ctx.fillStyle = '#eee'
  ctx.drawImage(playerImg, playerX, canvas.height - playerHeight, playerWidth, playerHeight)
  // ctx.fill()
  ctx.closePath()
}

// creates everything for game
function draw () {
  // clear canvas on every frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawPlayer()

  // move player
  if (rightPressed && playerX < canvas.width - playerWidth) {
    playerX += 2
  } else if (leftPressed && playerX > 0) {
    playerX -= 2
  }
  requestAnimationFrame(draw)
}

// connect paddle controls to right and left keys
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

// event handler for right & left keys
function keyDownHandler (e) {
  if (e.keyCode === 39) {
    rightPressed = true
  } else if (e.keyCode === 37) {
    leftPressed = true
  }
}

// event handler for right & left keys
function keyUpHandler (e) {
  if (e.keyCode === 39) {
    rightPressed = false
  } else if (e.keyCode === 37) {
    leftPressed = false
  }
}

module.exports = {
  draw
}
