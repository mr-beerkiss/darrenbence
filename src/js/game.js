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

	 	// animations
		// Stance (4 frames)
		this.player.animations.add('stance', [0, 1, 2, 3], 10);
	    // Run (8 frames)
	    this.player.animations.add('run', [4, 5, 6, 7, 8, 9, 10, 11], 10, true);
	    // Swing weapon (4 frames)
	    this.player.animations.add('swing', [12, 13, 14, 15], 10, true);
	    // Block (2 frames)
	    this.player.animations.add('block', [16, 17], 10, true);
	    // Hit and Die (6 frames)
	    this.player.animations.add('die', [18, 19, 20, 21, 22, 23], 10, true);
	    // Cast spell (4 frames)
	    this.player.animations.add('cast', [24, 25, 26, 27], 10, true);
	    // Shoot bow (4 frames)
	    this.player.animations.add('shoot', [28, 29, 30, 31], 10, true);
	    // Walk (8 frames)
	    this.player.animations.add('walk', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
	    // Duck (2 frames)
	    this.player.animations.add('duck', [40, 41], 10, true);
	    // Jump and Fall (6 frames)
	    this.player.animations.add('jump', [42, 43, 44, 45, 46, 47], 10, true);
	    // Ascend stairs/slope (8 frames)
	    this.player.animations.add('ascend', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
	    // Descend stairs/slope (8 frames)
	    this.player.animations.add('descend', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);
	    // Stand (1 frame)
	    this.player.animations.add('stand', [64], 10, true);
	    this.player.animations.play('stand');


		this.player.anchor.setTo(0.5, 0.5);

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
	  	this.player.animations.play('run');
		this.player.body.velocity.x = -350;
	  } else if ( this.cursors.right.isDown ) {
	  	this.player.animations.play('run');
		this.player.body.velocity.x = 350;
	  }

	}


  };

  return Game;

});
