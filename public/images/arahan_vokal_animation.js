﻿(function(window) {
arahan1_instance_1 = function() {
	this.initialize();
}
arahan1_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["arahan_vokal_animation.png"], frames: [[0,0,557,337,0,26.150000000000006,133.9],[0,0,557,337,0,26.150000000000006,133.9],[557,0,543,337,0,26.150000000000006,133.9],[557,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[1100,0,543,337,0,26.150000000000006,133.9],[557,0,543,337,0,26.150000000000006,133.9],[557,0,543,337,0,26.150000000000006,133.9],[557,0,543,337,0,26.150000000000006,133.9],[557,0,543,337,0,26.150000000000006,133.9],[557,0,543,337,0,26.150000000000006,133.9],[557,0,543,337,0,26.150000000000006,133.9],[557,0,543,337,0,26.150000000000006,133.9],[557,0,543,337,0,26.150000000000006,133.9],[557,0,543,337,0,26.150000000000006,133.9],[557,0,543,337,0,26.150000000000006,133.9],[1643,0,528,337,0,26.150000000000006,133.9],[2171,0,513,337,0,26.150000000000006,133.9],[2684,0,501,337,0,26.150000000000006,133.9],[3185,0,501,337,0,26.150000000000006,133.9],[3686,0,501,337,0,26.150000000000006,133.9],[4187,0,501,337,0,26.150000000000006,133.9],[4688,0,501,337,0,26.150000000000006,133.9],[5189,0,501,337,0,26.150000000000006,133.9],[5690,0,501,337,0,26.150000000000006,133.9],[6191,0,501,337,0,26.150000000000006,133.9],[6692,0,501,337,0,26.150000000000006,133.9],[7193,0,501,337,0,26.150000000000006,133.9],[0,337,501,337,0,26.150000000000006,133.9],[501,337,501,337,0,26.150000000000006,133.9],[1002,337,501,337,0,26.150000000000006,133.9],[1503,337,501,337,0,26.150000000000006,133.9],[2004,337,501,337,0,26.150000000000006,133.9],[2004,337,501,337,0,26.150000000000006,133.9],[2004,337,501,337,0,26.150000000000006,133.9],[2004,337,501,337,0,26.150000000000006,133.9],[2505,337,501,337,0,26.150000000000006,133.9],[3006,337,501,337,0,26.150000000000006,133.9],[3507,337,501,337,0,26.150000000000006,133.9],[4008,337,501,337,0,26.150000000000006,133.9],[4509,337,501,337,0,26.150000000000006,133.9],[5010,337,501,337,0,26.150000000000006,133.9],[5511,337,501,337,0,26.150000000000006,133.9],[6012,337,501,337,0,26.150000000000006,133.9],[6513,337,501,337,0,26.150000000000006,133.9],[7014,337,501,337,0,26.150000000000006,133.9],[7515,337,501,337,0,26.150000000000006,133.9],[0,674,501,337,0,26.150000000000006,133.9],[501,674,501,337,0,26.150000000000006,133.9],[1002,674,501,337,0,26.150000000000006,133.9],[1503,674,501,337,0,26.150000000000006,133.9],[2004,674,501,337,0,26.150000000000006,133.9],[2505,674,501,337,0,26.150000000000006,133.9],[3006,674,501,337,0,26.150000000000006,133.9],[3507,674,501,337,0,26.150000000000006,133.9],[4008,674,501,337,0,26.150000000000006,133.9],[4509,674,501,337,0,26.150000000000006,133.9],[5010,674,501,337,0,26.150000000000006,133.9],[5511,674,501,337,0,26.150000000000006,133.9],[6012,674,501,337,0,26.150000000000006,133.9],[6513,674,501,340,0,26.150000000000006,133.9],[7014,674,501,348,0,26.150000000000006,133.9],[7515,674,501,355,0,26.150000000000006,133.9],[0,1029,501,361,0,26.150000000000006,133.9],[501,1029,501,366,0,26.150000000000006,133.9],[1002,1029,501,372,0,26.150000000000006,133.9],[1503,1029,501,376,0,26.150000000000006,133.9],[2004,1029,501,380,0,26.150000000000006,133.9],[2505,1029,501,381,0,26.150000000000006,133.9],[3006,1029,501,380,0,26.150000000000006,133.9],[3507,1029,501,383,0,26.150000000000006,133.9],[4008,1029,501,383,0,26.150000000000006,133.9],[4509,1029,501,383,0,26.150000000000006,133.9],[5010,1029,501,383,0,26.150000000000006,133.9],[5511,1029,501,383,0,26.150000000000006,133.9],[6012,1029,501,381,0,26.150000000000006,133.9],[6513,1029,501,376,0,26.150000000000006,133.9],[7014,1029,501,371,0,26.150000000000006,133.9],[7515,1029,501,364,0,26.150000000000006,133.9],[0,1412,501,357,0,26.150000000000006,133.9],[501,1412,501,352,0,26.150000000000006,133.9],[1002,1412,501,346,0,26.150000000000006,133.9],[1002,1412,501,346,0,26.150000000000006,133.9],[1503,1412,501,337,0,26.150000000000006,133.9],[2004,1412,501,337,0,26.150000000000006,133.9],[2505,1412,501,337,0,26.150000000000006,133.9],[3006,1412,501,337,0,26.150000000000006,133.9],[3507,1412,501,337,0,26.150000000000006,133.9],[4008,1412,501,337,0,26.150000000000006,133.9],[4509,1412,501,337,0,26.150000000000006,133.9],[5010,1412,501,337,0,26.150000000000006,133.9],[5511,1412,501,337,0,26.150000000000006,133.9],[6012,1412,501,347,0,26.150000000000006,133.9],[6513,1412,501,357,0,26.150000000000006,133.9],[7014,1412,501,366,0,26.150000000000006,133.9],[7515,1412,501,376,0,26.150000000000006,133.9],[0,1788,501,386,0,26.150000000000006,133.9],[501,1788,501,386,0,26.150000000000006,133.9],[1002,1788,501,386,0,26.150000000000006,133.9],[1503,1788,501,386,0,26.150000000000006,133.9],[2004,1788,501,386,0,26.150000000000006,133.9],[2505,1788,501,386,0,26.150000000000006,133.9],[3006,1788,501,386,0,26.150000000000006,133.9],[3507,1788,502,337,0,27.150000000000006,133.9],[4009,1788,501,357,0,26.150000000000006,153.9],[4510,1788,501,377,0,26.150000000000006,173.9],[5011,1788,501,397,0,26.150000000000006,193.9],[5512,1788,501,397,0,26.150000000000006,193.9],[6013,1788,549,397,0,74.15,193.9],[6562,1788,549,397,0,74.15,193.9],[7111,1788,549,397,0,74.15,193.9],[0,2185,549,397,0,74.15,193.9],[549,2185,549,397,0,74.15,193.9],[1098,2185,549,397,0,74.15,193.9],[1647,2185,549,397,0,74.15,193.9],[2196,2185,549,397,0,74.15,193.9],[2745,2185,549,397,0,74.15,193.9],[2745,2185,549,397,0,74.15,193.9],[2745,2185,549,397,0,74.15,193.9],[2745,2185,549,397,0,74.15,193.9],[2745,2185,549,397,0,74.15,193.9],[2745,2185,549,397,0,74.15,193.9],[3294,2185,549,397,0,74.15,193.9],[3843,2185,549,397,0,74.15,193.9],[4392,2185,549,397,0,74.15,193.9],[4941,2185,549,397,0,74.15,193.9],[5490,2185,549,397,0,74.15,193.9],[6039,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[6588,2185,549,397,0,74.15,193.9],[7137,2185,66,60,0,-408.85,78.9],[7137,2185,66,60,0,-408.85,78.9],[7137,2185,66,60,0,-408.85,78.9],[7137,2185,66,60,0,-408.85,78.9],[7137,2185,66,60,0,-408.85,78.9],[7137,2185,66,60,0,-408.85,78.9],[7137,2185,66,60,0,-408.85,78.9],[7137,2185,66,60,0,-408.85,78.9],[7137,2185,66,60,0,-408.85,78.9],[7137,2185,66,60,0,-408.85,78.9],[7137,2185,66,60,0,-408.85,78.9],[7137,2185,66,60,0,-408.85,78.9]]});
var arahan1_instance_1_p = arahan1_instance_1.prototype = new createjs.Sprite();
arahan1_instance_1_p.Sprite_initialize = arahan1_instance_1_p.initialize;
arahan1_instance_1_p.initialize = function() {
	this.Sprite_initialize(arahan1_instance_1._SpriteSheet);
	this.paused = false;
}
window.arahan1_instance_1 = arahan1_instance_1;
}(window));

