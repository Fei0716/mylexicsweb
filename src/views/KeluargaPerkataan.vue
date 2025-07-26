<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';
import router from '../router.js';
import ModalContinue from "../components/ModalContinue.vue";
import Loader from "../components/Loader.vue";
// States
let canvas;
let stage;
let queue;
let playingSound = null;
let playingAnimation = null;
let displayedButtons = [];
let displayedWordButtons = [];
let displayedText = null;
let displayedWordImage = null;

let showModalContinue = ref(false);
let isLoading = ref(true);
let isMobile = computed(()=>{
  return  window.innerWidth < 1000 && window.innerWidth < window.innerHeight;
});
let targetWidth = isMobile.value ? 675: 1000;
let targetHeight = isMobile.value ? 800 : 675;
const dpr = window.devicePixelRatio || 1;
// const dpr = 1.25;
// objects
let backgroundImg;
let title;
let btnHome;
let btnKeluar;
let btnSubmenu;
let btnBantuan;
let btnArahan;
let btnNext;
let btnPrevious = null;

let keluargaPerkataan = [
  //first item
  {
    word: "buka",
    x: isMobile.value ? .1 : .1 ,
    y: isMobile.value ? .25 : .25,
  },
  {
    word: "kaku",
    x: isMobile.value ? .25 : .25,
    y: isMobile.value ? 25 : .25,
  },
  {
    word: "batik",
    x: isMobile.value ? .4 : .4 ,
    y: isMobile.value ? 25 : .25,
  },
  {
    word: "batuk",
    x: isMobile.value ? .55 : .55,
    y: isMobile.value ? 25 : .25,
  },
  {
    word: "dakap",
    x: isMobile.value ? .7 : .7 ,
    y: isMobile.value ? 25 : .25,
  },
  {
    word: "parut",
    x: isMobile.value ? .1 : .1 ,
    y: isMobile.value ? .5 : .5,
  },
  {
    word: "berus",
    x: isMobile.value ? .25 : .25 ,
    y: isMobile.value ? .5 : .5,
  },
  {
    word: "kesan",
    x: isMobile.value ? .4 : .4 ,
    y: isMobile.value ? .5 : .5,
  },
  {
    word: "canda",
    x: isMobile.value ? .55 : .55 ,
    y: isMobile.value ?.5 : .5,
  },
  {
    word: "laksa",
    x: isMobile.value ? .7 : .7 ,
    y: isMobile.value ?.5 : .5,
  },
  {
    word: "sampah",
    x: isMobile.value ? .1 : .1 ,
    y: isMobile.value ? .75 : .75,
  },
  {
    word: "balung",
    x: isMobile.value ? .25: .25 ,
    y: isMobile.value ?  .75 : .75,
  },
  {
    word: "lotong",
    x: isMobile.value ? .4 : .4 ,
    y: isMobile.value ?  .75 : .75,
  },
  {
    word: "gelama",
    x: isMobile.value ? .55 : .55 ,
    y: isMobile.value ?  .75 : .75,
  },
  {
    word: "meradang",
    x: isMobile.value ? .68 :  .68 ,
    y: isMobile.value ?  .75 : .75,
  },
]
// generate assets from the array above
const generateAssets = (arr) => {
  let assets = []
  arr.forEach((page)=> {
    //add the word buttons
    assets.push({ id: `btn_${page.word}_01`, src: `/images/perkataan/keluarga_perkataan/btn_${page.word}0001.png` });
    assets.push({ id: `btn_${page.word}_02`, src: `/images/perkataan/keluarga_perkataan/btn_${page.word}0002.png` });
  });
  return assets;
}
const assetsArr = generateAssets(keluargaPerkataan);
const generalAssetsArr = [
  //   images
  {id: "background", src: "/images/perkataan/keluarga_perkataan/background.png"},
  {id: "title", src: "/images/perkataan/keluarga_perkataan/title_keluarga_perkataan.png"},

  {id: "btn_home_01", src: "/images/btn_home_01.png"},
  {id: "btn_home_02", src: "/images/btn_home_02.png"},
  {id: "btn_bantuan_01", src: "/images/btn_bantuan_01.png"},
  {id: "btn_bantuan_02", src: "/images/btn_bantuan_02.png"},
  {id: "btn_arahan", src: "/images/btn_arahan.png"},
  {id: "btn_keluar_01", src: "/images/btn_keluar_01.png"},
  {id: "btn_keluar_02", src: "/images/btn_keluar_02.png"},
  {id: "btn_submenu_01", src: "/images/perkataan/btn_submenu0001.png"},
  {id: "btn_submenu_02", src: "/images/perkataan/btn_submenu0002.png"},

  //  sounds
  {id: "sound_laman_utama", src: "/sounds/laman_utama.mp3"},
  {id: "sound_keluar", src: "/sounds/keluar.mp3"},
  {id: "sound_submenu", src: "/sounds/submenu.mp3"},
  {id: "sound_bantuan", src: "/sounds/bantuan.mp3"},
  {id: "sound_arahan", src: "/sounds/perkataan/keluarga_perkataan/arahan1.mp3"},
  {id: "sound_ingin_teruskan", src: "/sounds/ingin_teruskan.mp3"},
]

