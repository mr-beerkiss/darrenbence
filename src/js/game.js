define('game', function () {
  'use strict';

  function Game() {
    this.player = null;
  }

  function loadTiledMap(mapName){
    var map,
        layers = {};

    map = this.game.add.tilemap(mapName);
    map.addTilesetImage('tileset', 'map-tiles');

    // the floor tiles
    map.setCollisionBetween(0,1);
    map.setCollisionBetween(1,255);
    map.setCollisionBetween(256,3000);

    layers.background = map.createLayer('background');
    layers.floor = map.createLayer('floor');
    
    layers.floor.resizeWorld();

    this.game.tiledMap = {};
    this.game.tiledMap.map = map;
    this.game.tiledMap.layers = layers;

  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2
        , map;

      // init physics (Box2D)
      this.physics.startSystem(Phaser.Physics.ARCADE);

      this.physics.arcade.gravity.y = 500;

      loadTiledMap.call(this, 'test-map');

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

      this.physics.arcade.collide(this.player, this.game.tiledMap.layers.background);

      this.player.body.velocity.x = 0;

      if ( this.cursors.up.isDown ) {
        if ( this.player.body.onFloor()) {
          this.player.body.velocity.y = -250;
        }
      }

      if ( this.cursors.left.isDown ) {
        this.player.body.velocity.x = -150;
      } else if ( this.cursors.right.isDown ) {
        this.player.body.velocity.x = 150;
      }
    }


  };

  return Game;

});
