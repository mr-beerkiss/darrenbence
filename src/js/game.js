define('game', [
	"tiledmap"
], function (tiledmap) {
  'use strict';

  function Game() {
	this.player = null;
  }

  Game.prototype = {

	preload: function(){
	  this.load.tilemap('test-map', 'assets/tilemaps/test_map.json', null, Phaser.Tilemap.TILED_JSON);
	  this.load.image('map-tiles', 'assets/images/scifi_platformTiles_32x32.png');
	},

	create: function () {
	  var x = this.game.width / 2
		, y = this.game.height / 2
		, map;

	  // init physics (Box2D)
	  this.physics.startSystem(Phaser.Physics.ARCADE);

	  this.physics.arcade.gravity.y = 500;

	  this.tiledmap = tiledmap(this.game);
	  this.tiledmap.load("test-map");
	  // saving the object to a local reference so as not to invoke a getter
	  // function inside the render loop
	  this.tiledmap.collisionLayer = this.tiledmap.getCollisionLayer();

	  this.player = this.add.sprite(x, y, 'test-character');
	  this.player.anchor.setTo(0.5, 0.5);
	  this.player.scale.set(0.5);

	  this.physics.arcade.enable(this.player);
	  
	  this.player.body.linearDamping = 1;
	  this.player.collideWorldBounds = true;

	  this.camera.follow(this.player);

	  this.cursors = this.input.keyboard.createCursorKeys();
	},

	update: function () {

	  this.physics.arcade.collide(this.player, this.tiledmap.collisionLayer);

	  this.player.body.velocity.x = 0;

	  if ( this.cursors.up.isDown ) {
		if ( this.player.body.onFloor()) {
		  this.player.body.velocity.y = -350;
		}
	  }

	  if ( this.cursors.left.isDown ) {
		this.player.body.velocity.x = -350;
	  } else if ( this.cursors.right.isDown ) {
		this.player.body.velocity.x = 350;
	  }
	}


  };

  return Game;

});
