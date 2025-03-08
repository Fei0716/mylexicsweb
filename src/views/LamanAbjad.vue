<script setup>
import { onMounted,onUnmounted } from 'vue';
import router from '../router.js';
// States
let canvas;
let stage;
let queue;
let targetWidth = 1000;
let targetHeight = 675;
let playingSound = null;
// objects
let abjadBackgroundImg;
let abjadTitleImg;
let btnHome;
let btnKeluar;
let btnVokal;
let btnVokalBergambar;
let btnKonsonan;
let btnKonsonanBergambar;

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
    //   images
    {id: "abjad_background", src: "/images/abjad_background.png"},
    {id: "title_abjad", src: "/images/title_abjad.png"},
    {id: "btn_home_01", src: "/images/btn_home_01.png"},
    {id: "btn_home_02", src: "/images/btn_home_02.png"},
    {id: "btn_keluar_01", src: "/images/btn_keluar_01.png"},
    {id: "btn_keluar_02", src: "/images/btn_keluar_02.png"},
    {id: "btn_vokal_01", src: "/images/btn_vokal_01.png"},
    {id: "btn_vokal_02", src: "/images/btn_vokal_02.png"},
    {id: "btn_vokal_bergambar_01", src: "/images/btn_vokal_bergambar_01.png"},
    {id: "btn_vokal_bergambar_02", src: "/images/btn_vokal_bergambar_02.png"},
    {id: "btn_konsonan_01", src: "/images/btn_konsonan_01.png"},
    {id: "btn_konsonan_02", src: "/images/btn_konsonan_02.png"},
    {id: "btn_konsonan_bergambar_01", src: "/images/btn_konsonan_bergambar_01.png"},
    {id: "btn_konsonan_bergambar_02", src: "/images/btn_konsonan_bergambar_02.png"},
    //  sounds
    {id: "sound_vokal", src: "/sounds/kenali_vokal.mp3"},
    {id: "sound_vokal_bergambar", src: "/sounds/kenali_vokal_bergambar.mp3"},
    {id: "sound_konsonan", src: "/sounds/kenali_konsonan.mp3"},
    {id: "sound_konsonan_bergambar", src: "/sounds/kenali_konsonan_bergambar.mp3"},
    {id: "sound_laman_utama", src: "/sounds/laman_utama.mp3"},
    {id: "sound_keluar", src: "/sounds/keluar.mp3"},
    {id: "sound_submenu_abjad", src: "/sounds/submenu_abjad.mp3"},

  ]);
}

