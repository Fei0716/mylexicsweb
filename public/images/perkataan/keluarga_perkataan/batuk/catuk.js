(function(window) {
catuk_instance_1 = function() {
	this.initialize();
}
catuk_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["catuk.png"], frames: [[0,0,231,133,0,80.55,48.8],[231,0,231,135,0,80.55,50.8],[462,0,231,135,0,80.55,50.8],[693,0,231,133,0,80.55,48.8],[0,135,231,130,0,80.55,45.8],[231,135,231,130,0,80.55,45.8],[462,135,231,133,0,80.55,48.8],[693,135,231,135,0,80.55,50.8],[0,270,231,135,0,80.55,50.8],[231,270,231,133,0,80.55,48.8]]});
var catuk_instance_1_p = catuk_instance_1.prototype = new createjs.Sprite();
catuk_instance_1_p.Sprite_initialize = catuk_instance_1_p.initialize;
catuk_instance_1_p.initialize = function() {
	this.Sprite_initialize(catuk_instance_1._SpriteSheet);
	this.paused = false;
}
window.catuk_instance_1 = catuk_instance_1;
}(window));

