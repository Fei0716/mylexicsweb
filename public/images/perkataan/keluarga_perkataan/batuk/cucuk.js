(function(window) {
cucuk_instance_1 = function() {
	this.initialize();
}
cucuk_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["cucuk.png"], frames: [[0,0,180,174,0,62.3,74.7],[180,0,176,174,0,58.3,74.7],[356,0,172,174,0,54.3,74.7],[528,0,168,174,0,50.3,74.7],[696,0,164,174,0,46.3,74.7],[860,0,160,174,0,42.3,74.7],[0,174,155,174,0,37.3,74.7],[155,174,151,174,0,33.3,74.7],[155,174,151,174,0,33.3,74.7],[155,174,151,174,0,33.3,74.7],[155,174,151,174,0,33.3,74.7],[306,174,179,186,0,33.3,86.7],[306,174,179,186,0,33.3,86.7],[485,174,187,193,0,41.3,90.7],[485,174,187,193,0,41.3,90.7],[672,174,180,114,0,48.3,8.700000000000003],[0,367,194,114,0,62.3,8.700000000000003]]});
var cucuk_instance_1_p = cucuk_instance_1.prototype = new createjs.Sprite();
cucuk_instance_1_p.Sprite_initialize = cucuk_instance_1_p.initialize;
cucuk_instance_1_p.initialize = function() {
	this.Sprite_initialize(cucuk_instance_1._SpriteSheet);
	this.paused = false;
}
window.cucuk_instance_1 = cucuk_instance_1;
}(window));

