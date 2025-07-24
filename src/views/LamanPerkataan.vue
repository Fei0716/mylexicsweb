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
let btnKenaliPerkataan;
let btnKeluargaPerkataan;
let isLoading = ref(true);
let isMobile = computed(() => {
  return window.innerWidth < 1000 && window.innerWidth < window.innerHeight;
});
let targetWidth = isMobile.value ? 675 : 1000;
let targetHeight = isMobile.value ? 800 : 675;

function init() {
  //get DPI
  canvas = document.getElementById("canvas");
  canvas.width = targetWidth;
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
  stage.canvas.height = Math.round(dpr * targetHeight);

  queue = new createjs.LoadQueue(false);
  queue.setMaxConnections(10);
  queue.installPlugin(createjs.Sound);
  queue.on("complete", handleComplete);
  queue.loadManifest([
    //   images
    {id: "abjad_background", src: "/images/abjad_background.png"},
    {id: "title_abjad", src: "/images/perkataan/title_perkataan.png"},
    {id: "btn_home_01", src: "/images/btn_home_01.png"},
    {id: "btn_home_02", src: "/images/btn_home_02.png"},
    {id: "btn_keluar_01", src: "/images/btn_keluar_01.png"},
    {id: "btn_keluar_02", src: "/images/btn_keluar_02.png"},
    {id: "btn_keluarga_perkataan_01", src: "/images/perkataan/btn_keluarga_perkataan0001.png"},
    {id: "btn_keluarga_perkataan_02", src: "/images/perkataan/btn_keluarga_perkataan0002.png"},
    {id: "btn_kenali_perkataan_01", src: "/images/perkataan/btn_kenali_perkataan0001.png"},
    {id: "btn_kenali_perkataan_02", src: "/images/perkataan/btn_kenali_perkataan0002.png"},

    //  sounds
    {id: "sound_laman_utama", src: "/sounds/laman_utama.mp3"},
    {id: "sound_kenali_perkataan", src: "/sounds/perkataan/kenali_perkataan.mp3"},
    {id: "sound_keluarga_perkataan", src: "/sounds/perkataan/keluarga_perkataan.mp3"},
    {id: "sound_keluar", src: "/sounds/keluar.mp3"},
    {id: "sound_submenu_perkataan", src: "/sounds/perkataan/submenu_perkataan.mp3"},
  ]);
}

function handleComplete() {
  isLoading.value = false;
  playingSound = createjs.Sound.play("sound_submenu_perkataan");
  loadScene();
  createjs.Ticker.addEventListener("tick", handleTick);
}

function handleTick() {
  /*
  * update similar to requestAnimationFrame
  * */
  stage.update();
}

function loadScene() {
  /*
  * load up the images
  * */
  backgroundImg = new createjs.Bitmap(queue.getResult("abjad_background"));
  // Set registration point to center (better for positioning)
  backgroundImg.regX = backgroundImg.image.width / 2;
  backgroundImg.regY = backgroundImg.image.height / 2;
  // Position it centered horizontally and slightly above the bottom
  backgroundImg.x = canvas.width / 2;
  backgroundImg.y = canvas.height * .45; // Adjust this value if needed
  // Scale it properly
  backgroundImg.scaleX = backgroundImg.scaleY = isMobile.value ? .45 * dpr : 0.4 * dpr;
  stage.addChild(backgroundImg); // Green background on top

  titleImg = new createjs.Bitmap(queue.getResult("title_abjad"));
  titleImg.regX = titleImg.image.width / 2;
  titleImg.x = canvas.width / 2;
  titleImg.y = canvas.height * .01;
  titleImg.scale = isMobile.value ? .3 * dpr : .35 * dpr;
  stage.addChild(titleImg);

  let btnHomeSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_home_01"), // Normal state
      queue.getResult("btn_home_02")  // Hover / Click state
    ],
    frames: {width: 333, height: 363}, // Adjust size as needed
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
    frames: {width: 373, height: 451}, // Adjust size as needed
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
  btnKeluar.x = canvas.width;
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

  let btnKenaliPerkataanSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_kenali_perkataan_01"), // Normal state
      queue.getResult("btn_kenali_perkataan_02")  // Hover / Click state
    ],
    frames: {width: 721, height: 762}, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });
  // Create the Sprite
  btnKenaliPerkataan = new createjs.Sprite(btnKenaliPerkataanSpriteSheet, "normal");
  btnKenaliPerkataan.mouseEnabled = true;
  btnKenaliPerkataan.mouseChildren = true;
  btnKenaliPerkataan.cursor = "pointer";
  btnKenaliPerkataan.regY = titleImg.image.height / 2;
  btnKenaliPerkataan.y = canvas.height / 2 * .85;
  btnKenaliPerkataan.x = isMobile.value ? canvas.width * .07 : canvas.width * .20;
  btnKenaliPerkataan.scale = .35 * dpr; // Apply scaling


  // Add event listeners for hover and click
  btnKenaliPerkataan.on("mouseover", () => {
    btnKenaliPerkataan.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_kenali_perkataan");
    }
  });
  btnKenaliPerkataan.on("mouseout", () => {
    btnKenaliPerkataan.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnKenaliPerkataan.on("click", () => {
    btnKenaliPerkataan.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    router.push({name: 'KenaliPerkataan'});
  });
  stage.addChild(btnKenaliPerkataan);

  let btnKeluargaPerkataanSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_keluarga_perkataan_01"), // Normal state
      queue.getResult("btn_keluarga_perkataan_02")  // Hover / Click state
    ],
    frames: {width: 721, height: 762}, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });

  // Create the Sprite
  btnKeluargaPerkataan = new createjs.Sprite(btnKeluargaPerkataanSpriteSheet, "normal");
  btnKeluargaPerkataan.mouseEnabled = true;
  btnKeluargaPerkataan.mouseChildren = true;
  btnKeluargaPerkataan.cursor = "pointer";
  btnKeluargaPerkataan.regY = titleImg.image.height / 2;
  btnKeluargaPerkataan.y = canvas.height / 2 * .85;
  btnKeluargaPerkataan.x = isMobile.value ? canvas.width * .55 : canvas.width / 2;
  btnKeluargaPerkataan.scale = 0.35 * dpr; // Apply scaling


  // Add event listeners for hover and click
  btnKeluargaPerkataan.on("mouseover", () => {
    btnKeluargaPerkataan.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_keluarga_perkataan");
    }
  });
  btnKeluargaPerkataan.on("mouseout", () => {
    btnKeluargaPerkataan.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnKeluargaPerkataan.on("click", () => {
    btnKeluargaPerkataan.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    //navigate to the abjad page
    router.push({name: 'KeluargaPerkataan'});
  });
  stage.addChild(btnKeluargaPerkataan);
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
