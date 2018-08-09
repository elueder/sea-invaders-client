'use strict'

const store = require('./store')
const gameEvents = require('./game-api/events')

// use canvas
const canvas = document.getElementById('gameboard')
const ctx = canvas.getContext('2d')

store.score = 0
store.over = false
store.won = false
let interval
let currentGameId = 0

// create player (cuttlefish) attributes
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
const attackerHeight = playerHeight / 1.5
const attackerWidth = playerWidth * 1.3
const attackerVerticalPadding = 5
const attacker = new Image()
attacker.src = 'public/img/coral.png'
let attackerX
let attackerY

const attackerArr = []
for (let i = 0; i < attackerColumns; i++) {
  attackerArr[i] = []
  for (let j = 0; j < attackerRows; j++) {
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
let fPressed = false

// set initial x and y variables (called in index.js)
const assignXAndY = function () {
  for (let i = 0; i < attackerColumns; i++) {
    for (let j = 0; j < attackerRows; j++) {
      attackerX = (Math.random() * canvas.width) + 1
      attackerY = (j * (attackerHeight + attackerVerticalPadding)) + attackerVerticalPadding
      attackerArr[i][j].x = attackerX
      attackerArr[i][j].y = attackerY
    }
  }
}

// creates everything for game
function draw (loopId) {
  // clear canvas on every frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawScore()
  moveBullet()
  hitAttacker()
  hitPlayer()
  drawPlayer()
  checkForGameOver()
  drawAttackers()
  moveAttackers()
  drawBullet()

  // move player
  if (rightPressed && playerX < canvas.width - playerWidth) {
    playerX += 2
  } else if (leftPressed && playerX > 0) {
    playerX -= 2
  }

  if (loopId === currentGameId) {
    requestAnimationFrame(() => {
      draw(loopId)
    })
  }
}

// create player in middle of screen
function drawPlayer () {
  ctx.beginPath()
  ctx.rect(playerX, canvas.height - playerHeight, playerWidth, playerHeight)
  ctx.drawImage(playerImg, playerX, canvas.height - playerHeight, playerWidth, playerHeight)
  ctx.closePath()
}

// create bullets for player to shoot
function drawBullet () {
  if (bullets.length) {
    for (let i = 0; i < bullets.length; i++) {
      ctx.fillStyle = '#000'
      ctx.fill()
      ctx.fillRect(bullets[i][0], bullets[i][1], bullets[i][2], bullets[i][3])
    }
  }
}

// ATTACKER FUNCTIONS
// create images that will be the attackers
function drawAttackers () {
  for (let i = 0; i < attackerColumns; i++) {
    for (let j = 0; j < attackerRows; j++) {
      if (attackerArr[i][j].status === 1) {
        ctx.beginPath()
        ctx.drawImage(attacker, attackerArr[i][j].x, attackerArr[i][j].y, attackerWidth, attackerHeight)
        ctx.closePath()
      }
    }
  }
}

// move the attackers down the screen
function moveAttackers () {
  for (let i = 0; i < attackerArr.length; i++) {
    const currentAttacker = attackerArr[i]
    for (let j = 0; j < currentAttacker.length; j++) {
      if (attackerArr[i][j].y < canvas.height + 10) {
        attackerArr[i][j].y += 1
      } else if (attackerArr[i][j].y > canvas.height - 1) {
        attackerArr[i][j].x = (Math.random() * canvas.width) + 1
        attackerArr[i][j].y = -80
      }
    }
  }
}

// connect paddle controls to right and left keys
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

// connect bullet controls to space bar
document.addEventListener('keydown', spaceDownHandler, false)
document.addEventListener('keyup', spaceUpHandler, false)

// event handler for right & left keys to move player right and left on same y-axis
function keyDownHandler (e) {
  if (e.keyCode === 39) {
    rightPressed = true
  } else if (e.keyCode === 37) {
    leftPressed = true
  }
}

// event handler for releasing right & left keys
function keyUpHandler (e) {
  if (e.keyCode === 39) {
    rightPressed = false
  } else if (e.keyCode === 37) {
    leftPressed = false
  }
}

// event handlers for space bar -> switch to F key
function spaceDownHandler (e) {
  if (e.keyCode === 70 && bullets.length <= bulletTotal && store.over === false) {
    bullets.push([playerX + 7, canvas.height - 8, 2, 5])
    fPressed = true
  }
}

function spaceUpHandler (e) {
  if (e.keyCode === 70 && store.over === false) {
    fPressed = false
  }
}

// shoot bullet from middle of player
function moveBullet () {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i][1] > -11) {
      bullets[i][1] -= 5
    } else if (bullets[i][1] < -10) {
      bullets.splice(i, 1)
    }
  }
}

