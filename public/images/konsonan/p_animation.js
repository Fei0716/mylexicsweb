﻿(function(window) {
p_instance_1 = function() {
	this.initialize();
}
p_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["p_animation.png"], frames: [[0,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[342,0,342,316,0,32.2,-3.8999999999999986],[684,0,342,316,0,32.2,-3.8999999999999986],[1026,0,342,316,0,32.2,-3.8999999999999986],[1368,0,342,316,0,32.2,-3.8999999999999986],[1710,0,342,316,0,32.2,-3.8999999999999986],[2052,0,342,316,0,32.2,-3.8999999999999986],[2394,0,342,316,0,32.2,-3.8999999999999986],[2736,0,342,316,0,32.2,-3.8999999999999986],[3078,0,342,316,0,32.2,-3.8999999999999986],[3420,0,342,316,0,32.2,-3.8999999999999986],[0,316,342,316,0,32.2,-3.8999999999999986],[342,316,342,316,0,32.2,-3.8999999999999986],[684,316,342,316,0,32.2,-3.8999999999999986],[1026,316,342,316,0,32.2,-3.8999999999999986],[1368,316,342,316,0,32.2,-3.8999999999999986],[1710,316,342,316,0,32.2,-3.8999999999999986],[2052,316,342,316,0,32.2,-3.8999999999999986],[2394,316,342,316,0,32.2,-3.8999999999999986],[2736,316,342,316,0,32.2,-3.8999999999999986],[3078,316,342,316,0,32.2,-3.8999999999999986],[3420,316,342,316,0,32.2,-3.8999999999999986],[0,632,342,316,0,32.2,-3.8999999999999986],[342,632,342,316,0,32.2,-3.8999999999999986],[684,632,342,316,0,32.2,-3.8999999999999986],[1026,632,342,316,0,32.2,-3.8999999999999986],[1368,632,342,316,0,32.2,-3.8999999999999986],[1710,632,342,316,0,32.2,-3.8999999999999986],[2052,632,342,316,0,32.2,-3.8999999999999986],[2394,632,342,316,0,32.2,-3.8999999999999986],[2736,632,342,316,0,32.2,-3.8999999999999986],[3078,632,342,316,0,32.2,-3.8999999999999986],[3420,632,342,316,0,32.2,-3.8999999999999986],[0,948,342,316,0,32.2,-3.8999999999999986],[342,948,342,316,0,32.2,-3.8999999999999986],[684,948,342,316,0,32.2,-3.8999999999999986],[1026,948,342,316,0,32.2,-3.8999999999999986],[1368,948,342,316,0,32.2,-3.8999999999999986],[1710,948,342,316,0,32.2,-3.8999999999999986],[2052,948,342,316,0,32.2,-3.8999999999999986],[2394,948,342,316,0,32.2,-3.8999999999999986],[2736,948,342,316,0,32.2,-3.8999999999999986],[3078,948,342,316,0,32.2,-3.8999999999999986],[3420,948,342,316,0,32.2,-3.8999999999999986],[0,1264,342,316,0,32.2,-3.8999999999999986],[342,1264,342,316,0,32.2,-3.8999999999999986],[684,1264,342,316,0,32.2,-3.8999999999999986],[1026,1264,342,316,0,32.2,-3.8999999999999986],[1368,1264,342,316,0,32.2,-3.8999999999999986],[1710,1264,342,316,0,32.2,-3.8999999999999986],[2052,1264,342,316,0,32.2,-3.8999999999999986],[2394,1264,342,316,0,32.2,-3.8999999999999986],[2736,1264,342,316,0,32.2,-3.8999999999999986],[3078,1264,342,316,0,32.2,-3.8999999999999986],[3420,1264,342,316,0,32.2,-3.8999999999999986],[0,1580,342,316,0,32.2,-3.8999999999999986],[342,1580,342,316,0,32.2,-3.8999999999999986],[684,1580,342,316,0,32.2,-3.8999999999999986],[1026,1580,342,316,0,32.2,-3.8999999999999986],[1368,1580,342,316,0,32.2,-3.8999999999999986],[1710,1580,342,316,0,32.2,-3.8999999999999986],[2052,1580,342,316,0,32.2,-3.8999999999999986],[2394,1580,342,316,0,32.2,-3.8999999999999986],[2736,1580,342,316,0,32.2,-3.8999999999999986],[3078,1580,342,316,0,32.2,-3.8999999999999986],[3420,1580,342,316,0,32.2,-3.8999999999999986],[0,1896,342,316,0,32.2,-3.8999999999999986],[342,1896,342,316,0,32.2,-3.8999999999999986],[684,1896,342,316,0,32.2,-3.8999999999999986],[1026,1896,342,316,0,32.2,-3.8999999999999986],[1368,1896,342,316,0,32.2,-3.8999999999999986],[1710,1896,342,316,0,32.2,-3.8999999999999986],[2052,1896,342,316,0,32.2,-3.8999999999999986],[2394,1896,342,316,0,32.2,-3.8999999999999986],[2736,1896,342,316,0,32.2,-3.8999999999999986],[3078,1896,342,316,0,32.2,-3.8999999999999986],[3420,1896,342,316,0,32.2,-3.8999999999999986],[0,2212,342,316,0,32.2,-3.8999999999999986],[342,2212,342,316,0,32.2,-3.8999999999999986],[684,2212,342,316,0,32.2,-3.8999999999999986],[1026,2212,342,316,0,32.2,-3.8999999999999986],[1368,2212,342,316,0,32.2,-3.8999999999999986],[1710,2212,342,316,0,32.2,-3.8999999999999986],[2052,2212,342,316,0,32.2,-3.8999999999999986],[2394,2212,342,316,0,32.2,-3.8999999999999986],[2736,2212,342,316,0,32.2,-3.8999999999999986],[3078,2212,342,316,0,32.2,-3.8999999999999986],[3420,2212,342,316,0,32.2,-3.8999999999999986],[0,2528,342,316,0,32.2,-3.8999999999999986],[342,2528,342,316,0,32.2,-3.8999999999999986],[684,2528,342,316,0,32.2,-3.8999999999999986],[1026,2528,342,316,0,32.2,-3.8999999999999986],[1368,2528,342,316,0,32.2,-3.8999999999999986],[1710,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2052,2528,342,316,0,32.2,-3.8999999999999986],[2394,2528,342,316,0,32.2,-3.8999999999999986],[2736,2528,346,319,0,32.2,-0.8999999999999986],[3082,2528,349,322,0,32.2,2.1000000000000014],[3431,2528,352,325,0,32.2,5.100000000000001],[0,2853,356,328,0,32.2,8.100000000000001],[356,2853,359,331,0,32.2,11.100000000000001],[715,2853,362,333,0,32.2,13.100000000000001],[1077,2853,365,336,0,32.2,16.1],[1442,2853,369,339,0,32.2,19.1],[1811,2853,372,342,0,32.2,22.1],[2183,2853,375,345,0,32.2,25.1],[2558,2853,378,348,0,32.2,28.1],[2936,2853,382,351,0,32.2,31.1],[3318,2853,385,353,0,32.2,33.1],[3703,2853,388,356,0,32.2,36.1],[0,3209,391,359,0,32.2,39.1],[391,3209,395,362,0,32.2,42.1],[786,3209,398,365,0,32.2,45.1],[1184,3209,398,365,0,32.2,45.1],[1582,3209,398,365,0,32.2,45.1],[1980,3209,398,365,0,32.2,45.1],[2378,3209,398,365,0,32.2,45.1],[2776,3209,398,365,0,32.2,45.1],[3174,3209,398,365,0,32.2,45.1],[3572,3209,398,365,0,32.2,45.1],[0,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1],[398,3574,398,365,0,32.2,45.1]]});
var p_instance_1_p = p_instance_1.prototype = new createjs.Sprite();
p_instance_1_p.Sprite_initialize = p_instance_1_p.initialize;
p_instance_1_p.initialize = function() {
	this.Sprite_initialize(p_instance_1._SpriteSheet);
	this.paused = false;
}
window.p_instance_1 = p_instance_1;
}(window));

