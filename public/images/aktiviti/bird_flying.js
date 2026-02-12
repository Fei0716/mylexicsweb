(function(window) {
burung_terbang = function() {
	this.initialize();
}
burung_terbang._SpriteSheet = new createjs.SpriteSheet({images: ["bird_flying.png"], frames: [[0,0,67,54,0,1,-2.1],[69,0,67,54,0,1,-2.1],[138,0,67,54,0,1,-2.1],[207,0,67,54,0,1,-2.1],[276,0,67,54,0,1,-2.1],[345,0,67,54,0,1,-2.1],[414,0,67,54,0,1,-2.1],[0,56,67,54,0,1,-2.1],[69,56,67,53,0,1,-3.1],[138,56,67,53,0,1,-3.1],[207,56,67,52,0,1,-4.1],[276,56,67,52,0,1,-4.1],[345,56,67,51,0,1,-5.1],[345,56,67,51,0,1,-5.1],[345,56,67,51,0,1,-5.1],[345,56,67,51,0,1,-5.1],[414,56,67,52,0,1,-4.1],[0,112,67,53,0,1,-3.1],[69,112,67,54,0,1,-2.1],[138,112,67,54,0,1,-2.1],[207,112,67,54,0,1,-2.1],[276,112,67,54,0,1,-2.1],[345,112,67,54,0,1,-2.1],[0,0,67,54,0,1,-2.1],[0,0,67,54,0,1,-2.1],[0,0,67,54,0,1,-2.1]]});
var burung_terbang_p = burung_terbang.prototype = new createjs.Sprite();
burung_terbang_p.Sprite_initialize = burung_terbang_p.initialize;
burung_terbang_p.initialize = function() {
	this.Sprite_initialize(burung_terbang._SpriteSheet);
	this.paused = false;
}
window.burung_terbang = burung_terbang;
}(window));