function handleComplete() {
  playingSound = createjs.Sound.play("sound_submenu_abjad");
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
  abjadBackgroundImg = new createjs.Bitmap(queue.getResult("abjad_background"));
  // Set registration point to center (better for positioning)
  abjadBackgroundImg.regX = abjadBackgroundImg.image.width / 2;
  abjadBackgroundImg.regY = abjadBackgroundImg.image.height / 2;
  // Position it centered horizontally and slightly above the bottom
  abjadBackgroundImg.x = canvas.width / 2;
  abjadBackgroundImg.y = canvas.height - (abjadBackgroundImg.image.height * 0.35) / 2 + 20 ; // Adjust this value if needed
  // Scale it properly
  abjadBackgroundImg.scaleX = abjadBackgroundImg.scaleY = 0.4;
  stage.addChild(abjadBackgroundImg); // Green background on top

  abjadTitleImg = new createjs.Bitmap(queue.getResult("title_abjad"));
  abjadTitleImg.regX = abjadTitleImg.image.width / 2;
  abjadTitleImg.x = canvas.width / 2;
  abjadTitleImg.y = 10;
  abjadTitleImg.scale = .35;
  stage.addChild(abjadTitleImg);

  let btnHomeSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_home_01"), // Normal state
      queue.getResult("btn_home_02")  // Hover / Click state
    ],
    frames: { width: 333, height: 363 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });
  // Create the Sprite
  btnHome = new createjs.Sprite(btnHomeSpriteSheet, "normal");
  btnHome.mouseEnabled = true;
  btnHome.mouseChildren = true;
  btnHome.cursor = "pointer";
  btnHome.y = 20;
  btnHome.x = 20;
  btnHome.scale = .4; // Apply scaling


  // Add event listeners for hover and click
  btnHome.on("mouseover", () => {
    btnHome.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_laman_utama");
    }
  });
  btnHome.on("mouseout", () => {
    btnHome.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnHome.on("click", () => {
    btnHome.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    //navigate to the abjad page
    router.push({name: 'LamanUtama'});
  });
  stage.addChild(btnHome);


  let btnKeluarSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_keluar_01"), // Normal state
      queue.getResult("btn_keluar_02")  // Hover / Click state
    ],
    frames: { width: 373, height: 451 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });

  // Create the Sprite
  btnKeluar = new createjs.Sprite(btnKeluarSpriteSheet, "normal");
  btnKeluar.mouseEnabled = true;
  btnKeluar.mouseChildren = true;
  btnKeluar.cursor = "pointer";
  btnKeluar.y = 20;
  btnKeluar.x = canvas.width - 120;
  btnKeluar.scale = .3; // Apply scaling

  // Add event listeners for hover and click
  btnKeluar.on("mouseover", () => {
    btnKeluar.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_keluar");
    }
  });
  btnKeluar.on("mouseout", () => {
    btnKeluar.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnKeluar.on("click", () => {
    btnKeluar.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    //navigate to the abjad page
    router.push({name: 'LamanUtama'});
  });
  stage.addChild(btnKeluar);

  let btnVokalSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_vokal_01"), // Normal state
      queue.getResult("btn_vokal_02")  // Hover / Click state
    ],
    frames: { width: 727, height: 780 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });
  // Create the Sprite
  btnVokal = new createjs.Sprite(btnVokalSpriteSheet, "normal");
  btnVokal.mouseEnabled = true;
  btnVokal.mouseChildren = true;
  btnVokal.cursor = "pointer";
  btnVokal.regY = abjadTitleImg.image.height / 2;
  btnVokal.y = canvas.height / 2 - 30;
  btnVokal.x = 100;
  btnVokal.scale = .3; // Apply scaling


  // Add event listeners for hover and click
  btnVokal.on("mouseover", () => {
    btnVokal.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_vokal");
    }
  });
  btnVokal.on("mouseout", () => {
    btnVokal.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnVokal.on("click", () => {
    btnVokal.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    //navigate to the abjad page
    router.push({name: 'AbjadVokal'});
  });
  stage.addChild(btnVokal);

  let btnVokalBergambarSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_vokal_bergambar_01"), // Normal state
      queue.getResult("btn_vokal_bergambar_02")  // Hover / Click state
    ],
    frames: { width: 756, height: 766 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });

  // Create the Sprite
  btnVokalBergambar = new createjs.Sprite(btnVokalBergambarSpriteSheet, "normal");
  btnVokalBergambar.mouseEnabled = true;
  btnVokalBergambar.mouseChildren = true;
  btnVokalBergambar.cursor = "pointer";
  btnVokalBergambar.y = canvas.height / 2 - 200;
  btnVokalBergambar.x = canvas.width / 2 - 120;
  btnVokalBergambar.scale = 0.3; // Apply scaling


  // Add event listeners for hover and click
  btnVokalBergambar.on("mouseover", () => {
    btnVokalBergambar.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_vokal_bergambar");
    }
  });
  btnVokalBergambar.on("mouseout", () => {
    btnVokalBergambar.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnVokalBergambar.on("click", () => {
    btnVokalBergambar.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    //navigate to the abjad page
    router.push({name: 'AbjadVokalBergambar'});
  });
  stage.addChild(btnVokalBergambar);


  let btnKonsonanSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_konsonan_01"), // Normal state
      queue.getResult("btn_konsonan_02")  // Hover / Click state
    ],
    frames: { width: 727, height: 766 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });

  // Create the Sprite
  btnKonsonan = new createjs.Sprite(btnKonsonanSpriteSheet, "normal");
  btnKonsonan.mouseEnabled = true;
  btnKonsonan.mouseChildren = true;
  btnKonsonan.cursor = "pointer";
  btnKonsonan.y = canvas.height / 2 + 50;
  btnKonsonan.x = canvas.width / 2 - 120;
  btnKonsonan.scale = 0.3; // Apply scaling


  // Add event listeners for hover and click
  btnKonsonan.on("mouseover", () => {
    btnKonsonan.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_konsonan");
    }
  });
  btnKonsonan.on("mouseout", () => {
    btnKonsonan.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnKonsonan.on("click", () => {
    btnKonsonan.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    //navigate to the abjad page
    router.push({name: 'AbjadKonsonan'});
  });
  stage.addChild(btnKonsonan);


  let btnKonsonanBergambarSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_konsonan_bergambar_01"), // Normal state
      queue.getResult("btn_konsonan_bergambar_02")  // Hover / Click state
    ],
    frames: { width: 839, height: 766 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });

  // Create the Sprite
  btnKonsonanBergambar = new createjs.Sprite(btnKonsonanBergambarSpriteSheet, "normal");
  btnKonsonanBergambar.mouseEnabled = true;
  btnKonsonanBergambar.mouseChildren = true;
  btnKonsonanBergambar.cursor = "pointer";
  btnKonsonanBergambar.y = canvas.height / 2 - 30;
  btnKonsonanBergambar.x = canvas.width / 2 + 150;
  btnKonsonanBergambar.scale = 0.3; // Apply scaling


  // Add event listeners for hover and click
  btnKonsonanBergambar.on("mouseover", () => {
    btnKonsonanBergambar.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_konsonan_bergambar");
    }
  });
  btnKonsonanBergambar.on("mouseout", () => {
    btnKonsonanBergambar.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnKonsonanBergambar.on("click", () => {
    btnKonsonanBergambar.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    //navigate to the abjad page
    router.push({name: 'AbjadKonsonanBergambar'});
  });
  stage.addChild(btnKonsonanBergambar);
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
