define('Hero', [
	'Character'
], function(Character){
	'use strict'
	
	function Hero ( game ){

		Character.call(this, game, 'test-character');
		this.initialize(game);

	}

	var p = Hero.prototype = Object.create(Character.prototype);
	p.constructor = Hero;

	p.initialize = function( game ){

		this.setAnimations();

	};

	p.setAnimations = function() {

		console.log(this);
		// Stance (4 frames)
		this.animations.add('stance', [0, 1, 2, 3], 10);
	    this.animations.add('run', [4, 5, 6, 7, 8, 9, 10, 11], 10, true);
	    this.animations.add('swing', [12, 13, 14, 15], 10, true);
	    this.animations.add('block', [16, 17], 10, true);
	    this.animations.add('die', [18, 19, 20, 21, 22, 23], 10, true);
	    this.animations.add('cast', [24, 25, 26, 27], 10, true);
	    this.animations.add('shoot', [28, 29, 30, 31], 10, true);
	    this.animations.add('walk', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
	    this.animations.add('duck', [40, 41], 10, true);
	    this.animations.add('jump', [42, 43, 44, 45, 46, 47], 10, true);
	    this.animations.add('ascend', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
	    this.animations.add('descend', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);
	    this.animations.add('stand', [64], 10, true);

	    this.animations.play(64);		
	};

	return Hero;

});