define('Character', function(){
	
	var Character = function (game, sprite) {

    	Phaser.Sprite.call(this, game, x, y, sprite);

	};

	Character.prototype = Object.create(Phaser.Sprite.prototype);
	Character.prototype.constructor = Character;


	return Character;
});