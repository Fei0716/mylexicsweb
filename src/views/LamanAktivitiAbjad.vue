<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import router from "../router.js";
import Loader from "../components/Loader.vue";
import { SceneBuilder } from "../helper.js";

// States
let canvas;
let stage;
let queue;
const dpr = window.devicePixelRatio || 1;
// objects
let builder;
let backgroundImg;
let titleImg;
let btnHome;
let btnSubmenu;
let btnPilihAbjad;
let btnKenaliBunyi;
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
  // Set the max time to "catch up" to 50ms (0.05 seconds)
  // This prevents a massive update if the tab is backgrounded
  createjs.Ticker.maxDelta = 50;

  queue = new createjs.LoadQueue(false);
  queue.setMaxConnections(10);
  queue.installPlugin(createjs.Sound);
  queue.on("complete", handleComplete);
  queue.loadManifest([
    //   images
    { id: "abjad_background", src: "/images/abjad_background.png" },
    { id: "title_abjad", src: "/images/aktiviti/abjad/title_abjad.png" },
    { id: "btn_home_01", src: "/images/btn_home_01.png" },
    { id: "btn_home_02", src: "/images/btn_home_02.png" },
    { id: "btn_submenu_01", src: "/images/btn_submenu_01.png" },
    { id: "btn_submenu_02", src: "/images/btn_submenu_02.png" },
    {
      id: "btn_pilih_abjad_01",
      src: "/images/aktiviti/abjad/btn_pilih_abjad0001.png",
    },
    {
      id: "btn_pilih_abjad_02",
      src: "/images/aktiviti/abjad/btn_pilih_abjad0002.png",
    },
    {
      id: "btn_kenali_bunyi_01",
      src: "/images/aktiviti/abjad/btn_kenali_bunyi0001.png",
    },
    {
      id: "btn_kenali_bunyi_02",
      src: "/images/aktiviti/abjad/btn_kenali_bunyi0002.png",
    },

    //  sounds
    { id: "sound_laman_utama", src: "/sounds/laman_utama.mp3" },
    { id: "sound_submenu", src: "/sounds/submenu.mp3" },
    {
      id: "sound_pilih_abjad",
      src: "/sounds/aktiviti/abjad/aktiviti_pilih_abjad.mp3",
    },
    {
      id: "sound_kenali_bunyi",
      src: "/sounds/aktiviti/abjad/aktiviti_kenali_bunyi.mp3",
    },
  ]);
}

function handleComplete() {
  isLoading.value = false;
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
  // 1. WIPE the stage
  stage.removeAllChildren();

  // 2. Initialize the Builder
  // We instantiate the class so we can use its methods
  builder = new SceneBuilder(stage, queue, dpr);

  // --- BACKGROUND ---
  // Using { centered: true } replaces the manual regX/regY calculations
  backgroundImg = builder.addBitmap(
    "abjad_background",
    canvas.width / 2,
    canvas.height * 0.45,
    isMobile.value ? 0.45 : 0.4,
    { centered: true }
  );

  // --- TITLE ---
  // We capture the returned image so we can access its width for the regX specific logic
  titleImg = builder.addBitmap(
    "title_abjad",
    canvas.width / 2,
    canvas.height * 0.01,
    isMobile.value ? 0.3 : 0.35
  );
  // Original logic only centered X, not Y, so we set it manually here
  titleImg.regX = titleImg.image.width / 2;

  // --- HOME BUTTON ---
  // The builder handles normal/hover states, scaling, positioning, sounds, and routing
  btnHome = builder.addNavButton(
    "btn_home_01",
    "btn_home_02",
    canvas.width * 0.02,
    canvas.height * 0.02,
    isMobile.value ? 0.3 : 0.4,
    "sound_laman_utama",
    "LamanUtama"
  );

  btnSubmenu = builder.addNavButton(
    "btn_submenu_01",
    "btn_submenu_02",
    canvas.width * 0.87,
    canvas.height * 0.02,
    isMobile.value ? 0.3 : 0.4,
    "sound_submenu",
    "LamanAktiviti"
  );

  // --- PILIH ABJAD BUTTON ---
  btnPilihAbjad = builder.addNavButton(
    "btn_pilih_abjad_01",
    "btn_pilih_abjad_02",
    isMobile.value ? canvas.width * 0.07 : canvas.width * 0.2,
    (canvas.height / 2) * 0.85,
    0.35,
    "sound_pilih_abjad",
    "AktivitiAbjadPilihAbjad"
  );
  // Apply the specific RegY logic from your original code (dependent on title height)
  btnPilihAbjad.regY = titleImg.image.height / 2;

  // --- KENALI BUNYI BUTTON ---
  btnKenaliBunyi = builder.addNavButton(
    "btn_kenali_bunyi_01",
    "btn_kenali_bunyi_02",
    isMobile.value ? canvas.width * 0.55 : canvas.width / 2,
    (canvas.height / 2) * 0.85,
    0.35,
    "sound_kenali_bunyi",
    "AktivitiAbjadKenaliBunyi"
  );
  // Apply the specific RegY logic
  btnKenaliBunyi.regY = titleImg.image.height / 2;

  // Ensure the stage updates with the new content
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

    <Loader v-if="isLoading"></Loader>
  </div>
</template>
<style scoped></style>
