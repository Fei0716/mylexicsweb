<script setup>
import {ref, onMounted, onUnmounted, computed} from 'vue';
import router from '../router.js';
import ModalPenghargaan from "../components/ModalPenghargaan.vue";
import Loader from "../components/Loader.vue";
// States
let canvas;
let stage;
let queue;
const dpr = window.devicePixelRatio || 1;
let isMobile = computed(()=>{
  return  window.innerWidth < 1000 && window.innerWidth < window.innerHeight;
});
let targetWidth = isMobile.value ? 675: 1000;
let targetHeight = isMobile.value ? 800 : 675;
let playingSound = null;
let showModalPenghargaan = ref(false);
let isLoading = ref(true);
// objects
let greenBackgroundImg;
let skyImg;
let bannerImg;
let rainbowImg;
let tallGrassImg;
let cloud1Img;
let cloud2Img;
let cloudFormationImg;
let homeDeco;
let sunImg;
let btnAbjad;
let btnPenghargaan;
let snailImg;
let butterflyImg;
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
  stage.canvas.height  = Math.round(dpr * targetHeight);
  // stage.canvas.style.width = `${targetWidth}px`;
  // stage.canvas.style.height = `${targetHeight}px`;
  // console.log(stage.canvas.width, stage.canvas.height, dpr);

  queue = new createjs.LoadQueue(false);
  queue.setMaxConnections(10);
  queue.installPlugin(createjs.Sound);
  queue.on("complete", handleComplete);
  queue.loadManifest([
      {id: "banner", src: "/images/banner.png"},
      {id: "green_background", src: "/images/green_background.png"},
      {id: "rainbow", src: "/images/rainbow.png"},
      {id: "tall_grass", src: "/images/tall_grass.png"},
      {id: "mushroom", src: "/images/mushroom.png"},
      {id: "sun_1", src: "/images/sun_1.png"},
      {id: "sun_2", src: "/images/sun_2.png"},
      {id: "btn_penghargaan_01", src: "/images/btn_penghargaan_01.png"},
      {id: "btn_penghargaan_02", src: "/images/btn_penghargaan_02.png"},
      {id: "btn_abjad_01", src: "/images/btn_abjad_01.png"},
      {id: "btn_abjad_02", src: "/images/btn_abjad_02.png"},
      {id: "btn_sukukata_01", src: "/images/btn_sukukata_01.png"},
      {id: "btn_sukukata_02", src: "/images/btn_sukukata_02.png"},
      {id: "btn_perkataan_01", src: "/images/btn_perkataan_01.png"},
      {id: "btn_perkataan_02", src: "/images/btn_perkataan_02.png"},
      {id: "btn_games_01", src: "/images/btn_games_01.png"},
      {id: "btn_games_02", src: "/images/btn_games_02.png"},
      {id: "sound_abjad", src: "/sounds/sound_abjad.mp3"},
      {id: "sound_penghargaan", src: "/sounds/penghargaan.mp3"},
      {id: "home_deco", src: "/images/home_deco.png"},
      {id: "cloud_formation", src: "/images/cloud_formation.png"},
      {id: "cloud", src: "/images/cloud.png"},
      {id: "snail", src: "/images/snail.png"},
      {id: "butterfly", src: "/images/butterfly.png"},

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

  cloudFormationImg = new createjs.Bitmap(queue.getResult("cloud_formation"));
  cloudFormationImg.x = 0;
  cloudFormationImg.y = 0;
  cloudFormationImg.scale = 1 * dpr;
  stage.addChild(cloudFormationImg);

  cloud1Img = new createjs.Bitmap(queue.getResult("cloud"));
  cloud1Img.x = canvas.width * .01;
  cloud1Img.y = 60;
  cloud1Img.scale = .7 * dpr;
  stage.addChild(cloud1Img);
  //add cloud movement animation
  function animateCloud1() {
    cloud1Img.x = -cloud1Img.getBounds().width; // Reset position
    createjs.Tween.get(cloud1Img)
        .to({ x: canvas.width }, 50000, createjs.Ease.linear)
        .call(animateCloud1); // Restart animation
  }
  animateCloud1();

  cloud2Img = new createjs.Bitmap(queue.getResult("cloud"));
  cloud2Img.x = canvas.width;
  cloud2Img.y = 0;
  cloud2Img.scale = .7 * dpr;
  stage.addChild(cloud2Img);
  //add cloud movement animation
  function animateCloud2() {
    let cloudWidth = cloud2Img.getBounds().width * cloud2Img.scale; // Get scaled width
    createjs.Tween.get(cloud2Img)
        .to({ x: -cloudWidth }, 50000, createjs.Ease.linear) // Move left
        .call(() => {
          cloud2Img.x = canvas.width; // Reset position to the right
          animateCloud2(); // Restart animation
        });
  }
  animateCloud2();

  rainbowImg = new createjs.Bitmap(queue.getResult("rainbow"));
  rainbowImg.x = 0;
  rainbowImg.y = canvas.height * .25;
  rainbowImg.scale = .4 * dpr;
  stage.addChild(rainbowImg);

  greenBackgroundImg = new createjs.Bitmap(queue.getResult("green_background"));
  // Set registration point to center (better for positioning)
  greenBackgroundImg.regX = greenBackgroundImg.image.width / 2;
  greenBackgroundImg.regY = greenBackgroundImg.image.height / 2;
  // Position it centered horizontally and slightly above the bottom
  greenBackgroundImg.x = canvas.width/2;
  greenBackgroundImg.y = isMobile.value ? canvas.height * .79 : canvas.height * .85 ; // Adjust this value if needed
  // Scale it properly
  greenBackgroundImg.scaleX = greenBackgroundImg.scaleY = .4 * dpr;
  stage.addChild(greenBackgroundImg); // Green background on top

  bannerImg = new createjs.Bitmap(queue.getResult("banner"));
  bannerImg.regX = bannerImg.image.width / 2;
  bannerImg.regY = bannerImg.image.height / 2 ;
  bannerImg.x = canvas.width / 2 ;
  bannerImg.y = canvas.height * 0.3;
  bannerImg.scale = .4 * dpr;
  stage.addChild(bannerImg);

  tallGrassImg = new createjs.Bitmap(queue.getResult("tall_grass"));
  tallGrassImg.x = 0;
  tallGrassImg.y =   isMobile.value ? canvas.height * .41 : canvas.height * .4 ;
  tallGrassImg.scale = 0.4 * dpr;
  stage.addChild(tallGrassImg);


  // Create a glowing circle behind the sun
  let glow = new createjs.Shape();
  glow.graphics.beginRadialGradientFill(
      ["#ffff99", "#ffcc00", "rgba(255,204,0,0)"], // Yellow gradient fading outward
      [0, 0.5, 1], // Gradient stops
      0, 0, 0, // Inner circle
      0, 0, 100 // Outer circle radius
  );
  glow.graphics.drawCircle(0, 0, 100);
  glow.graphics.endFill();

  glow.x = 120 + (368 * 0.3) / 2; // Center the glow behind the sun
  glow.y = 20 + (385 * 0.3) / 2;
  glow.x *= dpr;
  glow.y *= dpr;
  glow.alpha = 0.7; // Adjust transparency
  glow.scale = .8* dpr;  // Scale the glow to be slightly larger than the sun
  stage.addChild(glow); // Add glow first so it's behind the sun

  // Define a SpriteSheet with two frames (normal & hover)
  let sunSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("sun_1"), // Normal state
      queue.getResult("sun_2")  // Hover / Click state
    ],
    frames: { width: 368, height: 385 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1,
      loop: { frames: [0, 1], speed: .2 } // Looping animation
    }
  });

