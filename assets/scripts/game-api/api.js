const config = require('../config')
const store = require('../store')
// const gameLogicEvents = require('../game-logic/game-logic')

const getGames = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/games',
    headers: {
      Authorization: 'Token token=' + store.token
    }
  })
}

const createGame = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/games',
    data: data,
    headers: {
      Authorization: 'Token token=' + store.token
    }
  })
}

const getGame = function (data) {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/games/' + data.game.id,
    headers: {
      Authorization: 'Token token=' + store.token
    }
  })
}

const updateGame = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/games/' + store.game.id,
    data: data,
    headers: {
      Authorization: 'Token token=' + store.token
    }
  })
}

module.exports = {
  getGames,
  createGame,
  getGame,
  updateGame
}