const mergedAssetsArr = [...generalAssetsArr , ...assetsArr];

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

  queue = new createjs.LoadQueue(false);
  queue.setMaxConnections(10);
  queue.installPlugin(createjs.Sound);
  queue.on("complete", handleComplete);
  // queue.on("fileload", (event) => {
  //   console.log("✅ Loaded:", event.item.id);
  // });
  //
  // queue.on("error", (event) => {
  //   console.error("❌ Failed to load:", event.data ? event.data.src : "Unknown");
  // });
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
  backgroundImg= new createjs.Bitmap(queue.getResult("background"));
  // Set registration point to center (better for positioning)
  backgroundImg.regX = backgroundImg.image.width / 2;
  backgroundImg.regY = backgroundImg.image.height / 2;
  // Position it centered horizontally and slightly above the bottom
  backgroundImg.x = canvas.width / 2;
  backgroundImg.y = canvas.height * .45 ; // Adjust this value if needed
  // Scale it properly
  backgroundImg.scaleX = backgroundImg.scaleY = isMobile.value ? 0.46 * dpr :0.4 * dpr;
  stage.addChild(backgroundImg); // Green background on top

  title = new createjs.Bitmap(queue.getResult("title"));
  title.regX = title.image.width / 2;
  title.x = canvas.width / 2;
  title.y = canvas.height * .01;
  title.scale = isMobile.value ? .3 * dpr: .35 * dpr;
  stage.addChild(title);


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
  btnHome.y = canvas.height * 0.015;
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
    frames: { width: 268, height: 306 }, // Adjust size as needed
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
    router.push({name: 'LamanPerkataan'});
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
  btnArahan.y = canvas.height * .18;
  btnArahan.x = isMobile.value ? canvas.width * .85 :canvas.width * 0.90;
  btnArahan.cursor = "pointer";
  // Scale it properly
  btnArahan.scaleX = btnArahan.scaleY = isMobile.value ? .30 * dpr:  0.35 * dpr;
  btnArahan.on("click", () => {
    playSound("sound_arahan");
  });
  stage.addChild(btnArahan); // Green background on top
  stage.addChild(btnSubmenu);//required because the button will be covered the letter
  initButtons();
}
function initButtons(){
/*
*   initialize the image buttons
* */
  for(let i= 0; i < keluargaPerkataan.length;i++){
    let btnSpriteSheet = new createjs.SpriteSheet({
      images: [
        queue.getResult(`btn_${keluargaPerkataan[i].word}_01`), // Normal state
        queue.getResult(`btn_${keluargaPerkataan[i].word}_02`), // Hover state
      ],
      frames: { width: queue.getResult(`btn_${keluargaPerkataan[i].word}_01`).width, height: queue.getResult(`btn_${keluargaPerkataan[i].word}_01`).height},
      animations: {
        normal: 0,
        hover: 1,
        // click: 2,
      }
    });
    // Create the Sprite
    let btn = new createjs.Sprite(btnSpriteSheet, "normal");
    btn.mouseEnabled = true;
    btn.mouseChildren = true;
    btn.cursor = "pointer";
    btn.x = canvas.width * keluargaPerkataan[i].x ;
    btn.y = canvas.height * keluargaPerkataan[i].y ;
    btn.scale = isMobile.value ? .3 * dpr  :  .35 * dpr;

    // === Custom hit area ===
    let hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(0, 0, queue.getResult(`btn_${keluargaPerkataan[i].word}_01`).width, queue.getResult(`btn_${keluargaPerkataan[i].word}_01`).height);
    hit.alpha = 0.01;
    btn.hitArea = hit;

    // Required: set bounds so CreateJS knows the hit area size
    btn.setBounds(0, 0,queue.getResult(`btn_${keluargaPerkataan[i].word}_01`).width, queue.getResult(`btn_${keluargaPerkataan[i].word}_01`).height);

    // Add event listeners for hover and click
    btn.on("mouseover", () => {
      btn.gotoAndStop("hover");
    });
    btn.on("mouseout", () => {
      btn.gotoAndStop("normal");
    });
    btn.on("click", () => {
      btn.gotoAndStop("click");
      setTimeout(() => {
        btn.gotoAndStop("normal");
      }, 200);
      navigateToAnotherPage(`${keluargaPerkataan[i].word}`);
    });
    stage.addChild(btn);
    displayedButtons.push(btn);
  }
}

function navigateToAnotherPage(word){
  /*
  * to handle page navigation
  * */
  router.push({name: "KeluargaPerkataanGroup", params: {group: word}});//pass the word and switch to that page

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
