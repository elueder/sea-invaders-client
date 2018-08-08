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

// create bullets
const bulletTotal = 3
const bullets = []

// create attackers
const attackerColumns = 6
const attackerRows = 4
const attackerHeight = playerHeight / 2
const attackerWidth = playerWidth * 1.3
const attackerHorizontalPadding = 25
const attackerVerticalPadding = 5
const attackerSpeed = 4
const attackerArrWidth = (attackerColumns * (attackerWidth + attackerHorizontalPadding))
const attackerArrHeight = (attackerRows * (attackerHeight + attackerVerticalPadding))
let attackerX
let attackerY
let attackerArrX = (attackerColumns * (attackerWidth + attackerHorizontalPadding))
let attackerArrY = (attackerRows * (attackerHeight + attackerVerticalPadding))

const attackerArr = []
for (let i = 0; i < attackerColumns; i++) {
  attackerArr[i] = []
  for (let j = 0; j < attackerRows; j++) {
    attackerX = i * (attackerWidth + attackerHorizontalPadding) + attackerHorizontalPadding
    attackerY = j * (attackerHeight + attackerVerticalPadding) + attackerVerticalPadding
    attackerArr[i][j] = {
      x: 0,
      y: 0,
      status: 1
    }
  }
}


// set default values for actions
let rightPressed = false
let leftPressed = false
let spacePressed = false

// set bullet speed
const numOfMilliseconds = 5000

// create player
const drawPlayer = function () {
  ctx.beginPath()
  ctx.rect(playerX, canvas.height - playerHeight, playerWidth, playerHeight)
  ctx.drawImage(playerImg, playerX, canvas.height - playerHeight, playerWidth, playerHeight)
  ctx.closePath()
}

// create bullets
const drawBullet = function () {
  if (bullets.length) {
    for (let i = 0; i < bullets.length; i++) {
      ctx.fillStyle = '#000'
      ctx.fill()
      ctx.fillRect(bullets[i][0], bullets[i][1], bullets[i][2], bullets[i][3])
    }
  }
}

// set initial x and y variables (called in index.js)
const assignXAndY = function () {
  for (let i = 0; i < attackerColumns; i++) {
    for (let j = 0; j < attackerRows; j++) {
      attackerX = (i * (attackerWidth + attackerHorizontalPadding)) + attackerHorizontalPadding
      attackerY = (j * (attackerHeight + attackerVerticalPadding)) + attackerVerticalPadding
      attackerArr[i][j].x = attackerX
      attackerArr[i][j].y = attackerY
    }
  }
}

const drawAttackers = function () {
  for (let i = 0; i < attackerColumns; i++) {
    for (let j = 0; j < attackerRows; j++) {
      if (attackerArr[i][j].status === 1) {
        ctx.beginPath()
        ctx.rect(attackerArr[i][j].x, attackerArr[i][j].y, attackerWidth, attackerHeight)
        ctx.fillStyle = '#000'
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}

function moveAttackers () {
  for (let i = 0; i < attackerArr.length; i++) {
    const currentAttacker = attackerArr[i]
    for (let j = 0; j < currentAttacker.length; j++) {
      if (attackerArr[i][j].y < canvas.height + 10) {
        attackerArr[i][j].y += 1
      } else if (attackerArr[i][j].y > canvas.height - 1) {
        attackerArr[i][j].y = -80
      }
    }
  }
}

// creates everything for game
function draw () {
  // clear canvas on every frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawPlayer()
  moveBullet()
  // NEED COLLISION DETECTION BEFORE drawAttackers()
  drawAttackers()
  moveAttackers()
  drawBullet()

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

// connect bullet controls to space bar
document.addEventListener('keydown', spaceDownHandler, false)
document.addEventListener('keyup', spaceUpHandler, false)

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

// event handler for space bar
function spaceDownHandler (e) {
  if (e.keyCode === 32 && bullets.length <= bulletTotal) {
    bullets.push([playerX + 7, canvas.height - 8, 2, 5])
    spacePressed = true
  }
}

function spaceUpHandler (e) {
  if (e.keyCode === 32) {
    spacePressed = false
  }
}

function moveBullet () {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i][1] > -11) {
      bullets[i][1] -= 5
    } else if (bullets[i][1] < -10) {
      bullets.splice(i, 1)
    }
  }
}

module.exports = {
  draw,
  assignXAndY
}
