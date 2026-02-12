(function(window) {
claphand.gif = function() {
	this.initialize();
}
claphand.gif._SpriteSheet = new createjs.SpriteSheet({images: ["hands_clapping.png"], frames: [[0,0,105,101,0,0,0],[107,0,105,101,0,0,0],[0,103,105,101,0,0,0],[107,103,105,101,0,0,0]]});
var claphand.gif_p = claphand.gif.prototype = new createjs.Sprite();
claphand.gif_p.Sprite_initialize = claphand.gif_p.initialize;
claphand.gif_p.initialize = function() {
	this.Sprite_initialize(claphand.gif._SpriteSheet);
	this.paused = false;
}
window.claphand.gif = claphand.gif;
}(window));

