<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import router from "../router.js";
import ModalPenghargaan from "../components/ModalPenghargaan.vue";
import Loader from "../components/Loader.vue";
import { SceneBuilder } from "../helper.js";

// States
let canvas;
let stage;
let queue;
const dpr = window.devicePixelRatio || 1;
let isMobile = computed(() => {
  return window.innerWidth < 1000 && window.innerWidth < window.innerHeight;
});
let targetWidth = isMobile.value ? 675 : 1000;
let targetHeight = isMobile.value ? 800 : 675;
let showModalPenghargaan = ref(false);
let isLoading = ref(true);

// objects
let builder;
let greenBackgroundImg;
let skyImg;
let bannerImg;
let rainbowImg;
let tallGrassImg;
let flowerWalkway;
let house;
let bird_1;
let bird_2;
let cloud1Img;
let cloud2Img;
let cloudFormationImg;
let homeDeco;
let btnAbjad;
let btnSukukata;
let btnPerkataan;
let btnHome;
let flower_1;
let flower_2;
let flower_3;
let houseFrames = [
  [0, 0, 291, 340, 0, 1.5, -2.15],
  [0, 0, 291, 340, 0, 1.5, -2.15],
  [0, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
  [293, 0, 291, 340, 0, 1.5, -2.15],
];
let birdFrames = [
  [0, 0, 67, 54, 0, 1, -2.1],
  [69, 0, 67, 54, 0, 1, -2.1],
  [138, 0, 67, 54, 0, 1, -2.1],
  [207, 0, 67, 54, 0, 1, -2.1],
  [276, 0, 67, 54, 0, 1, -2.1],
  [345, 0, 67, 54, 0, 1, -2.1],
  [414, 0, 67, 54, 0, 1, -2.1],
  [0, 56, 67, 54, 0, 1, -2.1],
  [69, 56, 67, 53, 0, 1, -3.1],
  [138, 56, 67, 53, 0, 1, -3.1],
  [207, 56, 67, 52, 0, 1, -4.1],
  [276, 56, 67, 52, 0, 1, -4.1],
  [345, 56, 67, 51, 0, 1, -5.1],
  [345, 56, 67, 51, 0, 1, -5.1],
  [345, 56, 67, 51, 0, 1, -5.1],
  [345, 56, 67, 51, 0, 1, -5.1],
  [414, 56, 67, 52, 0, 1, -4.1],
  [0, 112, 67, 53, 0, 1, -3.1],
  [69, 112, 67, 54, 0, 1, -2.1],
  [138, 112, 67, 54, 0, 1, -2.1],
  [207, 112, 67, 54, 0, 1, -2.1],
  [276, 112, 67, 54, 0, 1, -2.1],
  [345, 112, 67, 54, 0, 1, -2.1],
  [0, 0, 67, 54, 0, 1, -2.1],
  [0, 0, 67, 54, 0, 1, -2.1],
  [0, 0, 67, 54, 0, 1, -2.1],
];
function init() {
  canvas = document.getElementById("canvas");
  // canvas.width = targetWidth ;
  // canvas.height = targetHeight;
  // Get the device pixel ratio

  // Initialize CreateJS Stage
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
  // Set the max time to "catch up" to 50ms (0.05 seconds)
  // This prevents a massive update if the tab is backgrounded
  createjs.Ticker.maxDelta = 50;

  queue = new createjs.LoadQueue(false);
  queue.setMaxConnections(10);
  queue.installPlugin(createjs.Sound);
  queue.on("complete", handleComplete);
  queue.loadManifest([
    { id: "banner", src: "/images/aktiviti/title.png" },
    { id: "green_background", src: "/images/green_background.png" },
    { id: "rainbow", src: "/images/rainbow.png" },
    { id: "tall_grass", src: "/images/tall_grass.png" },
    { id: "flower_walkway", src: "/images/aktiviti/flower_walkway.png" },
    { id: "house", src: "/images/aktiviti/house.png" },
    { id: "btn_penghargaan_01", src: "/images/btn_penghargaan_01.png" },
    { id: "btn_penghargaan_02", src: "/images/btn_penghargaan_02.png" },
    { id: "btn_abjad_01", src: "/images/aktiviti/btn_abjad0001.png" },
    { id: "btn_abjad_02", src: "/images/aktiviti/btn_abjad0002.png" },
    { id: "btn_sukukata_01", src: "/images/aktiviti/btn_sukukata0001.png" },
    { id: "btn_sukukata_02", src: "/images/aktiviti/btn_sukukata0002.png" },
    { id: "btn_perkataan_01", src: "/images/aktiviti/btn_perkataan0001.png" },
    { id: "btn_perkataan_02", src: "/images/aktiviti/btn_perkataan0002.png" },
    { id: "btn_home_01", src: "/images/btn_home_01.png" },
    { id: "btn_home_02", src: "/images/btn_home_02.png" },
    { id: "cloud_formation", src: "/images/cloud_formation.png" },
    { id: "cloud", src: "/images/cloud.png" },
    { id: "bird", src: "/images/aktiviti/bird_flying.png" },
    { id: "flower", src: "/images/flower.png" },

    { id: "sound_abjad", src: "/sounds/aktiviti/aktiviti_abjad.mp3" },
    { id: "sound_sukukata", src: "/sounds/aktiviti/aktiviti_sukukata.mp3" },
    { id: "sound_perkataan", src: "/sounds/aktiviti/aktiviti_perkataan.mp3" },
    { id: "sound_aktiviti", src: "/sounds/sound_aktiviti.mp3" },
    { id: "sound_modul_aktiviti", src: "/sounds/aktiviti/modul_aktiviti.mp3" },
    { id: "sound_laman_utama", src: "/sounds/laman_utama.mp3" },
  ]);
}

function handleComplete() {
  isLoading.value = false;
  loadScene();
  builder.playSound("sound_modul_aktiviti");
  createjs.Ticker.addEventListener("tick", handleTick);
}

function handleTick() {
  /*
   * update similar to requestAnimationFrame
   * */
  stage.update();
}

function loadScene() {
  // 1. Wipe Stage
  stage.removeAllChildren();

  // 2. Initialize the Builder
  builder = new SceneBuilder(stage, queue, dpr);

  // --- BACKGROUND (Gradient Sky - Custom Logic) ---
  skyImg = new createjs.Shape();
  skyImg.graphics.beginRadialGradientFill(
    ["#ffffff", "#50c9ff"],
    [0, 1],
    0,
    0,
    5,
    0,
    0,
    canvas.width
  );
  skyImg.graphics.drawRect(0, 0, canvas.width, canvas.height);
  stage.addChild(skyImg);

  // --- STATIC ASSETS (Using Builder) ---
  builder.addBitmap("cloud_formation", 0, 0, 1);
  builder.addBitmap("rainbow", 0, canvas.height * 0.01, 0.6);

  // Green Background (Centered)
  builder.addBitmap(
    "green_background",
    canvas.width / 2,
    isMobile.value ? canvas.height * 0.79 : canvas.height * 0.85,
    0.4,
    { centered: true }
  );

  // --- CLOUDS (Captured for Animation) ---
  cloud1Img = builder.addBitmap("cloud", canvas.width * 0.01, 60, 0.7);
  // Re-declare animation function locally or keep if defined outside
  function animateCloud1() {
    cloud1Img.x = -cloud1Img.getBounds().width;
    createjs.Tween.get(cloud1Img)
      .to({ x: canvas.width }, 50000, createjs.Ease.linear)
      .call(animateCloud1);
  }
  animateCloud1();

  cloud2Img = builder.addBitmap("cloud", canvas.width, 0, 0.7);
  function animateCloud2() {
    let cloudWidth = cloud2Img.getBounds().width * cloud2Img.scale;
    createjs.Tween.get(cloud2Img)
      .to({ x: -cloudWidth }, 50000, createjs.Ease.linear)
      .call(() => {
        cloud2Img.x = canvas.width;
        animateCloud2();
      });
  }
  animateCloud2();

  // Banner & Grass
  builder.addBitmap(
    "banner",
    isMobile.value ? canvas.width * 0.55 : canvas.width * 0.7,
    canvas.height * 0.28,
    0.4,
    {
      centered: true,
    }
  );
  builder.addBitmap(
    "tall_grass",
    0,
    isMobile.value ? canvas.height * 0.41 : canvas.height * 0.4,
    0.4
  );

  // Flower Walkway (Flipped horizontally via scaleX: negative)
  builder.addBitmap(
    "flower_walkway",
    isMobile.value ? canvas.width * 0.35 : canvas.width * 0.24,
    isMobile.value ? canvas.height * 0.87 : canvas.height * 0.92,
    0.53,
    { centered: true, scaleX: -0.53, scaleY: 0.53 }
  );

  // --- ANIMATED SPRITES ---
  // House
  builder.addAnimatedSprite(
    "house",
    houseFrames,
    isMobile.value ? -canvas.width * 0.04 : -canvas.width * 0.04,
    isMobile.value ? canvas.height * 0.3 : canvas.height * 0.2,
    isMobile.value ? 1 : 1.1
  );

  // Bird 1
  builder.addAnimatedSprite(
    "bird",
    birdFrames,
    isMobile.value ? canvas.width * 0.21 : canvas.width * 0.47,
    isMobile.value ? canvas.height * 0.24 : canvas.height * 0.23,
    isMobile.value ? 1 : 1.1
  );

  // Bird 2 (Flipped)
  builder.addAnimatedSprite(
    "bird",
    birdFrames,
    isMobile.value ? canvas.width * 0.89 : canvas.width * 0.93,
    isMobile.value ? canvas.height * 0.23 : canvas.height * 0.22,
    1,
    { scaleX: isMobile.value ? -1 : -1.1, scaleY: isMobile.value ? 1 : 1.1 }
  );

  // --- NAVIGATION BUTTONS ---
  // Abjad
  builder.addNavButton(
    "btn_abjad_01",
    "btn_abjad_02",
    isMobile.value ? canvas.width * 0.38 : canvas.width * 0.35,
    isMobile.value ? canvas.height * 0.5 : canvas.height * 0.4,
    isMobile.value ? 0.25 : 0.35,
    "sound_abjad",
    "LamanAktivitiAbjad"
  );

  // Sukukata
  builder.addNavButton(
    "btn_sukukata_01",
    "btn_sukukata_02",
    isMobile.value ? canvas.width * 0.59 : canvas.width * 0.55,
    isMobile.value ? canvas.height * 0.6 : canvas.height * 0.5,
    isMobile.value ? 0.28 : 0.4,
    "sound_sukukata",
    "LamanAktivitiSukukata"
  );

  // Perkataan
  builder.addNavButton(
    "btn_perkataan_01",
    "btn_perkataan_02",
    isMobile.value ? canvas.width * 0.79 : canvas.width * 0.75,
    isMobile.value ? canvas.height * 0.7 : canvas.height * 0.6,
    isMobile.value ? 0.28 : 0.4,
    "sound_perkataan",
    "LamanAktivitiPerkataan"
  );

  // Home
  builder.addNavButton(
    "btn_home_01",
    "btn_home_02",
    isMobile.value ? canvas.width * 0.8 : canvas.width * 0.87,
    canvas.height * 0.01,
    0.38,
    "sound_laman_utama",
    "LamanUtama"
  );

  // --- DECORATIVE FLOWERS ---
  builder.addBitmap(
    "flower",
    isMobile.value ? canvas.width * 0.85 : canvas.width * 0.55,
    isMobile.value ? canvas.height * 0.6 : canvas.height * 0.9,
    0.4
  );
  builder.addBitmap(
    "flower",
    isMobile.value ? canvas.width * 0.7 : canvas.width * 0.95,
    isMobile.value ? canvas.height * 0.9 : canvas.height * 0.65,
    0.3
  );
  builder.addBitmap(
    "flower",
    isMobile.value ? canvas.width * 0.33 : canvas.width * 0.3,
    isMobile.value ? canvas.height * 0.62 : canvas.height * 0.65,
    0.25
  );

  stage.update();
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

  if (builder.playingSound) {
    builder.playingSound.stop();
    builder.playingSound = null;
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
  <div class="min-h-screen bg-white w-full body-game">
    <div id="container">
      <canvas id="canvas"></canvas>
    </div>

    <Transition name="fade-in">
      <ModalPenghargaan
        @hide="showModalPenghargaan = false"
        v-if="showModalPenghargaan"
      ></ModalPenghargaan>
    </Transition>

    <Loader v-if="isLoading"></Loader>
  </div>
</template>

<style scoped></style>