// Create the Sprite
  sunImg = new createjs.Sprite(sunSpriteSheet, "loop");
  sunImg.y = 20* dpr;
  sunImg.x = 120* dpr;
  sunImg.scale = .3 * dpr; // Apply scaling

  stage.addChild(sunImg)

  homeDeco = new createjs.Bitmap(queue.getResult("home_deco"));
  homeDeco.x = isMobile.value ? canvas.width * .35 : canvas.width * .45;
  homeDeco.y = isMobile.value ? canvas.height * .45 :  canvas.height * .2;
  homeDeco.scale = isMobile.value ? 0.5 * dpr :  0.6 * dpr;
  stage.addChild(homeDeco);

  // Define a SpriteSheet with two frames (normal & hover)
  let buttonAbjadSpriteSheet = new createjs.SpriteSheet({
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
  btnAbjad = new createjs.Sprite(buttonAbjadSpriteSheet, "normal");
  btnAbjad.mouseEnabled = true;
  btnAbjad.mouseChildren = true;
  btnAbjad.cursor = "pointer";
  btnAbjad.y = canvas.height / 2;
  btnAbjad.x = canvas.width * .2;
  btnAbjad.scale = 0.35 * dpr; // Apply scaling
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

  let btnPenghargaanSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_penghargaan_01"), // Normal state
      queue.getResult("btn_penghargaan_02")  // Hover / Click state
    ],
    frames: { width: 310, height: 317 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });

  // Create the Sprite
  btnPenghargaan = new createjs.Sprite(btnPenghargaanSpriteSheet, "normal");
  btnPenghargaan.mouseEnabled = true;
  btnPenghargaan.mouseChildren = true;
  btnPenghargaan.cursor = "pointer";
  btnPenghargaan.y = canvas.height * .01;
  btnPenghargaan.x = isMobile.value ? canvas.width* .82 :  canvas.width* .87;
  btnPenghargaan.scale =  .38 * dpr; // Apply scaling

  // Add event listeners for hover and click
  btnPenghargaan.on("mouseover", () => {
    btnPenghargaan.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_penghargaan");
    }
  });
  btnPenghargaan.on("mouseout", () => {
    btnPenghargaan.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnPenghargaan.on("click", () => {
    btnPenghargaan.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    showModalPenghargaan.value = true;

  });
  stage.addChild(btnPenghargaan);

// Create the snail image
  snailImg = new createjs.Bitmap(queue.getResult("snail"));
  snailImg.x = canvas.width * .9; // Start from the right
  snailImg.y = canvas.height * .9; // Position at bottom
  snailImg.scale = 0.1 * dpr; // Scale down
  stage.addChild(snailImg);

// Function to move the snail smoothly from right to left
  function animateSnail() {
    let snailWidth = snailImg.getBounds().width * snailImg.scale; // Get correct width

    createjs.Tween.get(snailImg, { loop: false }) // Ensure smooth movement
        .to({ x: -snailWidth }, 90000, createjs.Ease.linear) // Slow, smooth movement
        .call(() => {
          snailImg.x = canvas.width; // Reset position to the right
          animateSnail(); // Restart animation
        });
  }
// Start the animation
  animateSnail();
  loadButterflyAnimation();
}
function loadButterflyAnimation(){
  let animationSpriteSheet = new createjs.SpriteSheet({
    images: [queue.getResult("butterfly")],
    framerate: 30,
    frames: [[0,0,34,32,0,17.6,10.5],[34,0,35,31,0,7.600000000000001,29.5],[34,0,35,31,0,-5.399999999999999,48.5],[34,0,35,31,0,-21.4,63.5],[34,0,35,31,0,-42.4,71.5],[69,0,35,35,0,-70.4,76.5],[104,0,32,35,0,-99.4,76.5],[136,0,31,36,0,-109.4,67.5],[167,0,30,35,0,-117.4,55.5],[197,0,30,34,0,-121.4,49.5],[0,36,30,34,0,-126.4,44.5],[30,36,34,35,0,-128.4,39.5],[34,0,35,31,0,-133.4,31.5],[64,36,33,36,0,-137.4,30.5],[97,36,29,35,0,-144.4,23.5],[126,36,29,34,0,-148.4,19.5],[167,0,30,35,0,-151.4,15.5],[136,0,31,36,0,-159.4,5.5],[155,36,32,35,0,-166.4,-5.5],[187,36,35,36,0,-179.4,-32.5],[34,0,35,31,0,-194.4,-61.5],[34,0,35,31,0,-200.4,-73.5],[34,0,35,31,0,-206.4,-84.5],[34,0,35,31,0,-212.4,-95.5],[34,0,35,31,0,-218.4,-106.5],[222,36,30,35,0,-232.4,-129.5],[155,36,32,35,0,-244.4,-150.5],[34,0,35,31,0,-258.4,-174.5],[34,0,35,31,0,-276.4,-165.5],[34,0,35,31,0,-294.4,-156.5],[34,0,35,31,0,-312.4,-146.5],[34,0,35,31,0,-325.4,-128.5],[34,0,35,31,0,-334.4,-109.5],[34,0,35,31,0,-343.4,-90.5],[34,0,35,31,0,-352.4,-71.5],[34,0,35,31,0,-358.4,-57.5],[34,0,35,31,0,-364.4,-42.5],[34,0,35,31,0,-370.4,-28.5],[34,0,35,31,0,-376.4,-14.5],[34,0,35,31,0,-382.4,-0.5],[34,0,35,31,0,-388.4,14.5],[34,0,35,31,0,-394.4,28.5],[34,0,35,31,0,-400.4,42.5],[34,0,35,31,0,-406.4,56.5],[34,0,35,31,0,-412.4,69.5],[34,0,35,31,0,-422.4,63.5],[34,0,35,31,0,-433.4,58.5],[34,0,35,31,0,-444.4,53.5],[34,0,35,31,0,-454.4,47.5],[34,0,35,31,0,-464.4,40.5],[167,0,30,35,0,-478.4,32.5],[0,72,33,36,0,-488.4,17.5],[33,72,29,34,0,-500.4,2.5],[62,72,34,36,0,-507.4,-11.5],[34,0,35,31,0,-515.4,-31.5],[96,72,35,35,0,-521.4,-44.5],[131,72,31,35,0,-528.4,-60.5],[162,72,30,35,0,-534.4,-78.5],[192,72,31,35,0,-538.4,-95.5],[0,108,35,36,0,-541.4,-110.5],[192,72,31,35,0,-532.4,-125.5],[162,72,30,35,0,-521.4,-137.5],[131,72,31,35,0,-507.4,-148.5],[96,72,35,35,0,-494.4,-160.5],[34,0,35,31,0,-484.4,-176.5],[35,108,35,35,0,-497.4,-170.5],[155,36,32,35,0,-511.4,-165.5],[70,108,29,35,0,-526.4,-162.5],[222,36,30,35,0,-538.4,-160.5],[99,108,35,35,0,-533.4,-173.5]],
    animations: {
      run: [0,81, "run" , .7],
      end: [81,81],
      stop: [0]
    }
  });
  let animation= new createjs.Sprite(animationSpriteSheet);
  animation.x = canvas.width * .25;
  animation.y = canvas.height * .6;
  animation.scale = 1 * dpr;
  stage.addChild(animation);
  animation.gotoAndPlay("run");
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

  <Transition name="fade-in">
    <ModalPenghargaan @hide="showModalPenghargaan = false;" v-if="showModalPenghargaan"></ModalPenghargaan>
  </Transition>

  <Loader v-if="isLoading"></Loader>

</template>

<style scoped>


</style>