// check if bullet x-axis and y-axis match attacker
function hitAttacker () {
  let remove = false
  // cycle through active bullets
  for (let k = 0; k < bullets.length; k++) {
    // cycle through 2d array of attackers
    for (let i = 0; i < attackerColumns; i++) {
      for (let j = 0; j < attackerRows; j++) {
        const attacker = attackerArr[i][j]
        if (attacker.status === 1) {
          // allow for margin of error around center of attacker + half of width on either side
          if (((attacker.x + (attackerWidth / 2) + 6) >= bullets[k][0] &&
          ((attacker.x - (attackerWidth / 2) - 4) <= bullets[k][0])) &&
          ((attacker.y + (attackerHeight / 2)) >= bullets[k][1]) &&
          ((attacker.y - (attackerHeight / 2) - 4) <= bullets[k][1])) {
            remove = true
            store.score++
            attacker.status = 0
            if (store.score === (attackerRows * attackerColumns)) {
              store.won = true
            }
          }
        }
      }
    }
    // prevents error
    if (remove === true) {
      bullets.splice(k, 1)
    }
  }
}

// check if attacker has hit the player -> check moving x-axis and fixed y-axis (player only moves side-to-side)
function hitPlayer () {
  for (let i = 0; i < attackerColumns; i++) {
    for (let j = 0; j < attackerRows; j++) {
      const attacker = attackerArr[i][j]
      // check if attacker is `active`
      if (attacker.status === 1) {
        // match x and y coordinates
        if ((attacker.y >= 127 && attacker.y <= 130) &&
          (attacker.x + (attackerWidth / 2) >= playerX - (playerWidth / 2) &&
          (attacker.x - (attackerWidth / 2) <= playerX + (playerWidth / 2)))) {
          store.over = true
        }
      }
    }
  }
}

// write score in the corner
function drawScore () {
  ctx.font = '16px Arial'
  ctx.fillStyle = 'black'
  ctx.fillText(`Score: ${store.score}`, 15, 20)
}

// right now only have one life; if multiple lives, check if lives < 0
function checkForGameOver (e) {
  if (store.won === true) {
    store.over = true
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = '32px Arial'
    ctx.fillStyle = 'black'
    ctx.fillText('YOU WIN!!', 55, 75)
    gameEvents.onUpdateGame()
    currentGameId += 1
  } else if (store.over === true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = '32px Arial'
    ctx.fillStyle = 'black'
    ctx.fillText('GAME OVER', 55, 75)
    gameEvents.onUpdateGame()
    for (let i = 0; i < attackerColumns; i++) {
      for (let j = 0; j < attackerRows; j++) {
        const attacker = attackerArr[i][j]
        attacker.status = 0
      }
    }
    currentGameId += 1
  }
}

// on button click, run these functions to set game variables and start drawing
function startGame () {
  for (let i = 0; i < attackerColumns; i++) {
    for (let j = 0; j < attackerRows; j++) {
      const attacker = attackerArr[i][j]
      attacker.status = 1
    }
  }
  currentGameId += 1
  // clearInterval(interval)
  // interval = setInterval(moveAttackers, 200)
  store.over = false
  store.won = false
  store.score = 0
  gameEvents.onCreateGame()
  assignXAndY()
  draw(currentGameId)
}

module.exports = {
  startGame,
  ctx,
  canvas
}
