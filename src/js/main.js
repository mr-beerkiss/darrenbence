// using the 'load' event to get around the p2.js issue with Phraser 2.3
// http://www.html5gamedevs.com/topic/4163-getting-p2-is-not-defined/

// Since phaser.min.js is loaded via script tag instead of RequireJS
// it's necessary to kick it off only after Phaser loads
window.addEventListener('load', function(){
    'use strict';

    var ns = window['darrenbence'] || (window['darrenbence'] = {});

    require([
        'boot',
        'preloader',
        'menu',
        'game'
    ], function(Boot, Preloader, Menu, Game){

        var game;

        game = new Phaser.Game(640, 480, Phaser.AUTO, 'darrenbence-game');
        game.state.add('boot', Boot);
        game.state.add('preloader', Preloader);
        game.state.add('menu', Menu);
        game.state.add('game', Game);

        game.state.start('boot');           

    });
});