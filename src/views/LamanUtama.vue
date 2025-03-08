<script setup>
import { onMounted, onUnmounted } from 'vue';
import router from '../router.js';
// States
let canvas;
let stage;
let queue;
let targetWidth = 1000;
let targetHeight = 675;
let playingSound = null;
// objects
let greenBackgroundImg;
let skyImg;
let bannerImg;
let rainbowImg;
let tallGrassImg;
let mushroomBigImg;
let mushroomSmallImg;
let sunImg;
let btnAbjad;
function init() {
  //get DPI
  canvas = document.getElementById("canvas");
  canvas.width = targetWidth ;
  canvas.height = targetHeight;

  stage = new createjs.Stage(canvas);
  stage.snapToPixelEnabled = true;
  stage.enableMouseOver(1000);//to enable mouseover

  queue = new createjs.LoadQueue();
  queue.installPlugin(createjs.Sound);
  queue.on("complete", handleComplete);
  queue.loadManifest([
      {id: "banner", src: "/images/banner.png"},
      {id: "green_background", src: "/images/green_background.png"},
      {id: "rainbow", src: "/images/rainbow.png"},
      {id: "tall_grass", src: "/images/tall_grass.png"},
      {id: "mushroom", src: "/images/mushroom.png"},
      {id: "sun", src: "/images/sun.png"},
      {id: "btn_abjad_01", src: "/images/btn_abjad_01.png"},
      {id: "btn_abjad_02", src: "/images/btn_abjad_02.png"},
      {id: "sound_abjad", src: "/sounds/sound_abjad.mp3"},


  ]);
}

function handleComplete() {
  loadScene();
  createjs.Ticker.addEventListener("tick", handleTick);


}

function handleTick() {
  /*
  * update similar to requestAnimationFrame
  * */
  stage.update();
}
function loadScene(){
  /*
  * load up the images
  * */
  // Create the sky shape with a radial gradient
  skyImg = new createjs.Shape();
  skyImg.graphics.beginRadialGradientFill(
      ["#ffffff", "#50c9ff"], // White center → Blue outer
      [0, 1], // Start at white (0) and end at blue (1)
      0, 0, 5, // Inner circle: center (0,0), radius 50
      0, 0, canvas.width // Outer circle: center (0,0), radius = canvas width
  );
  skyImg.graphics.drawRect(0, 0, canvas.width, canvas.height);
  skyImg.graphics.endFill();
  stage.addChild(skyImg); // Sky first (background)

  rainbowImg = new createjs.Bitmap(queue.getResult("rainbow"));
  rainbowImg.x = 0;
  rainbowImg.y = canvas.height / 2 - 210;
  rainbowImg.scale = .4;
  stage.addChild(rainbowImg);

  greenBackgroundImg = new createjs.Bitmap(queue.getResult("green_background"));
  // Set registration point to center (better for positioning)
  greenBackgroundImg.regX = greenBackgroundImg.image.width / 2;
  greenBackgroundImg.regY = greenBackgroundImg.image.height / 2;
  // Position it centered horizontally and slightly above the bottom
  greenBackgroundImg.x = canvas.width / 2;
  greenBackgroundImg.y = canvas.height - (greenBackgroundImg.image.height * 0.35) / 2 + 20 ; // Adjust this value if needed
  // Scale it properly
  greenBackgroundImg.scaleX = greenBackgroundImg.scaleY = 0.4;
  stage.addChild(greenBackgroundImg); // Green background on top

  bannerImg = new createjs.Bitmap(queue.getResult("banner"));
  bannerImg.regX = bannerImg.image.width / 2;
  bannerImg.regY = bannerImg.image.height / 2;
  bannerImg.x = canvas.width / 2;
  bannerImg.y = canvas.height / 2 - 200;
  bannerImg.scale = .4;
  stage.addChild(bannerImg);

  tallGrassImg = new createjs.Bitmap(queue.getResult("tall_grass"));
  tallGrassImg.x = 0;
  tallGrassImg.y = canvas.height / 2 - 100;
  tallGrassImg.scale = 0.4;
  stage.addChild(tallGrassImg);

  sunImg = new createjs.Bitmap(queue.getResult("sun"));
  sunImg.x = 100;
  sunImg.y = 10;
  sunImg.scale = 0.4;
  stage.addChild(sunImg);

  mushroomBigImg = new createjs.Bitmap(queue.getResult("mushroom"));
  mushroomBigImg.x = canvas.width - 260;
  mushroomBigImg.y = canvas.height / 2 - 230;
  mushroomBigImg.scale = 0.4;
  stage.addChild(mushroomBigImg);

  mushroomSmallImg = new createjs.Bitmap(queue.getResult("mushroom"));
  mushroomSmallImg.x = canvas.width - 70;
  mushroomSmallImg.y = canvas.height / 2 + 50;
  mushroomSmallImg.scale = 0.12;
  stage.addChild(mushroomSmallImg);

  // Define a SpriteSheet with two frames (normal & hover)
  let buttonSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_abjad_01"), // Normal state
      queue.getResult("btn_abjad_02")  // Hover / Click state
    ],
    frames: { width: 579, height: 654 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });

// Create the Sprite
  btnAbjad = new createjs.Sprite(buttonSpriteSheet, "normal");
  btnAbjad.mouseEnabled = true;
  btnAbjad.mouseChildren = true;
  btnAbjad.cursor = "pointer";
  btnAbjad.y = 400;
  btnAbjad.x = 20;
  btnAbjad.scale = 0.4; // Apply scaling

  // Ensure stage updates
  stage.update();

  // Add event listeners for hover and click
  btnAbjad.on("mouseover", () => {
    btnAbjad.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_abjad");
    }
  });
  btnAbjad.on("mouseout", () => {
    btnAbjad.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnAbjad.on("click", () => {
    btnAbjad.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    //navigate to the abjad page
    router.push({name: 'LamanAbjad'});
  });
  stage.addChild(btnAbjad);

}
function cleanupCreateJS() {
  if (queue) {
    queue.removeAllEventListeners(); // Remove all event listeners
    queue.removeAll(); // Clear all loaded assets
    queue = null;
  }

  if (stage) {
    createjs.Ticker.removeEventListener("tick", handleTick); // Stop ticker updates
    stage.removeAllChildren(); // Remove all stage objects
    stage.clear(); // Force clear rendering
    stage = null;
  }

  if (playingSound) {
    playingSound.stop();
    playingSound = null;
  }

  // Manually destroy all CreateJS objects
  createjs.Sound.removeAllSounds();
  createjs.Sound.stop();
}


// Lifecycle Hook
onMounted(() => {
  init();
});
onUnmounted(() => {
  cleanupCreateJS(); // Clean up before leaving the page
});
</script>

<template>
  <div id="container">
    <canvas id="canvas"></canvas>
  </div>
</template>

<style scoped>


</style>
