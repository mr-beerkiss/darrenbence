(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      
      this.loadResources();
    },
      
    loadResources: function () {

      this.load.tilemap('test-map', 'assets/tilemaps/test_map.json', null, Phaser.Tilemap.TILED_JSON);

      this.load.json('test-map-json', 'assets/tilemaps/test_map.json');

      this.load.image('map-tiles', 'assets/images/scifi_platformTiles_32x32.png');
      //this.load.image('player', 'assets/player.png');

      this.load.image('test-character', 'assets/images/test-character.png');

      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['darrenbence'] = window['darrenbence'] || {};
  window['darrenbence'].Preloader = Preloader;

}());
