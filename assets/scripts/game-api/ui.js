'use script'

const store = require('../store')

const getGamesSuccess = function (data) {
  $('#msg-container').html('')
  $('#content').html('')
  let totalCount = 0
  let winCount = 0
  data.games.forEach(function () {
    totalCount += 1
  })
  data.games.forEach((game) => {
    if (game.won === true) {
      winCount += 1
    }
  })
  $('#game-stats-body').html(`
    <div class="alert alert-success alert-dismissable">
    <button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>
    You've won ${winCount} out of ${totalCount}!</div>
    `)
  document.getElementById('change-password-form').reset()
}

const getGamesFail = function () {
  $('#msg-container').html('')
  // $('#content').html('')
  $('#msg-container').html(`
    <div class="alert alert-warning alert-dismissable">
    <button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>
    We can't count today!</div>
  `)
  document.getElementById('change-password-form').reset()
}

const createGameSuccess = function (data) {
  $('#msg-container').html('')
  store.game = data.game
  $('#msg-container').html(`
    <div class="alert alert-success alert-dismissable">
    <button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>
    New Game Started!</div>
    `)
  document.getElementById('change-password-form').reset()
  gameState()
}

const createGameFail = function () {
  $('#msg-container').html('')
  // $('#content').html('')
  $('#msg-container').html(`
    <div class="alert alert-warning">Server Error.</div>
  `)
  document.getElementById('change-password-form').reset()
}

const gameState = function () {
  $('#game-board, #home').removeClass('hidden')
  $('#sign-up-form, #sign-in-form').addClass('hidden')
}

module.exports = {
  getGamesSuccess,
  getGamesFail,
  createGameSuccess,
  createGameFail
}
