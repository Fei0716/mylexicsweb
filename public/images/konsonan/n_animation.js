﻿(function(window) {
n_instance_1 = function() {
	this.initialize();
}
n_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["n_animation.png"], frames: [[0,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[342,0,342,316,0,55.25,125.15],[684,0,342,316,0,55.25,125.15],[1026,0,342,316,0,55.25,125.15],[1368,0,342,316,0,55.25,125.15],[1710,0,342,316,0,55.25,125.15],[2052,0,342,316,0,55.25,125.15],[2394,0,342,316,0,55.25,125.15],[2736,0,342,316,0,55.25,125.15],[3078,0,342,316,0,55.25,125.15],[3420,0,342,316,0,55.25,125.15],[0,316,342,316,0,55.25,125.15],[342,316,342,316,0,55.25,125.15],[684,316,342,316,0,55.25,125.15],[1026,316,342,316,0,55.25,125.15],[1368,316,342,316,0,55.25,125.15],[1710,316,342,316,0,55.25,125.15],[2052,316,342,316,0,55.25,125.15],[2394,316,342,316,0,55.25,125.15],[2736,316,342,316,0,55.25,125.15],[3078,316,342,316,0,55.25,125.15],[3420,316,342,316,0,55.25,125.15],[0,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[342,632,342,316,0,55.25,125.15],[684,632,342,316,0,55.25,125.15],[1026,632,342,316,0,55.25,125.15],[1368,632,342,316,0,55.25,125.15],[1710,632,342,316,0,55.25,125.15],[2052,632,342,316,0,55.25,125.15],[2394,632,342,316,0,55.25,125.15],[2736,632,342,316,0,55.25,125.15],[3078,632,342,316,0,55.25,125.15],[3420,632,342,316,0,55.25,125.15],[0,948,342,316,0,55.25,125.15],[342,948,342,316,0,55.25,125.15],[684,948,342,316,0,55.25,125.15],[1026,948,342,316,0,55.25,125.15],[1368,948,342,316,0,55.25,125.15],[1710,948,342,316,0,55.25,125.15],[2052,948,342,316,0,55.25,125.15],[2394,948,342,316,0,55.25,125.15],[2736,948,342,316,0,55.25,125.15],[3078,948,342,316,0,55.25,125.15],[3420,948,342,316,0,55.25,125.15],[0,1264,342,316,0,55.25,125.15],[342,1264,342,316,0,55.25,125.15],[684,1264,342,316,0,55.25,125.15],[1026,1264,342,316,0,55.25,125.15],[1368,1264,342,316,0,55.25,125.15],[1710,1264,342,316,0,55.25,125.15],[2052,1264,342,316,0,55.25,125.15],[2394,1264,342,316,0,55.25,125.15],[2736,1264,342,316,0,55.25,125.15],[3078,1264,342,316,0,55.25,125.15],[3420,1264,342,316,0,55.25,125.15],[0,1580,342,316,0,55.25,125.15],[342,1580,342,316,0,55.25,125.15],[684,1580,342,316,0,55.25,125.15],[1026,1580,342,316,0,55.25,125.15],[1368,1580,342,316,0,55.25,125.15],[1710,1580,342,316,0,55.25,125.15],[2052,1580,342,316,0,55.25,125.15],[2052,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2394,1580,342,316,0,55.25,125.15],[2736,1580,342,317,0,55.25,125.15],[3078,1580,345,318,0,55.25,127.15],[3423,1580,348,321,0,55.25,130.15],[0,1901,352,324,0,55.25,133.15],[352,1901,355,327,0,55.25,136.15],[707,1901,358,330,0,55.25,139.15],[1065,1901,362,333,0,55.25,142.15],[1427,1901,365,336,0,55.25,145.15],[1792,1901,368,339,0,55.25,148.15],[2160,1901,372,342,0,55.25,151.15],[2532,1901,375,344,0,55.25,153.15],[2907,1901,378,347,0,55.25,156.15],[3285,1901,382,350,0,55.25,159.15],[3667,1901,385,353,0,55.25,162.15],[0,2254,388,356,0,55.25,165.15],[388,2254,392,359,0,55.25,168.15],[780,2254,395,362,0,55.25,171.15],[1175,2254,398,365,0,55.25,174.15],[1573,2254,398,365,0,55.25,174.15],[1971,2254,398,365,0,55.25,174.15],[2369,2254,398,365,0,55.25,174.15],[2767,2254,398,365,0,55.25,174.15],[3165,2254,398,365,0,55.25,174.15],[3563,2254,398,365,0,55.25,174.15],[0,2619,398,365,0,55.25,174.15],[398,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15],[796,2619,398,365,0,55.25,174.15]]});
var n_instance_1_p = n_instance_1.prototype = new createjs.Sprite();
n_instance_1_p.Sprite_initialize = n_instance_1_p.initialize;
n_instance_1_p.initialize = function() {
	this.Sprite_initialize(n_instance_1._SpriteSheet);
	this.paused = false;
}
window.n_instance_1 = n_instance_1;
}(window));

