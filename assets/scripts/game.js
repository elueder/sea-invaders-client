'use strict'
const Phaser = require('./phaser.min')

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 320,
  id: 'gameBoard',
  transparent: true,
  state: {
    preload: preload,
    create: create,
    update: update
  }
}

const game = new Phaser.Game(config)

let player
let attacker
let inkdots
let inkdot

let key1
let key2
let key3

const addControllers = function () {
  if (key1.isDown) {
    player.x -= 2
  } else if (key2.isDown) {
    player.x +=2
  }
}

const shoot = function () {
  if (key3.isDown) {
    inkdot.fire()
  }
}

function preload () {
  game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE
  game.scale.pageAlignHorizontally = true
  game.scale.pageAlignVertically = true
  game.load.image('player', 'img/cuttlefishsmallicon.png')
  game.load.image('attacker', 'img/eel.png')
  game.load.image('inkdot', 'img/inkdot.png')
}

function create () {
  game.physics.startSystem(Phaser.Physics.ARCADE)
  // add player
  player = game.add.sprite(game.world.width*0.5, game.world.height-30, 'player')
  player.anchor.set(0.5)
  game.physics.enable(player, Phaser.Physics.ARCADE)
  player.body.immovable = true
  player.body.collideWorldBounds = true

  // add key controls to player
  key1 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
  key2 = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  key3 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

  inkdot = game.add.weapon(3, 'inkdot')
  inkdot.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
  inkdot.bulletAngleOffset = 90
  inkdot.bulletSpeed = 400
  inkdot.trackSprite(player, -4, -28)
}

function update () {
  addControllers()
  shoot()
}
