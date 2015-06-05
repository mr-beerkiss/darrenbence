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

    layer = map.createLayer('background');
    layer = map.createLayer('obstacles');

  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      loadTiledMap(this.game, 'test-map');

      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);
    },

    update: function () {
      var x, y, cx, cy, dx, dy, angle, scale;

      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;

      angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      this.player.angle = angle;

      dx = x - cx;
      dy = y - cy;
      scale = Math.sqrt(dx * dx + dy * dy) / 100;

      this.player.scale.x = scale * 0.6;
      this.player.scale.y = scale * 0.6;
    }

  };

  window['darrenbence'] = window['darrenbence'] || {};
  window['darrenbence'].Game = Game;

}());
