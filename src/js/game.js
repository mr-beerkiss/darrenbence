(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  function loadTiledMap(gameObj, mapName){
    var map,
        layer;

    map = gameObj.add.tilemap(mapName);
    map.addTilesetImage('tileset', 'map-tiles');

    ////layer = map.createLayer('background');
    //layer = map.createLayer('obstacles');

    //var floorLayer = map.createLayer('floor');

    //gameObj.physics.box2d.enable(floorLayer);
    //floorLayer.body.static = true;

    // the floor tiles
    map.setCollisionBetween(15, 127);

    map.setCollisionBetween(70, 71);
    map.setCollisionBetween(105, 106);

    map.setCollisionBetween(140, 146);
    map.setCollisionBetween(175, 181);

    map.setCollisionBetween(455, 468);
    map.setCollisionBetween(210, 216);

    return map;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      // init physics (Box2D)
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.physics.arcade.gravity.y = 250;
      //this.physics.box2d.friction = 0.9;

      var map = loadTiledMap(this.game, 'test-map');
      this.floorLayer = map.createLayer('level1');

      this.floorLayer.resizeWorld();

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

      this.physics.arcade.collide(this.player, this.floorLayer);

      this.player.body.velocity.x = 0;

      if ( this.cursors.up.isDown ) {
        if ( this.player.body.onFloor()) {
          this.player.body.velocity.y = -200;
        }
      }

      if ( this.cursors.left.isDown ) {
        this.player.body.velocity.x = -150;
      } else if ( this.cursors.right.isDown ) {
        this.player.body.velocity.x = 150;
      }
    }


  };

  window['darrenbence'] = window['darrenbence'] || {};
  window['darrenbence'].Game = Game;

}());
