'use script'

const store = require('../store')

const getGamesSuccess = function (data) {
  let totalCount = 0
  let winCount = 0
  data.games.forEach(function (game) {
    totalCount += 1
  })
  data.games.forEach(function (game) {
    if (game.won === true) {
      winCount += 1
    }
  })
  if (totalCount === 0) {
    $('#game-stats-body').html(`<p>You haven't played any games yet!</p>`)
  } else {
    $('#game-stats-body').html(`<p>You've won ${winCount} out of ${totalCount}!</p>`)
  }
}

const getGamesFail = function () {
  $('#game-stats-body').html(`<p>We can't count today!</p>`)
}

const createGameSuccess = function (data) {
  store.game = data.game
}

const createGameFail = function () {
  if (store.token) {
    $('#msg-container').html(`Couldn't create game. Please try again.`)
  } else {
    $('#msg-container').html('Sign in to save your games, or just play for fun!')
  }
}

module.exports = {
  getGamesSuccess,
  getGamesFail,
  createGameSuccess,
  createGameFail
}
