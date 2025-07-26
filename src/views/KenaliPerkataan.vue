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

let currentPage = 1;
let currentLetter = 1;//showing the first letter of the current page
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
let pondok;
let pokok;
let btnHome;
let btnKeluar;
let btnSubmenu;
let btnBantuan;
let btnArahan;
let btnNext;
let btnPrevious = null;
let perkataan = [
    //first page
    [
      //   by letter
      {
        letter: "a",
        words:[
          {
            word:"akar",
            width: 247,
            height: 206,
          },
          {
            word:"api",
            width: 218,
            height: 206,
          },
          {
            word:"awan",
            width: 254,
            height: 206,
          },
          {
            word:"ayam",
            width: 218,
            height: 225,
          },
        ],
        width: 281,
        height: 193,
      },
      {
        letter: "b",
        words: [
          {
            word: "baju",
            width: 217,
            height: 206,
          },
          {
            word: "batu",
            width: 259,
            height: 198,
          },
          {
            word: "belon",
            width: 209,
            height: 208,
          },
          {
            word: "bola",
            width: 209,
            height: 198,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "c",
        words: [
          {
            word:"cat",
            width: 226,
            height: 207,
          },
          {
            word:"cawan",
            width: 230,
            height: 198,
          },
          {
            word:"ceri",
            width: 213,
            height: 234,
          },
          {
            word:"cicak",
            width: 209,
            height: 210,
          },

        ],
        width: 279,
        height: 193,
      },
      {
        letter: "d",
        words: [
          {
            word: "dadu",
            width: 218,
            height: 206,
          },
          {
            word: "dahi",
            width: 218,
            height: 206,
          },
          {
            word: "dam",
            width: 244,
            height: 206,
          },
          {
            word: "duri",
            width: 218,
            height: 220,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "e",
        words: [
          {
            word: "emak",
            width: 218,
            height: 217,
          },
          {
            word: "emas",
            width: 300,
            height: 215,
          },
          {
            word: "enam",
            width: 218,
            height: 206,
          },
          {
            word: "ekor",
            width: 242,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "f",
        words: [
          {
            word: "fakir",
            width: 217,
            height: 206,
          },
          {
            word: "feri",
            width: 256,
            height: 209,
          },
          {
            word: "filem",
            width: 266,
            height: 206,
          },
          {
            word: "foto",
            width: 218,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "g",
        words: [
          {
            word: "gajah",
            width: 297,
            height: 206,
          },
          {
            word: "gigi",
            width: 267,
            height: 206,
          },
          {
            word: "guli",
            width: 252,
            height: 206,
          },
          {
            word: "guni",
            width: 218,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
    ],
    //subsequent pages
    [
      {
        letter: "h",
        words: [
          {
            word: "hati",
            width: 218,
            height: 206,
          },
          {
            word: "hoki",
            width: 218,
            height: 206,
          },
          {
            word: "hon",
            width: 248,
            height: 206,
          },
          {
            word: "hutan",
            width: 252,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "i",
        words: [
          {
            word: "ibu",
            width: 218,
            height: 221,
          },
          {
            word: "ikan",
            width: 218,
            height: 207,
          },
          {
            word: "inai",
            width: 218,
            height: 206,
          },
          {
            word: "itik",
            width: 218,
            height: 217,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "j",
        words: [
          {
            word: "jala",
            width: 266,
            height: 272,
          },
          {
            word: "jam",
            width: 218,
            height: 206,
          },
          {
            word: "jari",
            width: 226,
            height: 252,
          },
          {
            word: "jolok",
            width: 260,
            height: 228,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "k",
        words: [
          {
            word: "kaki",
            width: 218,
            height: 229,
          },
          {
            word: "keju",
            width: 218,
            height: 206,
          },
          {
            word: "kek",
            width: 225,
            height: 206,
          },
          {
            word: "kuda",
            width: 244,
            height: 242,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "l",
        words: [
          {
            word: "laci",
            width: 218,
            height: 206,
          },
          {
            word: "lada",
            width: 272,
            height: 207,
          },
          {
            word: "lidi",
            width: 318,
            height: 206,
          },
          {
            word: "lori",
            width: 259,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "m",
        words: [
          {
            word: "madu",
            width: 265,
            height: 210,
          },
          {
            word: "mata",
            width: 236,
            height: 206,
          },
          {
            word: "meja",
            width: 218,
            height: 206,
          },
          {
            word: "misai",
            width: 217,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "n",
        words: [
          {
            word: "nasi",
            width: 300,
            height: 206,
          },
          {
            word: "nipah",
            width: 217,
            height: 211,
          },
          {
            word: "nona",
            width: 224,
            height: 215,
          },
          {
            word: "nuri",
            width: 218,
            height: 269,
          },
        ],
        width: 279,
        height: 193,
      },
    ],
    [
      {
        letter: "o",
        words: [
          {
            word: "obor",
            width: 242,
            height: 209,
          },
          {
            word: "oren",
            width: 218,
            height: 206,
          },
          {
            word: "otak",
            width: 230,
            height: 216,
          },
          {
            word: "otot",
            width: 217,
            height: 211,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "p",
        words: [
          {
            word: "padi",
            width: 252,
            height: 219,
          },
          {
            word: "paku",
            width: 218,
            height: 208,
          },
          {
            word: "pipi",
            width: 221,
            height: 220,
          },
          {
            word: "pos",
            width: 224,
            height: 216,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "q",
        words: [
          {
            word: "qari",
            width: 238,
            height: 287,
          },
          {
            word: "qariah",
            width: 217,
            height: 207,
          },
          {
            word: "quran",
            width: 223,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "r",
        words: [
          {
            word: "raja",
            width: 218,
            height: 268,
          },
          {
            word: "roda",
            width: 218,
            height: 206,
          },
          {
            word: "ros",
            width: 218,
            height: 224,
          },
          {
            word: "rusa",
            width: 218,
            height: 253,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "s",
        words: [
          {
            word: "sari",
            width: 221,
            height: 230,
          },
          {
            word: "siku",
            width: 235,
            height: 249,
          },
          {
            word: "sup",
            width: 262,
            height: 206,
          },
          {
            word: "susu",
            width: 218,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "t",
        words: [
          {
            word: "tali",
            width: 218,
            height: 206,
          },
          {
            word: "tebu",
            width: 218,
            height: 214,
          },
          {
            word: "tin",
            width: 218,
            height: 206,
          },
          {
            word: "topi",
            width: 238,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "u",
        words: [
          {
            word: "ubat",
            width: 246,
            height: 206,
          },
          {
            word: "ubi",
            width: 226,
            height: 206,
          },
          {
            word: "ular",
            width: 218,
            height: 206,
          },
          {
            word: "ulat",
            width: 243,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
    ],
    [
      {
        letter: "v",
        words: [
          {
            word: "van",
            width: 220,
            height: 212,
          },
          {
            word: "vas",
            width: 217,
            height: 206,
          },
          {
            word: "video",
            width: 240,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "w",
        words: [
          {
            word: "wang",
            width: 257,
            height: 206,
          },
          {
            word: "wap",
            width: 217,
            height: 206,
          },
          {
            word: "wau",
            width: 234,
            height: 226,
          },
          {
            word: "wisel",
            width: 233,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "x",
        words: [
          {
            word: "xray",
            width: 218,
            height: 206,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "y",
        words: [
          {
            word: "yak",
            width: 225,
            height: 206,
          },
          {
            word: "yoyo",
            width: 252,
            height: 228,
          },
          {
            word: "yu",
            width: 229,
            height: 259,
          },
        ],
        width: 279,
        height: 193,
      },
      {
        letter: "z",
        words: [
          {
            word: "zip",
            width: 241,
            height: 222,
          },
          {
            word: "zirafah",
            width: 232,
            height: 222,
          },
          {
            word: "zoo",
            width: 236,
            height: 230,
          },
        ],
        width: 279,
        height: 193,
      },
    ]
]
// generate assets from the array above
const generateAssets = (arr) => {
  let assets = []
  arr.forEach((page)=>{
    page.forEach((x) =>{
      //add the letter buttons
      assets.push({ id: `btn_${x.letter}_01`, src: `/images/perkataan/kenali_perkataan/${x.letter}/${x.letter}0001.png` });
      assets.push({ id: `btn_${x.letter}_02`, src: `/images/perkataan/kenali_perkataan/${x.letter}/${x.letter}0002.png` });

      //add the x.letter's sound
      assets.push({ id: `sound_${x.letter}`, src: `/sounds/perkataan/kenali_perkataan/${x.letter}.mp3` });

      x.words.forEach((y)=>{
        //add the word buttons
        assets.push({ id: `btn_${y.word}_01`, src: `/images/perkataan/kenali_perkataan/${x.letter}/btn_${y.word}_01.png` });
        assets.push({ id: `btn_${y.word}_02`, src: `/images/perkataan/kenali_perkataan/${x.letter}/btn_${y.word}_02.png` });

        //add the text
        assets.push({ id: `text_${y.word}`, src: `/images/perkataan/kenali_perkataan/${x.letter}/text_${y.word}.png` });

        //add the y.word's sound
        assets.push({ id: `sound_${y.word}`, src: `/sounds/perkataan/kenali_perkataan/${y.word}.mp3` });
      });
    })

    });
  return assets;
}
const assetsArr = generateAssets(perkataan);
const generalAssetsArr = [
  //   images
  {id: "background", src: "/images/perkataan/kenali_perkataan/background.png"},
  {id: "title", src: "/images/perkataan/kenali_perkataan/title_kenali_perkataan.png"},
  {id: "pondok", src: "/images/perkataan/kenali_perkataan/pondok.png"},
  {id: "pokok", src: "/images/perkataan/kenali_perkataan/pokok.png"},

  {id: "btn_home_01", src: "/images/btn_home_01.png"},
  {id: "btn_home_02", src: "/images/btn_home_02.png"},
  {id: "btn_bantuan_01", src: "/images/btn_bantuan_01.png"},
  {id: "btn_bantuan_02", src: "/images/btn_bantuan_02.png"},
  {id: "btn_arahan", src: "/images/btn_arahan.png"},
  {id: "btn_keluar_01", src: "/images/btn_keluar_01.png"},
  {id: "btn_keluar_02", src: "/images/btn_keluar_02.png"},
  {id: "btn_submenu_01", src: "/images/perkataan/btn_submenu0001.png"},
  {id: "btn_submenu_02", src: "/images/perkataan/btn_submenu0002.png"},
  {id: "btn_next_01", src: "/images/btn_next_01.png"},
  {id: "btn_next_02", src: "/images/btn_next_02.png"},
  {id: "btn_previous_01", src: "/images/btn_previous_01.png"},
  {id: "btn_previous_02", src: "/images/btn_previous_02.png"},

  //  sounds
  {id: "sound_laman_utama", src: "/sounds/laman_utama.mp3"},
  {id: "sound_keluar", src: "/sounds/keluar.mp3"},
  {id: "sound_submenu", src: "/sounds/submenu.mp3"},
  {id: "sound_bantuan", src: "/sounds/bantuan.mp3"},
  {id: "sound_arahan", src: "/sounds/perkataan/kenali_perkataan/arahan.mp3"},
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

  //add the pondok
  pondok = new createjs.Bitmap(queue.getResult("pondok"));
  pondok.regX = pondok.image.width / 2;
  pondok.x = isMobile.value ?  canvas.width * .7: canvas.width * .6;
  pondok.y = isMobile.value ? canvas.height * .23  :canvas.height * .18;
  pondok.scale = isMobile.value ? .3 * dpr: .35 * dpr;
  stage.addChild(pondok);

  //add the pokok
  pokok = new createjs.Bitmap(queue.getResult("pokok"));
  pokok.regX = pokok.image.width / 2;
  pokok.x = isMobile.value ?  canvas.width * .23: canvas.width * .18;
  pokok.y = isMobile.value ? canvas.height * .15  :canvas.height * .08;
  pokok.scale = isMobile.value ? .3 * dpr: .35 * dpr;
  stage.addChild(pokok);

  title = new createjs.Bitmap(queue.getResult("title"));
  title.regX = title.image.width / 2;
  title.x = canvas.width / 2;
  title.y = canvas.height * .01;
  title.scale = isMobile.value ? .2 * dpr: .25 * dpr;
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

  initButtons();
  initPerkataanButtons();
  displayTextImage(perkataan[currentPage - 1][0].words[0].word, false);
}
function initButtons(){
  //
  let currentPageLetters = perkataan[currentPage - 1];
  let deltaX = 0;
  for(let i= 0; i < currentPageLetters.length;i++){
    let btnSpriteSheet = new createjs.SpriteSheet({
      images: [
        queue.getResult(`btn_${currentPageLetters[i].letter}_01`), // Normal state
        queue.getResult(`btn_${currentPageLetters[i].letter}_02`), // Hover state
      ],
      frames: { width: currentPageLetters[i].width, height: currentPageLetters[i].height},
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
    btn.y = isMobile.value? canvas.height * .77 : canvas.height * .88 ;
    btn.x = isMobile.value ? canvas.width  * .06  + deltaX : canvas.width  * .08 + deltaX;
    btn.scale = isMobile.value ? .3 * dpr  :  .35 * dpr;

    // === Custom hit area ===
    let hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(0, 0, currentPageLetters[i].width, currentPageLetters[i].height);
    hit.alpha = 0.01;
    btn.hitArea = hit;

    // Required: set bounds so CreateJS knows the hit area size
    btn.setBounds(0, 0, currentPageLetters[i].width, currentPageLetters[i].height);

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
      outputSound(currentPageLetters[i].letter);//output the sound of the letter
      currentLetter = i + 1;
      navigateToAnotherLetter(currentPageLetters[i]);
    });
    stage.addChild(btn);
    displayedButtons.push(btn);

    deltaX +=  isMobile.value ? 110 : 130;
  }
}

function initPerkataanButtons() {
  /*
  * initialize the perkataan buttons on the tree
  * */
  let currentPageLetters = perkataan[currentPage - 1];
  let currentPageWords = currentPageLetters[currentLetter - 1];
  let positions = [
    {x: isMobile.value ? .19 : .15, y: isMobile.value ? .36 : .37},//first word button's position on the tree
    {x: isMobile.value ? .09: .08, y: isMobile.value ? .46 : .51},
    {x: isMobile.value ? .29 : .23, y: isMobile.value ? .48 : .53},
    {x: isMobile.value ? .19 : .15, y: isMobile.value ? .57 : .67},
  ]

  currentPageWords.words.forEach((x, index) => {
    let word = x.word;
    let btnSpriteSheet = new createjs.SpriteSheet({
      images: [
        queue.getResult(`btn_${word}_01`), // Normal state
        queue.getResult(`btn_${word}_02`), // Hover state
      ],
      frames: { width: x.width, height: x.height},
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
    btn.x = canvas.width * positions[index].x;
    btn.y = canvas.height * positions[index].y;
    btn.scale = isMobile.value ? .26 * dpr : .3 * dpr;

    // === Custom hit area ===
    let hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(0, 0, x.width, x.height);
    hit.alpha = 0.01;
    btn.hitArea = hit;

    // Required: set bounds so CreateJS knows the hit area size
    btn.setBounds(0, 0, x.width, x.height);

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
      displayTextImage(word,true);

    });
    stage.addChild(btn);
    displayedWordButtons.push(btn);
  });

}
function displayTextImage(word, outputWordSound){
  /*
  * display text and word image on the pondok
  * */
  hideTextWordImage();

  //display text
  displayedText = new createjs.Bitmap(queue.getResult(`text_${word}`));
  displayedText.regX = displayedText.image.width / 2;
  displayedText.regY= displayedText.image.height / 2;
  displayedText.x = isMobile.value ? canvas.width * .65 : canvas.width * .56;
  displayedText.y = isMobile.value ? canvas.height * .37: canvas.height * .37;
  displayedText.scale = isMobile.value ? .3 * dpr: .35 * dpr;
  stage.addChild(displayedText);

  //display word image
  displayedWordImage = new createjs.Bitmap(queue.getResult(`btn_${word}_01`));
  displayedWordImage.regX = displayedWordImage.image.width / 2;
  displayedWordImage.regY= displayedWordImage.image.height / 2;
  displayedWordImage.x = isMobile.value ? canvas.width * .65 : canvas.width * .56;
  displayedWordImage.y = isMobile.value ? canvas.height * .57: canvas.height * .6;
  displayedWordImage.alpha = 0; // Initially hidden
  displayedWordImage.scale = isMobile.value ? .7 * dpr: .9 * dpr;
  stage.addChild(displayedWordImage);

  // Apply fade-in animation (0 to 1 alpha in 1 second)
  createjs.Tween.get(displayedWordImage).to({ alpha: 1 }, 300, createjs.Ease.quadIn);

  //output sound if needed
  if(outputWordSound)
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
function navigateToAnotherLetter(obj){
  /*
  * change to another letter and it set of words
  * */
  hideDisplayWordButtons();
  hideTextWordImage();
  initPerkataanButtons();
  displayTextImage(obj.words[0].word, false);
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
    if(currentPage >= 1 && currentPage < perkataan.length){
      hideDisplayButtons();
      hideDisplayWordButtons();
      addPreviousButton();
      currentPage++;
      currentLetter = 1;
      initButtons();
      initPerkataanButtons();
      displayTextImage(perkataan[currentPage - 1][0].words[0].word, false);
    }
    else if(currentPage === perkataan.length){
      navigateToAnotherSubmenu();
    }
  }else if(direction === "previous"){
    if(currentPage > 1 && currentPage <= perkataan.length){
      hideDisplayButtons();
      hideDisplayWordButtons();
      currentPage--;
      currentLetter = 1;
      initButtons();
      initPerkataanButtons();
      displayTextImage(perkataan[currentPage - 1][0].words[0].word, false);

      if(currentPage === 1){
        stage.removeChild(btnPrevious);
        btnPrevious = null;
      }
    }
  }
}
function addPreviousButton(){
  if(!btnPrevious){
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
  }
}
function hideTextWordImage(){
  /*
  * hide the text and word image on the pondok
  * */
  if(displayedText || displayedWordImage){
    stage.removeChild(displayedText);
    stage.removeChild(displayedWordImage);
    displayedText = null;
    displayedWordImage = null;
  }
}
function hideDisplayWordButtons(){
  /*
  * remove word buttons for previous letter
  * */
  displayedWordButtons.forEach((btn) => {
    stage.removeChild(btn);
  });
  displayedWordButtons = [];
}
function hideDisplayButtons(){
  /*
  * remove any buttons from the previous run
  * */
  displayedButtons.forEach((btn) => {
    stage.removeChild(btn);
  });
  displayedButtons = [];
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
