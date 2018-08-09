'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const authUi = require('./auth/ui')
const gameEvents = require('./game-api/events')
const game = require('./game')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#start-game').on('click', game.startGame)
  $('.content-button').on('click', authUi.clearContents)
  // $('.submit-button').on('submit', authUi.clearContents)
  authEvents.addHandlers()
  gameEvents.addHandlers()
})
