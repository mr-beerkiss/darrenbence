define('tiledmap', function(){

	return function (game){

		var collisionLayer,
			matchPattern = /.*\/(.*)$/,

			getCachedImages = function(game){
				var cachedImages = game.cache._images,
					images = [];

				for (var i in cachedImages){
					if (cachedImages.hasOwnProperty(i)) {
						if (!cachedImages[i] || !cachedImages[i].url){
							continue;
						}
						images.push( [ cachedImages[i].url.match(matchPattern)[1], i ] );
					}
				}
				return images;
			},

			getTilesetImages = function(game, mapId){
				var tilemapData = game.cache.getTilemapData(mapId),
					images = [],
					tilesets;

				if (!tilemapData || !tilemapData.data || !tilemapData.data.tilesets){
					return images;
				}

				tilesets = tilemapData.data.tilesets;

				for (var i = tilesets.length - 1; i >= 0; i--) {
					images.push( [ tilesets[i].image.match(matchPattern)[1], tilesets[i].name ] );
				}
				return images;
			},

			addTilesetImages = function(game, map){
				var i, j,
					cachedImages = getCachedImages(game),
					tilesetImages = getTilesetImages(game, map.key);

				for (i = tilesetImages.length - 1; i >= 0; i--) {               
					for (j = cachedImages.length - 1; j >= 0; j--) {
						if (cachedImages[j][0] !== tilesetImages[i][0]){
							continue;
						}
						map.addTilesetImage(tilesetImages[i][1], cachedImages[j][1]);
					}
				}
			};

		return {
			
			load: function(mapName){
				var map;

				map = game.add.tilemap(mapName);
				addTilesetImages(game, map);			

				// the floor tiles
				map.setCollisionBetween(1, 1000);

				for (var i = map.layers.length - 1, layer; i >= 0; i--){
				    layer = map.createLayer(i);
				    layer.resizeWorld();
				    // Phaser limiation - just the first layer can be used as collidible layer
				    if (0 === i){
				        collisionLayer = layer;
				    }
				}

			},

			getCollisionLayer: function(){
				return collisionLayer;
			}
		};

	};

});