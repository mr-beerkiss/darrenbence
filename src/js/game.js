define('game', function () {
  'use strict';

  function Game() {
    this.player = null;
  }

  function loadTiledMap(mapName){
    var map;

    map = this.game.add.tilemap(mapName);
    map.addTilesetImage('tileset', 'map-tiles');

    // the floor tiles
    map.setCollisionBetween(1, 1000);

    for (var i = map.layers.length - 1, layer; i >= 0; i--){
        layer = map.createLayer(i);
        layer.resizeWorld();
        // Phaser limiation - just the first layer can be used as collidible layer
        if (0 === i){
            map.collisionLayer = layer;
        }
    }

    this.game.tiledMap = map;
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

      this.physics.arcade.collide(this.player, this.game.tiledMap.collisionLayer);

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
