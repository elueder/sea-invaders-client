'use strict'

const store = require('../store')
const game = require('../game')

const clearContents = function () {
  $('input').val('')
  $('#sign-up-modal-body, #sign-in-modal-body, #change-pwd-modal-body, #game-stats-body').html('')
  document.getElementById('sign-up-form').reset()
  document.getElementById('sign-in-form').reset()
  document.getElementById('change-password-form').reset()
}

const signUpSuccess = function (signUpResponse) {
  store.token = signUpResponse.user.token
  $('#sign-up-modal').modal('hide')
  signedInState()
  clearContents()
}

const signUpError = function () {
  signedOutState()
  $('#sign-up-modal-body').html(`<p>Error signing up. Please try again.</p>`)
}

const signInSuccess = function (signInResponse) {
  store.token = signInResponse.user.token
  $('#sign-in-modal').modal('hide')
  signedInState()
  clearContents()
}

const signInError = function () {
  clearContents()
  signedOutState()
  $('#sign-in-modal-body').html(`<p>Error signing in. Please try again.</p>`)
}

const signOutSuccess = function (signOutResponse) {
  clearContents()
  signedOutState()
}

const signOutError = function (signOutResponse) {
  $('#user-messages').html(`<p>Error signing out. Please try again.</p>`)
  clearContents()
}

const changePasswordSuccess = function () {
  $('#change-pwd-modal').modal('hide')
  clearContents()
}

const changePasswordError = function () {
  clearContents()
  $('#change-pwd-modal-body').html(`<p>Error changing password. Please try again.</p>`)
}

const signedInState = function () {
  $('#msg-container').html('')
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
  $('#game-stats-body').html('')
  $('#open-game-stats, #sign-out, #change-pwd-button, #sign-out').removeClass('hidden')
  $('#sign-up-button, #sign-in-button, #signed-out-message').addClass('hidden')
}

const signedOutState = function () {
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
  $('#msg-container').html('Sign in to save your games, or just play for fun!')
  $('#sign-up-button, #sign-in-button, #signed-out-message').removeClass('hidden')
  $('#open-game-stats, #sign-out, #change-pwd-button, #sign-out').addClass('hidden')
}

module.exports = {
  clearContents,
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  signOutSuccess,
  signOutError,
  changePasswordSuccess,
  changePasswordError,
  signedInState,
  signedOutState
}
