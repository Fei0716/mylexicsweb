﻿(function(window) {
l_instance_1 = function() {
	this.initialize();
}
l_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["l_animation.png"], frames: [[0,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[342,0,342,316,0,17.8,125.35],[684,0,342,316,0,17.8,125.35],[1026,0,342,316,0,17.8,125.35],[1368,0,342,316,0,17.8,125.35],[1710,0,342,316,0,17.8,125.35],[2052,0,342,316,0,17.8,125.35],[2394,0,342,316,0,17.8,125.35],[2736,0,342,316,0,17.8,125.35],[3078,0,342,316,0,17.8,125.35],[3420,0,342,316,0,17.8,125.35],[0,316,342,316,0,17.8,125.35],[342,316,342,316,0,17.8,125.35],[684,316,342,316,0,17.8,125.35],[1026,316,342,316,0,17.8,125.35],[1368,316,342,316,0,17.8,125.35],[1710,316,342,316,0,17.8,125.35],[2052,316,342,316,0,17.8,125.35],[2394,316,342,316,0,17.8,125.35],[2736,316,342,316,0,17.8,125.35],[3078,316,342,316,0,17.8,125.35],[3420,316,342,316,0,17.8,125.35],[0,632,342,316,0,17.8,125.35],[342,632,342,316,0,17.8,125.35],[684,632,342,316,0,17.8,125.35],[1026,632,342,316,0,17.8,125.35],[1368,632,342,316,0,17.8,125.35],[1710,632,342,316,0,17.8,125.35],[2052,632,342,316,0,17.8,125.35],[2394,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[2736,632,342,316,0,17.8,125.35],[3078,632,342,320,0,17.8,125.35],[3420,632,345,316,0,17.8,125.35],[0,952,348,319,0,17.8,128.35],[348,952,351,322,0,17.8,131.35],[699,952,354,326,0,17.8,135.35],[1053,952,358,329,0,17.8,138.35],[1411,952,361,332,0,17.8,141.35],[1772,952,364,336,0,17.8,145.35],[2136,952,367,339,0,17.8,148.35],[2503,952,370,342,0,17.8,151.35],[2873,952,373,346,0,17.8,155.35],[3246,952,376,349,0,17.8,158.35],[3622,952,379,352,0,17.8,161.35],[0,1304,382,356,0,17.8,165.35],[382,1304,385,359,0,17.8,168.35],[767,1304,388,363,0,17.8,172.35],[1155,1304,392,366,0,17.8,175.35],[1547,1304,395,369,0,17.8,178.35],[1942,1304,395,369,0,17.8,178.35],[2337,1304,395,369,0,17.8,178.35],[2732,1304,395,369,0,17.8,178.35],[3127,1304,395,369,0,17.8,178.35],[3522,1304,395,369,0,17.8,178.35],[0,1673,395,369,0,17.8,178.35],[395,1673,395,369,0,17.8,178.35],[790,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35],[1185,1673,395,369,0,17.8,178.35]]});
var l_instance_1_p = l_instance_1.prototype = new createjs.Sprite();
l_instance_1_p.Sprite_initialize = l_instance_1_p.initialize;
l_instance_1_p.initialize = function() {
	this.Sprite_initialize(l_instance_1._SpriteSheet);
	this.paused = false;
}
window.l_instance_1 = l_instance_1;
}(window));

