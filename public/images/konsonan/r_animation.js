﻿(function(window) {
r_instance_1 = function() {
	this.initialize();
}
r_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["r_animation.png"], frames: [[0,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[342,0,342,316,0,56.25,119.94999999999999],[684,0,342,316,0,56.25,119.94999999999999],[1026,0,342,316,0,56.25,119.94999999999999],[1368,0,342,316,0,56.25,119.94999999999999],[1710,0,342,316,0,56.25,119.94999999999999],[2052,0,342,316,0,56.25,119.94999999999999],[2394,0,342,316,0,56.25,119.94999999999999],[2736,0,342,316,0,56.25,119.94999999999999],[3078,0,342,316,0,56.25,119.94999999999999],[3420,0,342,316,0,56.25,119.94999999999999],[0,316,342,316,0,56.25,119.94999999999999],[342,316,342,316,0,56.25,119.94999999999999],[684,316,342,316,0,56.25,119.94999999999999],[1026,316,342,316,0,56.25,119.94999999999999],[1368,316,342,316,0,56.25,119.94999999999999],[1710,316,342,316,0,56.25,119.94999999999999],[2052,316,342,316,0,56.25,119.94999999999999],[2394,316,342,316,0,56.25,119.94999999999999],[2736,316,342,316,0,56.25,119.94999999999999],[3078,316,342,316,0,56.25,119.94999999999999],[3420,316,342,316,0,56.25,119.94999999999999],[0,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[342,632,342,316,0,56.25,119.94999999999999],[684,632,342,316,0,56.25,119.94999999999999],[1026,632,342,316,0,56.25,119.94999999999999],[1368,632,342,316,0,56.25,119.94999999999999],[1710,632,342,316,0,56.25,119.94999999999999],[2052,632,342,316,0,56.25,119.94999999999999],[2394,632,342,316,0,56.25,119.94999999999999],[2736,632,342,316,0,56.25,119.94999999999999],[3078,632,342,316,0,56.25,119.94999999999999],[3420,632,342,316,0,56.25,119.94999999999999],[0,948,342,316,0,56.25,119.94999999999999],[342,948,342,316,0,56.25,119.94999999999999],[684,948,342,316,0,56.25,119.94999999999999],[1026,948,342,316,0,56.25,119.94999999999999],[1368,948,342,316,0,56.25,119.94999999999999],[1710,948,342,316,0,56.25,119.94999999999999],[2052,948,342,316,0,56.25,119.94999999999999],[2394,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[2736,948,342,316,0,56.25,119.94999999999999],[3078,948,343,316,0,56.25,119.94999999999999],[3421,948,346,319,0,56.25,122.94999999999999],[0,1267,349,322,0,56.25,125.94999999999999],[349,1267,353,325,0,56.25,128.95],[702,1267,356,328,0,56.25,131.95],[1058,1267,359,331,0,56.25,134.95],[1417,1267,363,333,0,56.25,136.95],[1780,1267,366,336,0,56.25,139.95],[2146,1267,369,339,0,56.25,142.95],[2515,1267,373,342,0,56.25,145.95],[2888,1267,376,345,0,56.25,148.95],[3264,1267,379,348,0,56.25,151.95],[3643,1267,383,351,0,56.25,154.95],[0,1618,386,354,0,56.25,157.95],[386,1618,389,357,0,56.25,160.95],[775,1618,393,360,0,56.25,163.95],[1168,1618,396,363,0,56.25,166.95],[1564,1618,399,366,0,56.25,169.95],[1963,1618,399,366,0,56.25,169.95],[2362,1618,399,366,0,56.25,169.95],[2761,1618,399,366,0,56.25,169.95],[3160,1618,399,366,0,56.25,169.95],[3559,1618,399,366,0,56.25,169.95],[0,1984,399,366,0,56.25,169.95],[399,1984,399,366,0,56.25,169.95],[798,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95],[1197,1984,399,366,0,56.25,169.95]]});
var r_instance_1_p = r_instance_1.prototype = new createjs.Sprite();
r_instance_1_p.Sprite_initialize = r_instance_1_p.initialize;
r_instance_1_p.initialize = function() {
	this.Sprite_initialize(r_instance_1._SpriteSheet);
	this.paused = false;
}
window.r_instance_1 = r_instance_1;
}(window));

