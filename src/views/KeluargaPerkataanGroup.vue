<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';
import router from '../router.js';
import ModalContinue from "../components/ModalContinue.vue";
import Loader from "../components/Loader.vue";
import {useRoute} from "vue-router";
// States
let canvas;
let stage;
let queue;
let playingSound = null;
let playingAnimation = null;
let displayedTextButtons = [];
let displayedText = null;
let displayedWordImage = null;
let displayedNumber = null;
let displayedPen = null;
let showModalContinue = ref(false);
let isLoading = ref(true);
let isMobile = computed(()=>{
  return  window.innerWidth < 1000 && window.innerWidth < window.innerHeight;
});
let targetWidth = isMobile.value ? 675: 1000;
let targetHeight = isMobile.value ? 800 : 675;
// const dpr = window.devicePixelRatio || 1;
const dpr = 1.25;
// objects
let backgroundImg;
let title;
let camera;
let btnUp = null;
let btnDown = null;
let font = isMobile.value ? "60px MyLexics" :  "70px MyLexics";

let btnHome;
let btnKeluar;
let btnSubmenu;
let btnBantuan;
let btnArahan;
let btnNext;
let btnPrevious = null;

let keluargaPerkataan = [
    //first page
    [
        //first word
      {
        word: "buka",
      },
      {
        word: "cuka",
      },
      {
        word: "duka",
      },
      {
        word: "luka",
      },
      {
        word: "muka",
      },
      {
        word: "suka",
      },
    ],
    //subsequent page
    [
      {
        word: "kaku",
      },
      {
        word: "paku",
      },
      {
        word: "saku",
      },
      {
        word: "beku",
      },
      {
        word: "buku",
      },
      {
        word: "duku",
      },
      {
        word: "kuku",
      },
      {
        word: "liku",
      },
    ],
    [
      {
        word: "batik",
      },
      {
        word: "katik",
      },
      {
        word: "betik",
      },
      {
        word: "detik",
      },
      {
        word: "petik",
      },
    ],
    [
      {
        word: "batuk",
      },
      {
        word: "catuk",
        hasAnimation: true,
        frames:[[0,0,231,133,0,80.55,48.8],[231,0,231,135,0,80.55,50.8],[462,0,231,135,0,80.55,50.8],[693,0,231,133,0,80.55,48.8],[0,135,231,130,0,80.55,45.8],[231,135,231,130,0,80.55,45.8],[462,135,231,133,0,80.55,48.8],[693,135,231,135,0,80.55,50.8],[0,270,231,135,0,80.55,50.8],[231,270,231,133,0,80.55,48.8]]
      },
      {
        word: "datuk",
      },
      {
        word: "patuk",
      },
      {
        word: "cucuk",
        hasAnimation: true,
        frames:[[0,0,180,174,0,62.3,74.7],[180,0,176,174,0,58.3,74.7],[356,0,172,174,0,54.3,74.7],[528,0,168,174,0,50.3,74.7],[696,0,164,174,0,46.3,74.7],[860,0,160,174,0,42.3,74.7],[0,174,155,174,0,37.3,74.7],[155,174,151,174,0,33.3,74.7],[155,174,151,174,0,33.3,74.7],[155,174,151,174,0,33.3,74.7],[155,174,151,174,0,33.3,74.7],[306,174,179,186,0,33.3,86.7],[306,174,179,186,0,33.3,86.7],[485,174,187,193,0,41.3,90.7],[485,174,187,193,0,41.3,90.7],[672,174,180,114,0,48.3,8.700000000000003],[0,367,194,114,0,62.3,8.700000000000003]]
      },
      {
        word: "pucuk",
      },
      {
        word: "tusuk",
      },
    ],
    [
      {
        word: "dakap",
      },
      {
        word: "dapat",
      },
      {
        word: "lekat",
      },
      {
        word: "lepat",
      },
      {
        word: "lipat",
        hasAnimation: true,
        frames:[[0,0,155,113,0,0.7999999999999972,-5.700000000000003],[155,0,155,114,0,0.7999999999999972,-4.700000000000003],[310,0,185,116,0,0.7999999999999972,-2.700000000000003],[495,0,155,118,0,0.7999999999999972,-0.7000000000000028],[650,0,185,120,0,0.7999999999999972,1.2999999999999972],[835,0,155,122,0,0.7999999999999972,3.299999999999997],[990,0,185,124,0,0.7999999999999972,5.299999999999997],[1175,0,153,125,0,0.7999999999999972,6.299999999999997],[1328,0,185,127,0,0.7999999999999972,8.299999999999997],[1513,0,151,129,0,0.7999999999999972,10.299999999999997],[1664,0,185,130,0,0.7999999999999972,11.299999999999997],[1849,0,149,132,0,0.7999999999999972,13.299999999999997],[0,132,185,135,0,0.7999999999999972,16.299999999999997],[185,132,185,137,0,0.7999999999999972,18.299999999999997],[370,132,185,140,0,0.7999999999999972,21.299999999999997],[555,132,185,142,0,0.7999999999999972,23.299999999999997],[740,132,218,144,0,33.8,25.299999999999997],[958,132,185,147,0,0.7999999999999972,28.299999999999997],[1143,132,218,149,0,33.8,30.299999999999997],[1361,132,185,151,0,0.7999999999999972,32.3],[1546,132,218,152,0,33.8,34.3],[1764,132,185,151,0,0.7999999999999972,35.3],[0,284,218,147,0,33.8,32.3],[218,284,185,142,0,0.7999999999999972,28.299999999999997],[403,284,218,139,0,33.8,25.299999999999997],[621,284,185,135,0,0.7999999999999972,21.299999999999997],[806,284,218,131,0,33.8,17.299999999999997],[1024,284,185,127,0,0.7999999999999972,13.299999999999997],[1209,284,218,123,0,33.8,9.299999999999997],[1427,284,184,119,0,-0.20000000000000284,5.299999999999997],[1611,284,218,114,0,33.8,1.2999999999999972],[1829,284,218,110,0,33.8,-2.700000000000003],[0,431,218,109,0,33.8,-3.700000000000003],[218,431,218,110,0,33.8,-2.700000000000003],[436,431,218,111,0,33.8,-1.7000000000000028],[654,431,218,112,0,33.8,-0.7000000000000028],[872,431,218,113,0,33.8,0.29999999999999716],[1090,431,218,114,0,33.8,1.2999999999999972],[1308,431,218,115,0,33.8,2.299999999999997],[1526,431,173,115,0,-11.200000000000003,3.299999999999997],[1699,431,141,116,0,33.8,4.299999999999997],[1840,431,172,116,0,-12.200000000000003,4.299999999999997],[1699,431,141,116,0,33.8,4.299999999999997],[1840,431,172,116,0,-12.200000000000003,4.299999999999997],[1699,431,141,116,0,33.8,4.299999999999997],[1840,431,172,116,0,-12.200000000000003,4.299999999999997],[0,547,218,116,0,33.8,4.299999999999997],[0,547,218,116,0,33.8,4.299999999999997],[0,547,218,116,0,33.8,4.299999999999997],[0,547,218,116,0,33.8,4.299999999999997]]
      },
      {
        word: "lumut",
      },
      {
        word: "luput",
      },
    ],
    [
      {
        word: "parut",
      },
      {
        word: "perut",
      },
      {
        word: "kerut",
      },
      {
        word: "lutut",
      },
      {
        word: "pulut",
      },
      {
        word: "susut",
      },
    ],
    [
      {
        word: "berus",
      },
      {
        word: "rebus",
      },
      {
        word: "terus",
      },
      {
        word: "kurus",
      },
      {
        word: "lurus",
      },
    ],
    [
      {
        word: "kesan",
      },
      {
        word: "pesan",
      },
    ],
    [
      {
        word: "canda",
      },
      {
        word: "tanda",
      },
      {
        word: "denda",
      },
      {
        word: "renda",
      },
      {
        word: "bonda",
      },
      {
        word: "ronda",
      },
      {
        word: "tunda",
      },
    ],
    [
      {
        word: "laksa",
      },
      {
        word: "paksa",
      },
      {
        word: "raksa",
      },
    ],
    [
      {
        word: "sampah",
      },
      {
        word: "rempah",
      },
      {
        word: "rendah",
      },
      {
        word: "pindah",
      },
    ],
    [
      {
        word: "balung",
      },
      {
        word: "palung",
      },
      {
        word: "gelung",
      },
      {
        word: "relung",
      },
      {
        word: "gulung",
      },
      {
        word: "sulung",
      },
      {
        word: "menung",
      },
    ],
    [
      {
        word: "lotong",
      },
      {
        word: "potong",
      },
      {
        word: "sotong",
      },
    ],
    [
      {
        word: "gelama",
      },
      {
        word: "celana",
      },
      {
        word: "kelana",
      },
      {
        word: "pelana",
      },
      {
        word: "delima",
      },
      {
        word: "terima",
      },
    ],
    [
      {
        word: "meradang",
      },
      {
        word: "peladang",
      },
      {
        word: "seladang",
      },
    ],
]
let currentPage = 1;//by default when there are no param(group), will just stay at the value of 1
if(useRoute().params?.group){
  //find the index of the page
  keluargaPerkataan.forEach((page,index)=>{
    if(useRoute().params.group === page[0].word){
      currentPage = index + 1;//store the current page's index
    }
  });
}
let currentWord = 0;//showing none of the words
// generate assets from the array above
const generateAssets = (arr) => {
  let assets = []
  arr.forEach((page)=>{
    page.forEach((x) =>{
      let word = x.word;

      //add texts
      assets.push({ id: `text_${word}`, src:`/images/perkataan/keluarga_perkataan/${page[0].word}/text_${word}.png` });

      //add the images
      assets.push({ id: `${word}`, src:`/images/perkataan/keluarga_perkataan/${page[0].word}/${word}.png` });

      //add the sounds
      assets.push({ id: `sound_${word}`, src:`/sounds/perkataan/keluarga_perkataan/${word}.mp3` });

    })
  });
  //add the numbers
  for(let i = 1;i <= 8; i++){
    assets.push({ id: `${i}`, src:`/images/perkataan/keluarga_perkataan/${i}.png` });
  }
  return assets;
}
const assetsArr = generateAssets(keluargaPerkataan);
const generalAssetsArr = [
  //   images
  {id: "background", src: "/images/perkataan/keluarga_perkataan/background.png"},
  {id: "title", src: "/images/perkataan/keluarga_perkataan/title_keluarga_perkataan.png"},
  {id: "camera", src: "/images/perkataan/keluarga_perkataan/camera.png"},
  {id: "pen", src: "/images/perkataan/keluarga_perkataan/pen.png"},

  {id: "btn_home_01", src: "/images/btn_home_01.png"},
  {id: "btn_home_02", src: "/images/btn_home_02.png"},
  {id: "btn_bantuan_01", src: "/images/btn_bantuan_01.png"},
  {id: "btn_bantuan_02", src: "/images/btn_bantuan_02.png"},
  {id: "btn_arahan", src: "/images/btn_arahan.png"},
  {id: "btn_keluar_01", src: "/images/btn_keluar_01.png"},
  {id: "btn_keluar_02", src: "/images/btn_keluar_02.png"},
  {id: "btn_submenu_01", src: "/images/perkataan/keluarga_perkataan/btn_sub2_menu0001.png"},
  {id: "btn_submenu_02", src: "/images/perkataan/keluarga_perkataan/btn_sub2_menu0002.png"},
  {id: "btn_next_01", src: "/images/btn_next_01.png"},
  {id: "btn_next_02", src: "/images/btn_next_02.png"},
  {id: "btn_previous_01", src: "/images/btn_previous_01.png"},
  {id: "btn_previous_02", src: "/images/btn_previous_02.png"},
  {id: "btn_up_01", src: "/images/perkataan/keluarga_perkataan/btn_up0001.png"},
  {id: "btn_up_02", src: "/images/perkataan/keluarga_perkataan/btn_up0002.png"},
  {id: "btn_down_01", src: "/images/perkataan/keluarga_perkataan/btn_down0001.png"},
  {id: "btn_down_02", src: "/images/perkataan/keluarga_perkataan/btn_down0002.png"},

  //  sounds
  {id: "sound_laman_utama", src: "/sounds/laman_utama.mp3"},
  {id: "sound_keluar", src: "/sounds/keluar.mp3"},
  {id: "sound_submenu", src: "/sounds/submenu.mp3"},
  {id: "sound_bantuan", src: "/sounds/bantuan.mp3"},
  {id: "sound_arahan", src: "/sounds/perkataan/keluarga_perkataan/arahan2.mp3"},
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
  // Set the max time to "catch up" to 50ms (0.05 seconds)
  // This prevents a massive update if the tab is backgrounded
  createjs.Ticker.maxDelta = 50;

  queue = new createjs.LoadQueue(false);
  queue.setMaxConnections(10);
  queue.installPlugin(createjs.Sound);
  // queue.on("complete", handleComplete);
  // queue.on("fileload", (event) => {
  //   console.log("✅ Loaded:", event.item.id);
  // });
  //
  // queue.on("error", (event) => {
  //   console.error("❌ Failed to load:", event.data ? event.data.src : "Unknown");
  // });
  // queue.loadManifest(mergedAssetsArr);

  // Start batched loading instead of loading all at once
  loadAssetsInBatches(mergedAssetsArr, 50); // Load 50 assets per batch
}
function loadAssetsInBatches(assets, batchSize = 50) {
  /*
  * batch loading
  * */
  const batches = [];
  let loadedAssetCount = 0;
  const totalAssets = assets.length;

  // Split assets into batches
  for (let i = 0; i < assets.length; i += batchSize) {
    batches.push(assets.slice(i, i + batchSize));
  }

  let currentBatch = 0;

  function loadNextBatch() {
    if (currentBatch >= batches.length) {
      handleComplete(); // Call your original complete handler
      return;
    }

    const batch = batches[currentBatch];

    // Remove any existing listeners to avoid conflicts
    queue.removeAllEventListeners("fileload");
    queue.removeAllEventListeners("complete");
    queue.removeAllEventListeners("error");

    // Track progress for this batch
    queue.on("fileload", (event) => {
      loadedAssetCount++;
      const progress = Math.round((loadedAssetCount / totalAssets) * 100);
    });

    queue.on("complete", () => {
      currentBatch++;

      // Small delay between batches to prevent overwhelming the browser
      setTimeout(() => {
        loadNextBatch();
      }, 100);
    });

    queue.on("error", (event) => {
      console.error(`Error loading asset in batch ${currentBatch + 1}:`, event.data);
    });

    queue.loadManifest(batch);
  }

  // Start loading the first batch
  loadNextBatch();
}
function handleComplete() {
  isLoading.value = false;
  loadScene();
  // createjs.Ticker.timingMode = createjs.Ticker.RAF;
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

  //add the camera
  camera = new createjs.Bitmap(queue.getResult("camera"));
  camera.regX = camera.image.width / 2;
  camera.x = isMobile.value ?  canvas.width * .5: canvas.width * .5;
  camera.y = isMobile.value ? canvas.height * .3  :canvas.height * .2;
  camera.scale = isMobile.value ? .3 * dpr: .35 * dpr;
  stage.addChild(camera);


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
    frames: { width: 254, height: 291 }, // Adjust size as needed
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
    router.push({name: 'KeluargaPerkataan'});
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
  btnPrevious.x = isMobile.value ? canvas.width * .3 :canvas.width * .8;
  btnPrevious.scale = .4 * dpr; // Apply scaling
  //hide the previous button initially
  if(currentPage === 1)
    btnPrevious.visible = false;
  // Add event listeners for hover and click
  btnPrevious.on("mouseover", () => {
    btnPrevious.gotoAndStop("hover");
  });
  btnPrevious.on("mouseout", () => {
    btnPrevious?.gotoAndStop("normal");
  });
  btnPrevious.on("click", () => {
    btnPrevious.gotoAndStop("hover");
    setTimeout(() => {
      btnPrevious?.gotoAndStop("normal");
    }, 200);
    navigateToAnotherPage("previous");
  });
  stage.addChild(btnPrevious);


  //add the down button
  let btnDownSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_down_01"), // Normal state
      queue.getResult("btn_down_02")  // Hover / Click state
    ],
    frames: { width: queue.getResult("btn_down_01").width, height: queue.getResult("btn_down_01").height }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });
  // Create the Sprite
  btnDown = new createjs.Sprite(btnDownSpriteSheet, "normal");
  btnDown.mouseEnabled = true;
  btnDown.mouseChildren = true;
  btnDown.cursor = "pointer";
  btnDown.x = isMobile.value ? canvas.width * .91 :canvas.width * .82;
  btnDown.y = isMobile.value ?   canvas.height * .6: canvas.height * .6;
  btnDown.scale = isMobile.value ? .3 * dpr :  .35 * dpr; // Apply scaling
  // === Custom hit area ===
  let hit = new createjs.Shape();
  hit.graphics.beginFill("#000").drawRect(0, 0, queue.getResult("btn_down_01").width, queue.getResult("btn_down_01").height);
  hit.alpha = 0.01;
  btnDown.hitArea = hit;

  // Required: set bounds so CreateJS knows the hit area size
  btnDown.setBounds(0, 0, queue.getResult("btn_down_01").width, queue.getResult("btn_down_01").height);
  // Add event listeners for hover and click
  btnDown.on("mouseover", () => {
    btnDown.gotoAndStop("hover");
  });
  btnDown.on("mouseout", () => {
    btnDown.gotoAndStop("normal");
  });
  btnDown.on("click", () => {
    btnDown.gotoAndStop("hover");
    setTimeout(() => {
      btnDown.gotoAndStop("normal");
    }, 200);
    navigateToAnotherLetter("down");
  });
  stage.addChild(btnDown);


  let btnUpSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_up_01"), // Normal state
      queue.getResult("btn_up_02")  // Hover / Click state
    ],
    frames: { width: queue.getResult("btn_up_01").width, height: queue.getResult("btn_up_01").height }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });
  btnUp = new createjs.Sprite(btnUpSpriteSheet, "normal");
  btnUp.mouseEnabled = true;
  btnUp.mouseChildren = true;
  btnUp.cursor = "pointer";
  btnUp.x =  isMobile.value ? canvas.width * .91 :canvas.width * .82;
  btnUp.y = isMobile.value ?   canvas.height * .52: canvas.height * .5;
  btnUp.scale = isMobile.value ? .3 * dpr :  .35 * dpr; // Apply scaling
  //hide the up button initially
  btnUp.visible = false;

  // === Custom hit area ===
  hit = new createjs.Shape();
  hit.graphics.beginFill("#000").drawRect(0, 0, queue.getResult("btn_up_01").width, queue.getResult("btn_up_01").height);
  hit.alpha = 0.01;
  btnUp.hitArea = hit;

  // Required: set bounds so CreateJS knows the hit area size
  btnUp.setBounds(0, 0, queue.getResult("btn_up_01").width, queue.getResult("btn_up_01").height);
  // Add event listeners for hover and click
  btnUp.on("mouseover", () => {
    btnUp.gotoAndStop("hover");
  });
  btnUp.on("mouseout", () => {
    btnUp.gotoAndStop("normal");
  });
  btnUp.on("click", () => {
    btnUp.gotoAndStop("hover");
    setTimeout(() => {
      btnUp.gotoAndStop("normal");
    }, 200);

    navigateToAnotherLetter("up");
  });
  stage.addChild(btnUp);


  document.fonts.load(font).then(() => {
    initTextButtons(); // Wait until the font finished loading to prevent the subsequent operation taking the default font's width
  });
}
function initTextButtons(){
  /*
  * initialize the text buttons at the side of the camera
  * */
  let words = keluargaPerkataan[currentPage - 1];
  let deltaY = 0 ;
  for (let i = 0; i < words.length; i++) {
    let text = new createjs.Text(`${i + 1}. ${words[i].word}`, font, "#000");
    text.x = isMobile.value ? canvas.width * .02 : canvas.width * .13;
    text.y = (isMobile.value ? canvas.height * .34 : canvas.height * .25) + deltaY;

    // Create a container to hold the text
    let button = new createjs.Container();
    button.addChild(text);
    // Set the bounds after the text is added
    button.setBounds(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());

    // === Custom hit area ===
    // Create an invisible hit area (matching the button's size and positioning)
    let hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
    hit.alpha = 0.01;

    // Set the hit area relative to the button's position
    hit.x = text.x;
    hit.y = text.y;

    button.hitArea = hit;
    button.alpha = .5;
    // Add interactivity (mouseover, click, etc.)
    button.cursor = "pointer"; // Change cursor to pointer when hovered
    button.on("click", () => {
      if(currentWord >= 1){
        displayedTextButtons[currentWord - 1].alpha = .5;//reset the previous selected text button's opacity
      }
      button.alpha = 1;
      currentWord = i+1;
      displayPen(button);
      displayTextImage(i+1 , words[i].word);
      //check whether reach the last word and remove the previous if it is
      if(currentWord >= keluargaPerkataan[currentPage - 1 ].length){
        btnDown.visible = false;
      }else if(currentWord <= 1) {
        btnUp.visible = false;
      }else{
        //show the hidden btnUp
        if(!btnUp.visible)
          btnUp.visible = true;
        //show the hidden btnDown
        if(!btnDown.visible)
          btnDown.visible = true;
      }
    });

    // Add the button to the stage
    stage.addChild(button);
    displayedTextButtons.push(button);

    // Increment deltaY for the next button's position
    deltaY += isMobile.value ? 50 : 60;
  }
}
function displayTextImage(no, word){
  /*
  * display text and word image on the camera's screen
  * */
  let previousText = displayedText;
  //Remove any existing tweens first
  if(displayedText)
    createjs.Tween.removeTweens(displayedText);

  hideTextNumberWordImage();

  //display text
  displayedText = new createjs.Bitmap(queue.getResult(`text_${word}`));
  displayedText.regX = queue.getResult(`text_${word}`).width / 2;
  displayedText.regY= queue.getResult(`text_${word}`).height / 2;
  displayedText.x = isMobile.value ? canvas.width * .61 : canvas.width * .58;
  displayedText.y = isMobile.value ? canvas.height * .71: canvas.height * .77;
  displayedText.scale = isMobile.value ? .3 * dpr: .35 * dpr;
  displayedText.alpha = 0; // Start with the next text invisible



  //display number
  displayedNumber = new createjs.Bitmap(queue.getResult(`${no}`));
  displayedNumber.regX = queue.getResult(`${no}`).width / 2;
  displayedNumber.regY= queue.getResult(`${no}`).height / 2;
  displayedNumber.x = isMobile.value ? canvas.width * .86 : canvas.width * .78;
  displayedNumber.y = isMobile.value ? canvas.height * .39: canvas.height * .35;
  displayedNumber.scale = isMobile.value ? .3 * dpr: .35 * dpr;

  stage.addChild(displayedText);
  stage.addChild(displayedNumber)
  if(previousText){
    // Start tweening the transition
    createjs.Tween.get(previousText)
        .to({ alpha: 0, scaleX: 0, scaleY: 0 }, 1000, createjs.Ease.getPowInOut(4)) // Fade out and scale down
        .call(() => {
          // Once the currentText finishes, remove it from the stage
          if(stage)
            stage.removeChild(previousText);
        });
    stage.addChild(previousText);
  }

  // Animate the next text (fade in and scale up)
  createjs.Tween.get(displayedText)
      .to({ alpha: 1, scaleX: isMobile.value ? .3 * dpr: .35 * dpr, scaleY: isMobile.value ? .3 * dpr: .35 * dpr }, 1000, createjs.Ease.getPowInOut(4)) // Fade in and scale up
      .call(() => {
        // Finish the tween animation for the next text
        stage.update();
      });
  if(keluargaPerkataan[currentPage - 1][no - 1].hasAnimation){
    //if there is animation playing,stop the playing animation
    if(displayedWordImage){
      displayedWordImage.gotoAndPlay("stop");
      stage.removeChild(displayedWordImage);
      displayedWordImage = null;
    }
    //display the animation image
    let animationSpriteSheet = new createjs.SpriteSheet({
      images: [queue.getResult(`${word}`)],
      framerate: 30,
      frames: keluargaPerkataan[currentPage - 1][no - 1].frames,
      animations: {
        run: [0,keluargaPerkataan[currentPage - 1][no - 1].frames.length - 1, "end"],
        end: [keluargaPerkataan[currentPage - 1][no - 1].frames.length - 1, keluargaPerkataan[currentPage - 1][no - 1].frames.length - 1],
        stop: [0]
      }
    });
    displayedWordImage = new createjs.Sprite(animationSpriteSheet);
    displayedWordImage.x = isMobile.value ? canvas.width * .5 : canvas.width * .58;
    displayedWordImage.y = isMobile.value ? canvas.height * .52: canvas.height * .53;
    displayedWordImage.alpha = 0; // Initially hidden
    displayedWordImage.scale = isMobile.value ? 1 * dpr: 1 * dpr;
    displayedWordImage.gotoAndPlay("run");
    stage.addChild(displayedWordImage);

    // Apply fade-in animation (0 to 1 alpha in 1 second)
    createjs.Tween.get(displayedWordImage).to({ alpha: 1 }, 300, createjs.Ease.quadIn);

  }else{
    //display word image
    displayedWordImage = new createjs.Bitmap(queue.getResult(`${word}`));
    displayedWordImage.regX = queue.getResult(`${word}`).width / 2;
    displayedWordImage.regY= queue.getResult(`${word}`).height / 2;
    displayedWordImage.x = isMobile.value ? canvas.width * .6 : canvas.width * .58;
    displayedWordImage.y = isMobile.value ? canvas.height * .53: canvas.height * .53;
    displayedWordImage.alpha = 0; // Initially hidden
    displayedWordImage.scale = isMobile.value ? .25 * dpr: .35 * dpr;
    stage.addChild(displayedWordImage);

    // Apply fade-in animation (0 to 1 alpha in 1 second)
    createjs.Tween.get(displayedWordImage).to({ alpha: 1 }, 300, createjs.Ease.quadIn);
  }

  //output sound
  outputSound(word);

}
function outputSound(word){
  /*
  * output the sound for specific perkataan
  * */
  if (playingSound) {
    playingSound.stop();
    playingSound = null;
  }
  playingSound = createjs.Sound.play(`sound_${word}`);
}
function navigateToAnotherLetter(direction){
  /*
  * navigate to another word
  * */
  if(direction === 'down'){
    if(currentWord >= 1)
      displayedTextButtons[currentWord - 1].alpha = .5;//reset the previous selected text button's opacity
    currentWord++;
    displayedTextButtons[currentWord - 1].alpha = 1;
    displayPen(displayedTextButtons[currentWord - 1]);
    displayTextImage(currentWord  , keluargaPerkataan[currentPage - 1][currentWord - 1].word);

    //show the hidden btnUp
    if(!btnUp.visible && currentWord > 1)
      btnUp.visible = true;

    //check whether reach the last word and remove the down button if it is
    if(currentWord >= keluargaPerkataan[currentPage - 1 ].length){
      btnDown.visible = false;
    }
  }else if(direction === "up"){
    displayedTextButtons[currentWord - 1].alpha = .5;//reset the previous selected text button's opacity
    currentWord--;
    displayedTextButtons[currentWord - 1].alpha = 1;
    displayPen(displayedTextButtons[currentWord - 1]);
    displayTextImage(currentWord  , keluargaPerkataan[currentPage - 1][currentWord - 1].word);

    //show the hidden btnDown
    if(!btnDown.visible)
      btnDown.visible = true;

    //check whether reach the first word and remove the previous button if it is
    if(currentWord <= 1) {
      btnUp.visible = false;
    }
  }

}
function displayPen(textBtn){
  /*
  * display a floating pen at the right side of the selected text button
  * */
  const textBounds = textBtn.getBounds();

  if (!displayedPen)
    displayedPen = new createjs.Bitmap(queue.getResult(`pen`));

  // IMPORTANT: Remove any existing tweens first
  createjs.Tween.removeTweens(displayedPen);
  displayedPen.x = textBtn.hitArea.x + textBounds.width +  10;
  displayedPen.y = textBtn.hitArea.y - 30; // center vertically
  displayedPen.scale = isMobile.value ? 0.3 * dpr : 0.35 * dpr;
  stage.addChild(displayedPen);

  // Create the floating tween with fresh baseY
  let baseY = displayedPen.y;
  createjs.Tween.get(displayedPen, { loop: true })
      .to({ y: baseY - 10, rotation: -1 }, 1000, createjs.Ease.sineInOut)
      .to({ y: baseY, rotation: 1 }, 1000, createjs.Ease.sineInOut);

}
function navigateToAnotherPage(direction){
  /*
  * to handle page navigation when clicking on next or previous button
  * */
  if(playingAnimation){
    playingAnimation.gotoAndPlay("stop");
    stage.removeChild(playingAnimation);
    playingAnimation = null;
  }
  if(direction === "next"){
    if(currentPage >= 1 && currentPage < keluargaPerkataan.length){
      resetPage()
      currentPage++;
      initTextButtons();

      if(!btnPrevious.visible){
        btnPrevious.visible = true;
      }
    }
    else if(currentPage === keluargaPerkataan.length){
      navigateToAnotherSubmenu();
    }
  }else if(direction === "previous"){
    if(currentPage > 1 && currentPage <= keluargaPerkataan.length){
      resetPage()
      currentPage--;
      initTextButtons();

      if(currentPage === 1){
        btnPrevious.visible = false;
      }
    }
  }
}
function resetPage(){
  /*
  * use to reset the page when switching in between pages
  * */
  hideDisplayTextButtons();
  hideTextNumberWordImage();
  stage.removeChild(displayedPen)//hide pen
  currentWord = 0;

  if(!btnDown.visible){
    btnDown.visible = true;
  }

  if(btnUp.visible){
    btnUp.visible = false;
  }
}
function hideTextNumberWordImage(){
  /*
  * hide the text and word image on the pondok
  * */
  if(displayedText || displayedWordImage || displayedNumber){
    stage.removeChild(displayedText);
    stage.removeChild(displayedWordImage);
    stage.removeChild(displayedNumber);
    displayedText = null;
    displayedWordImage = null;
    displayedNumber = null;
  }
}
function hideDisplayTextButtons(){
  /*
  * remove word buttons for previous letter
  * */
  displayedTextButtons.forEach((btn) => {
    stage.removeChild(btn);
  });
  displayedTextButtons = [];
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
  <div class="min-h-screen bg-white w-full body-game">
    <div id="container">
      <canvas id="canvas"></canvas>
    </div>

    <Transition name="fade-in">
      <ModalContinue @hide="showModalContinue = false;" v-if="showModalContinue"></ModalContinue>
    </Transition>
    <Loader v-if="isLoading"></Loader>
  </div>
</template>

<style scoped>


</style>
