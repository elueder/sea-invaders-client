'use script'

const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

const addHandlers = function () {
  $('#open-game-stats').on('click', onGetGames)
}

const onGetGames = function () {
  event.preventDefault()
  api.getGames()
    .then(ui.getGamesSuccess)
    .catch(ui.getGamesFail)
}

const onCreateGame = function () {
  const data = {
    game: {
      score: store.score,
      over: store.over,
      won: store.won
    }
  }
  api.createGame(data)
    .then(ui.createGameSuccess)
    .catch(ui.createGameFail)
}

const onUpdateGame = function () {
  const data = {
    game: {
      score: store.score,
      over: store.over,
      won: store.won
    }
  }
  api.updateGame(data)
    .then(ui.updateGameSuccess)
    .catch(ui.updateGameFail)
}

module.exports = {
  addHandlers,
  onCreateGame,
  onUpdateGame
}
