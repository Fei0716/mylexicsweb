<script setup>
import {computed, h, onMounted, onUnmounted, ref} from 'vue';
import router from '../router.js';
import ModalContinue from "../components/ModalContinue.vue";
import Loader from "../components/Loader.vue";
// States
let canvas;
let stage;
let queue;
let playingSound = null;
let displayedImage = null;
let displayedText = null;
let currentPage = 1;
let showModalContinue = ref(false);
let isLoading = ref(true);
let isMobile = computed(()=>{
  return  window.innerWidth < 1000 && window.innerWidth < window.innerHeight;
});
let targetWidth = isMobile.value ? 675: 1000;
let targetHeight = isMobile.value ? 800 : 675;
const dpr = window.devicePixelRatio || 1;

const konsonans = [
  { letter: "b", word: "baling_bola", width: 551, height: 723 },
  { letter: "c", word: "cicak", width: 838, height: 898 },
  { letter: "d", word: "duduk", width: 566, height: 1045 },
  { letter: "f", word: "filem", width: 586, height: 722 },
  { letter: "g", word: "gajah", width: 878, height: 1163 },
  { letter: "h", word: "hon", width: 546, height: 1144 },
  { letter: "j", word: "jala", width: 940, height: 899 },
  { letter: "k", word: "kaki_kakak", width: 608, height: 823 },
  { letter: "l", word: "lilin", width: 885, height: 1003 },
  { letter: "m", word: "meja", width: 1058, height: 785 },
  { letter: "n", word: "naga", width: 1091, height: 649 },
  { letter: "p", word: "pen", width: 301, height: 658 },
  { letter: "q", word: "qari", width: 587, height: 718 },
  { letter: "r", word: "ros", width: 463, height: 616 },
  { letter: "s", word: "sungai", width: 1315, height: 852 },
  { letter: "t", word: "tukul", width: 761, height: 1137 },
  { letter: "v", word: "vas", width: 542, height: 780 },
  { letter: "w", word: "wisel", width: 1062, height: 643 },
  { letter: "x", word: "xray", width: 741, height: 875 },
  { letter: "y", word: "yoyo", width: 668, height: 1154 },
  { letter: "z", word: "zip", width: 813, height: 711 },
];

// objects
let kenaliBackgroundImg;
let kenaliKonsonanBergambarTitleImg;
let tvImg;
let btnHome;
let btnKeluar;
let btnSubmenu;
let btnBantuan;
let btnArahan;
let btnNext;
let btnPrevious;

const generateAssets = (konsonans) => {
  let assets = [];

  konsonans.forEach(({ letter, word }) => {
    // Add consonant button images
    assets.push({ id: `btn_${letter}_01`, src: `/images/konsonan_bergambar/btn_${letter}0001.png` });
    assets.push({ id: `btn_${letter}_02`, src: `/images/konsonan_bergambar/btn_${letter}0002.png` });

    // Add consonant text image
    assets.push({ id: `text_${letter}`, src: `/images/konsonan_bergambar/text_${letter}.png` });

    // Add consonant sound
    assets.push({ id: `sound_${letter}`, src: `/sounds/konsonan_bergambar/${letter}.mp3` });

    // Add word-related sound
    assets.push({ id: `sound_${word}`, src: `/sounds/konsonan_bergambar/${word}.mp3` });
  });

  return assets;
};

