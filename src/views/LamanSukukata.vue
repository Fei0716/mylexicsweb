<script setup>
import {ref, onMounted, onUnmounted, computed} from 'vue';
import router from '../router.js';
import Loader from "../components/Loader.vue";
// States
let canvas;
let stage;
let queue;
const dpr = window.devicePixelRatio || 1;
let playingSound = null;
// objects
let backgroundImg;
let titleImg;
let btnHome;
let btnKeluar;
let btnKv;
let btnKvk;
let isLoading = ref(true);
let isMobile = computed(()=>{
  return  window.innerWidth < 1000 && window.innerWidth < window.innerHeight;
});
let targetWidth = isMobile.value ? 675: 1000;
let targetHeight = isMobile.value ? 800 : 675;
function init() {
  //get DPI
  canvas = document.getElementById("canvas");
  canvas.width = targetWidth ;
  canvas.height = targetHeight;

  stage = new createjs.Stage(canvas);
  stage.snapToPixelEnabled = true;
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage);
    stage.enableMouseOver(0); // Disable mouseover for touch devices
  } else {
    stage.enableMouseOver(1000); // Keep it for desktop
  }
  stage.canvas.width = Math.round(dpr * targetWidth);
  stage.canvas.height  = Math.round(dpr * targetHeight);
  // Set the max time to "catch up" to 50ms (0.05 seconds)
  // This prevents a massive update if the tab is backgrounded
  createjs.Ticker.maxDelta = 50;

  queue = new createjs.LoadQueue(false);
  queue.setMaxConnections(10);
  queue.installPlugin(createjs.Sound);
  queue.on("complete", handleComplete);
  queue.loadManifest([
    //   images
    {id: "abjad_background", src: "/images/abjad_background.png"},
    {id: "title_abjad", src: "/images/sukukata/title_sukukata.png"},
    {id: "btn_home_01", src: "/images/btn_home_01.png"},
    {id: "btn_home_02", src: "/images/btn_home_02.png"},
    {id: "btn_keluar_01", src: "/images/btn_keluar_01.png"},
    {id: "btn_keluar_02", src: "/images/btn_keluar_02.png"},
    {id: "btn_kv_01", src: "/images/sukukata/btn_kenali_sukukata_kv0001.png"},
    {id: "btn_kv_02", src: "/images/sukukata/btn_kenali_sukukata_kv0002.png"},
    {id: "btn_kvk_01", src: "/images/sukukata/btn_kenali_sukukata_kvk0001.png"},
    {id: "btn_kvk_02", src: "/images/sukukata/btn_kenali_sukukata_kvk0002.png"},

    //  sounds
    {id: "sound_laman_utama", src: "/sounds/laman_utama.mp3"},
    {id: "sound_kv", src: "/sounds/sukukata/kenali_kv.mp3"},
    {id: "sound_kvk", src: "/sounds/sukukata/kenali_kvk.mp3"},
    {id: "sound_keluar", src: "/sounds/keluar.mp3"},
    {id: "sound_submenu_sukukata", src: "/sounds/sukukata/submenu_sukukata.mp3"},
  ]);
}

function handleComplete() {
  isLoading.value = false;
  playingSound = createjs.Sound.play("sound_submenu_sukukata");
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
  // WIPE the stage clean. This frees all old memory.
  stage.removeAllChildren();

  backgroundImg = new createjs.Bitmap(queue.getResult("abjad_background"));
  // Set registration point to center (better for positioning)
  backgroundImg.regX = backgroundImg.image.width / 2;
  backgroundImg.regY = backgroundImg.image.height / 2;
  // Position it centered horizontally and slightly above the bottom
  backgroundImg.x = canvas.width / 2;
  backgroundImg.y = canvas.height * .45 ; // Adjust this value if needed
  // Scale it properly
  backgroundImg.scaleX = backgroundImg.scaleY = isMobile.value ? .45* dpr:  0.4 * dpr;
  stage.addChild(backgroundImg); // Green background on top

  titleImg = new createjs.Bitmap(queue.getResult("title_abjad"));
  titleImg.regX = titleImg.image.width / 2;
  titleImg.x = canvas.width / 2;
  titleImg.y = canvas.height * .01;
  titleImg.scale =  isMobile.value ? .3 * dpr: .35 * dpr;
  stage.addChild(titleImg);

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
  btnHome.y = canvas.height * .02;
  btnHome.x = canvas.width * .02;
  btnHome.scale = isMobile.value ? .3 * dpr : .4 * dpr;  // Apply scaling


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
  btnKeluar.y = canvas.height * .02;
  btnKeluar.x = canvas.width ;
  btnKeluar.scale = .3 * dpr;// Apply scaling

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
  // stage.addChild(btnKeluar);

  let btnKvSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_kv_01"), // Normal state
      queue.getResult("btn_kv_02")  // Hover / Click state
    ],
    frames: { width: 735, height: 736 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });
  // Create the Sprite
  btnKv = new createjs.Sprite(btnKvSpriteSheet, "normal");
  btnKv.mouseEnabled = true;
  btnKv.mouseChildren = true;
  btnKv.cursor = "pointer";
  btnKv.regY = titleImg.image.height / 2;
  btnKv.y = canvas.height / 2 * .85;
  btnKv.x =  isMobile.value ? canvas.width * .07 : canvas.width * .25;
  btnKv.scale = .35 * dpr; // Apply scaling


  // Add event listeners for hover and click
  btnKv.on("mouseover", () => {
    btnKv.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_kv");
    }
  });
  btnKv.on("mouseout", () => {
    btnKv.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnKv.on("click", () => {
    btnKv.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    //navigate to the abjad page
    router.push({name: 'SukukataKv'});
  });
  stage.addChild(btnKv);

  let btnKvkSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_kvk_01"), // Normal state
      queue.getResult("btn_kvk_02")  // Hover / Click state
    ],
    frames: { width: 758, height: 771 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });

  // Create the Sprite
  btnKvk = new createjs.Sprite(btnKvkSpriteSheet, "normal");
  btnKvk.mouseEnabled = true;
  btnKvk.mouseChildren = true;
  btnKvk.cursor = "pointer";
  btnKvk.y = canvas.height / 2 *  .82;
  btnKvk.x =  isMobile.value ? canvas.width *.55 : canvas.width / 2 ;
  btnKvk.scale = 0.35 * dpr; // Apply scaling


  // Add event listeners for hover and click
  btnKvk.on("mouseover", () => {
    btnKvk.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_kvk");
    }
  });
  btnKvk.on("mouseout", () => {
    btnKvk.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnKvk.on("click", () => {
    btnKvk.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    //navigate to the abjad page
    router.push({name: 'SukukataKvk'});
  });
  stage.addChild(btnKvk);
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

  <Loader v-if="isLoading"></Loader>
</template>

<style scoped>


</style>
