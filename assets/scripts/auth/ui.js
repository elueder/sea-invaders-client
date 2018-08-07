'use strict'

const store = require('../store')

const signUpSuccess = function (signUpResponse) {
  store.token = signUpResponse.user.token
  $('#user-messages').html('')
  $('.content').html('')
  $('#user-messages').html(`
    <div class="alert alert-success alert-dismissable">
    <button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>
    Signed up! Please sign in.</div>
    `)
  document.getElementById('sign-up-form').reset()
  document.getElementById('sign-in-form').reset()
  document.getElementById('change-password-form').reset()
}

const signUpError = function () {
  $('#user-messages').html('')
  $('.content').html('')
  $('#user-messages').html(`<div class="alert alert-warning">
    <button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>
    Error signing up. Please try again.
    </div>`)
  document.getElementById('sign-up-form').reset()
  document.getElementById('sign-in-form').reset()
  document.getElementById('change-password-form').reset()
}

const signInSuccess = function (signInResponse) {
  store.token = signInResponse.user.token
  $('#user-messages').html('')
  $('.content').html('')
  $('#user-messages').html('')
  document.getElementById('sign-up-form').reset()
  document.getElementById('sign-in-form').reset()
  document.getElementById('change-password-form').reset()
}

const signInError = function () {
  $('#user-messages').html('')
  $('.content').html('')
  $('#user-messages').html(`<div class="alert alert-warning">
    <button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>
    Error signing in. Please try again.
    </div>`)
  document.getElementById('sign-up-form').reset()
  document.getElementById('sign-in-form').reset()
  document.getElementById('change-password-form').reset()
}

const signOutSuccess = function (signOutResponse) {
  $('#user-messages').html('')
  $('.content').html('')
  $('#user-messages').html('')
  document.getElementById('sign-up-form').reset()
  document.getElementById('sign-in-form').reset()
  document.getElementById('change-password-form').reset()
}

const signOutError = function (signOutResponse) {
  $('#user-messages').html('')
  $('.content').html('')
  $('#user-messages').html(`<div class="alert alert-warning">
    <button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>
    Error signing out. Please try again.
    </div>`)
  document.getElementById('sign-up-form').reset()
  document.getElementById('sign-in-form').reset()
  document.getElementById('change-password-form').reset()
}

const changePasswordSuccess = function () {
  $('#user-messages').html('')
  $('.content').html('')
  $('#user-messages').html(`
    <div class="alert alert-success alert-dismissable">
    <button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>
    Password changed!</div>
    `)
  document.getElementById('sign-up-form').reset()
  document.getElementById('sign-in-form').reset()
  document.getElementById('change-password-form').reset()
}

const changePasswordError = function () {
  $('#user-messages').html('')
  $('.content').html('')
  $('#user-messages').html(`<div class="alert alert-warning">
    <button type="button" class="close" aria-hidden="true" data-dismiss="alert">&times;</button>
    Error changing password. Please try again.
    </div>`)
  document.getElementById('sign-up-form').reset()
  document.getElementById('sign-in-form').reset()
  document.getElementById('change-password-form').reset()
}

module.exports = {
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  signOutSuccess,
  signOutError,
  changePasswordSuccess,
  changePasswordError
}
