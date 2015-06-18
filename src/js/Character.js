define('Character', function(){
	'use strict'

	/**
	 * Generating a character by setting up a Phaser.Sprite object
	 * @param {object} game Phaser.Game
	 * @param {string} sprite key of the preloaded asset
	 */
	function Character (game, sprite) {

		Phaser.Sprite.call(this, game, 0, 0, sprite);

    	this.anchor.setTo(0.5, 0.5);
		this.collideWorldBounds = true;	

	};

	// inheriting the object from Phaser.Sprite
	var p = Character.prototype = Object.create(Phaser.Sprite.prototype);
	p.constructor = Character;

	/**
	 *
	 */
	p.putTo = function( x, y ) {

		this.x = x;
		this.y = y;

	};

	return Character;
});