// Example usage:
const assetsArr = generateAssets(konsonans);
const generalAssetsArr= [
  //   images
  {id: "kenali_background", src: "/images/kenali_background.png"},
  {id: "title_kenali_konsonan_bergambar", src: "/images/konsonan_bergambar/title_konsonan_bergambar.png"},
  {id: "tv", src: "/images/tv_2.png"},

  {id: "btn_home_01", src: "/images/btn_home_01.png"},
  {id: "btn_home_02", src: "/images/btn_home_02.png"},
  {id: "btn_bantuan_01", src: "/images/btn_bantuan_01.png"},
  {id: "btn_bantuan_02", src: "/images/btn_bantuan_02.png"},
  {id: "btn_arahan", src: "/images/btn_arahan.png"},
  {id: "btn_keluar_01", src: "/images/btn_keluar_01.png"},
  {id: "btn_keluar_02", src: "/images/btn_keluar_02.png"},
  {id: "btn_submenu_01", src: "/images/btn_submenu_01.png"},
  {id: "btn_submenu_02", src: "/images/btn_submenu_02.png"},
  {id: "btn_next_01", src: "/images/btn_next_01.png"},
  {id: "btn_next_02", src: "/images/btn_next_02.png"},
  {id: "btn_previous_01", src: "/images/btn_previous_01.png"},
  {id: "btn_previous_02", src: "/images/btn_previous_02.png"},

  //  sounds
  {id: "sound_vokal", src: "/sounds/kenali_vokal.mp3"},
  {id: "sound_laman_utama", src: "/sounds/laman_utama.mp3"},
  {id: "sound_keluar", src: "/sounds/keluar.mp3"},
  {id: "sound_submenu", src: "/sounds/submenu.mp3"},
  {id: "sound_bantuan", src: "/sounds/bantuan.mp3"},
  {id: "sound_klik_gambar", src: "/sounds/klik_gambar.mp3"},
  {id: "sound_ingin_teruskan", src: "/sounds/ingin_teruskan.mp3"},
];
const mergedAssetsArr = [...generalAssetsArr, ...assetsArr];
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

  queue = new createjs.LoadQueue();
  queue.setMaxConnections(10);
  queue.installPlugin(createjs.Sound);
  queue.on("complete", handleComplete);
  queue.loadManifest(mergedAssetsArr);
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
  kenaliBackgroundImg= new createjs.Bitmap(queue.getResult("kenali_background"));
  // Set registration point to center (better for positioning)
  kenaliBackgroundImg.regX = kenaliBackgroundImg.image.width / 2;
  kenaliBackgroundImg.regY = kenaliBackgroundImg.image.height / 2;
  // Position it centered horizontally and slightly above the bottom
  kenaliBackgroundImg.x = canvas.width / 2;
  kenaliBackgroundImg.y = canvas.height * .45 ; // Adjust this value if needed
  // Scale it properly
  kenaliBackgroundImg.scaleX = kenaliBackgroundImg.scaleY = isMobile.value ? 0.45 * dpr :0.4 * dpr;
  stage.addChild(kenaliBackgroundImg); // Green background on top

  kenaliKonsonanBergambarTitleImg = new createjs.Bitmap(queue.getResult("title_kenali_konsonan_bergambar"));
  kenaliKonsonanBergambarTitleImg.regX = kenaliKonsonanBergambarTitleImg.image.width / 2;
  kenaliKonsonanBergambarTitleImg.x = canvas.width / 2;
  kenaliKonsonanBergambarTitleImg.y = canvas.height * .01;
  kenaliKonsonanBergambarTitleImg.scale = isMobile.value ? .3 * dpr: .35 * dpr;
  stage.addChild(kenaliKonsonanBergambarTitleImg);


  tvImg= new createjs.Bitmap(queue.getResult("tv"));
  // Set registration point to center (better for positioning)
  tvImg.regX = tvImg.image.width / 2;
  tvImg.regY = tvImg.image.height / 2;
  // Position it centered horizontally and slightly above the bottom
  tvImg.x = canvas.width / 2;
  tvImg.y = isMobile.value ? canvas.height * .55  :canvas.height * .6; // Adjust this value if needed
  // Scale it properly
  tvImg.scaleX = tvImg.scaleY = isMobile.value ? 0.3 * dpr : 0.35 * dpr;
  stage.addChild(tvImg); // Green background on top


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
  btnHome.y = canvas.height * 0.02;
  btnHome.x = canvas.width * 0.04;
  btnHome.scale = isMobile.value ? .3 * dpr : .4 * dpr; // Apply scaling

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


  let btnSubmenuSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_submenu_01"), // Normal state
      queue.getResult("btn_submenu_02")  // Hover / Click state
    ],
    frames: { width: 268, height: 305 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });

  // Create the Sprite
  btnSubmenu = new createjs.Sprite(btnSubmenuSpriteSheet, "normal");
  btnSubmenu.mouseEnabled = true;
  btnSubmenu.mouseChildren = true;
  btnSubmenu.cursor = "pointer";
  btnSubmenu.y = canvas.height * 0.02;
  btnSubmenu.x = canvas.width * .85;
  btnSubmenu.scale = isMobile.value ? .32 * dpr : .38 * dpr;// Apply scaling

  // Add event listeners for hover and click
  btnSubmenu.on("mouseover", () => {
    btnSubmenu.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_submenu");
    }
  });
  btnSubmenu.on("mouseout", () => {
    btnSubmenu.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnSubmenu.on("click", () => {
    btnSubmenu.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }

    //navigate to the abjad page
    router.push({name: 'LamanAbjad'});
  });


  let btnBantuanSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_bantuan_01"), // Normal state
      queue.getResult("btn_bantuan_02")  // Hover / Click state
    ],
    frames: { width: 268, height: 303 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });

  // Create the Sprite
  btnBantuan = new createjs.Sprite(btnBantuanSpriteSheet, "normal");
  btnBantuan.mouseEnabled = true;
  btnBantuan.mouseChildren = true;
  btnBantuan.cursor = "pointer";
  btnBantuan.y = 20;
  btnBantuan.x = canvas.width - 240;
  btnBantuan.scale = .38; // Apply scaling

  // Add event listeners for hover and click
  btnBantuan.on("mouseover", () => {
    btnBantuan.gotoAndStop("hover");
    // Prevent overlapping sounds
    if (!playingSound || playingSound.playState === createjs.Sound.PLAY_FINISHED) {
      playingSound = createjs.Sound.play("sound_bantuan");
    }
  });
  btnBantuan.on("mouseout", () => {
    btnBantuan.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  btnBantuan.on("click", () => {
    btnBantuan.gotoAndStop("hover");
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
    //navigate to the abjad page
    router.push({name: 'LamanUtama'});
  });
  // stage.addChild(btnBantuan);


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
  // stage.addChild(btnKeluar);


  btnArahan= new createjs.Bitmap(queue.getResult("btn_arahan"));
  // Position it centered horizontally and slightly above the bottom
  btnArahan.y = canvas.height * .2;
  btnArahan.x = isMobile.value ? canvas.width * .85 :canvas.width * 0.90;
  btnArahan.cursor = "pointer";
  // Scale it properly
  btnArahan.scaleX = btnArahan.scaleY = isMobile.value ? .30 * dpr:  0.35 * dpr;
  btnArahan.on("click", () => {
    playSound("sound_klik_gambar");
  });
  stage.addChild(btnArahan); // Green background on top


  let btnNextSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_next_01"), // Normal state
      queue.getResult("btn_next_02")  // Hover / Click state
    ],
    frames: { width: 219, height: 216 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });
  // Create the Sprite
  btnNext = new createjs.Sprite(btnNextSpriteSheet, "normal");
  btnNext.mouseEnabled = true;
  btnNext.mouseChildren = true;
  btnNext.cursor = "pointer";
  btnNext.y = canvas.height * .85;
  btnNext.x = isMobile.value ? canvas.width * .55 :canvas.width * .9;
  btnNext.scale = .4 * dpr; // Apply scaling
  // Add event listeners for hover and click
  btnNext.on("mouseover", () => {
    btnNext.gotoAndStop("hover");
  });
  btnNext.on("mouseout", () => {
    btnNext.gotoAndStop("normal");
  });
  btnNext.on("click", () => {
    btnNext.gotoAndStop("hover");
    setTimeout(() => {
      btnNext.gotoAndStop("normal");
    }, 200);
    navigateToAnotherPage("next");
  });

  stage.addChild(btnNext);
  stage.addChild(btnSubmenu);//required because the button will be covered the letter



  let btnPreviousSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_previous_01"), // Normal state
      queue.getResult("btn_previous_02")  // Hover / Click state
    ],
    frames: { width: 230, height: 216 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });
  // Create the Sprite
  btnPrevious = new createjs.Sprite(btnPreviousSpriteSheet, "normal");
  btnPrevious.mouseEnabled = true;
  btnPrevious.mouseChildren = true;
  btnPrevious.cursor = "pointer";
  btnPrevious.y = canvas.height * .85;
  btnPrevious.x = isMobile.value ? canvas.width * .35 :canvas.width * .8;
  btnPrevious.scale = .4* dpr; // Apply scaling
  // Add event listeners for hover and click
  btnPrevious.on("mouseover", () => {
    btnPrevious.gotoAndStop("hover");
  });
  btnPrevious.on("mouseout", () => {
    btnPrevious.gotoAndStop("normal");
  });
  btnPrevious.on("click", () => {
    btnPrevious.gotoAndStop("hover");
    setTimeout(() => {
      btnPrevious.gotoAndStop("normal");
    }, 200);
    navigateToAnotherPage("previous");
  });
  stage.addChild(btnPrevious);


  loadAssets(konsonans[currentPage-1].letter, konsonans[currentPage-1].word,konsonans[currentPage-1].width, konsonans[currentPage-1].height);
}
function loadAssets(letter, word, width, height){
  /*
  * load the image and text based on the vokal
  * */
  let btnLetterSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult(`btn_${letter}_01`), // Normal state
      queue.getResult(`btn_${letter}_02`)  // Hover / Click state
    ],
    frames: { width: width, height: height }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });

  // Create the Sprite
  displayedImage = new createjs.Sprite(btnLetterSpriteSheet, "normal");
  displayedImage.mouseEnabled = true;
  displayedImage.mouseChildren = true;
  displayedImage.cursor = "pointer";
  displayedImage.regX = width / 2;
  displayedImage.regY = height / 2;
  displayedImage.x = canvas.width * .5;
  displayedImage.y = isMobile.value ? canvas.height * .5 : canvas.height * .55 ;
  displayedImage.scale = isMobile.value ?  .2 * dpr :.25 * dpr;

  // Add event listeners for hover and click
  displayedImage.on("mouseover", () => {
    displayedImage.gotoAndStop("hover");
    playSound(`sound_${letter}`);
  });
  displayedImage.on("mouseout", () => {
    displayedImage.gotoAndStop("normal");
    //Stop the sound when mouse leaves
    if (playingSound) {
      playingSound.stop();
      playingSound = null;
    }
  });
  displayedImage.on("click", () => {
    displayedImage.gotoAndStop("hover");
    playSound(`sound_${word}`);
    displayImageTextOnTv(letter);
  });
  stage.addChild(displayedImage);

}
function displayImageTextOnTv(letter){
  /*
  * display text and image related to the word clicked on tv screen
  * */
  hideDisplayText();

  displayedText  = new createjs.Bitmap(queue.getResult(`text_${letter}`));
  displayedText.regX = displayedText.image.width / 2;
  displayedText.regY = displayedText.image.height / 2;
  displayedText.x = canvas.width  * .53;
  displayedText.y = isMobile.value ?  canvas.height * .71: canvas.height  *  .83;
  displayedText.alpha = 0; // Initially hidden
  displayedText.scale =  isMobile.value ? .35 * dpr: .4* dpr;
  stage.addChild(displayedText);

  // Apply fade-in animation (0 to 1 alpha in 1 second)
  createjs.Tween.get(displayedText).to({ alpha: 1 }, 300, createjs.Ease.quadIn);
}
function hideDisplayText(){
  if(displayedText){
    stage.removeChild(displayedText);
    displayedText= null;
  }
}
function hideDisplayImage(){
  if(displayedImage){
    stage.removeChild(displayedImage);
    displayedImage = null;
  }
}
function navigateToAnotherPage(direction){
  /*
  * to handle page navigation when clicking on next or previous button
  * */
  if(direction === "next"){
    if(currentPage >= 1 && currentPage < konsonans.length){
      hideDisplayText();
      hideDisplayImage();
      currentPage++;
      loadAssets(konsonans[currentPage-1].letter, konsonans[currentPage-1].word,konsonans[currentPage-1].width, konsonans[currentPage-1].height);
    }
    else if(currentPage === konsonans.length){
      navigateToAnotherSubmenu();
    }
  }else if(direction === "previous"){
    if(currentPage > 1 && currentPage <= konsonans.length){
      hideDisplayText();
      hideDisplayImage();
      currentPage--;
      loadAssets(konsonans[currentPage-1].letter, konsonans[currentPage-1].word,konsonans[currentPage-1].width, konsonans[currentPage-1].height);
    }
    else if(currentPage === 1){
      router.push({name: 'AbjadKonsonan'});
    }
  }
}
function playSound(sound){
  if (playingSound) {
    playingSound.stop();
    playingSound = null;
  }
  playingSound = createjs.Sound.play(sound);
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
function navigateToAnotherSubmenu(){
  playSound("sound_ingin_teruskan");
  showModalContinue.value = true;
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
    <ModalContinue @hide="showModalContinue = false;" v-if="showModalContinue"></ModalContinue>
  </Transition>

  <Loader v-if="isLoading"></Loader>
</template>

<style scoped>


</style>
