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
let keyboardButtons = [];
let displayedButtons = [];
let currentPage = 1;
let showModalContinue = ref(false);
let isLoading = ref(true);
let isMobile = computed(()=>{
  return  window.innerWidth < 1000 && window.innerWidth < window.innerHeight;
});
let targetWidth = isMobile.value ? 675: 1000;
let targetHeight = isMobile.value ? 800 : 675;
const dpr = window.devicePixelRatio || 1;
// objects
let backgroundImg;
let title;
let pc;
let keyboard;
let monitor;
let btnTelinga;
let btnHome;
let btnKeluar;
let btnSubmenu;
let btnBantuan;
let btnArahan;
let btnNext;
let btnPrevious;
let sukukata = [
  // first page
  {
    //each letter
    letter: "b",
    x: isMobile.value? .34: .34,
    y: isMobile.value? .66: .66,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "ba",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 132
          },
          {
            sukukata: "bi",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "bu",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 132
          },
          {
            sukukata: "be",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "bo",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 132
          },
        ],
  },
  //subsequent pages
  {
    letter: "c",
    hideOnKeyboard: true,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "ca",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 132
          },
          {
            sukukata: "ci",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "cu",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 132
          },
          {
            sukukata: "ce",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "co",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 132
          },
        ]
  },
  {
    letter: "d",
    x: isMobile.value? .4: .4,
    y: isMobile.value? .66: .66,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "da",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 132
          },
          {
            sukukata: "di",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "du",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 132
          },
          {
            sukukata: "de",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "do",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 132
          },
        ]
  },
  {
    letter: "f",
    x: isMobile.value? .46: .46,
    y: isMobile.value? .66: .66,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "fa",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 132
          },
          {
            sukukata: "fi",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "fu",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 132
          },
          {
            sukukata: "fe",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 132

          },
          {
            sukukata: "fo",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 132
          },
        ]
  },
  {
    letter: "g",
    x: isMobile.value? .52: .52,
    y: isMobile.value? .66: .66,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "ga",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 142
          },
          {
            sukukata: "gi",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 141
          },
          {
            sukukata: "gu",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 141
          },
          {
            sukukata: "ge",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 141

          },
          {
            sukukata: "go",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 141
          },
        ]
  },
  {
    letter: "h",
    x: isMobile.value? .58: .58,
    y: isMobile.value? .66: .66,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "ha",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 132
          },
          {
            sukukata: "hi",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "hu",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 132
          },
          {
            sukukata: "he",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 132

          },
          {
            sukukata: "ho",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 132
          },
        ]
  },
  {
    letter: "j",
    x: isMobile.value? .64: .64,
    y: isMobile.value? .66: .66,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "ja",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 142
          },
          {
            sukukata: "ji",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 142
          },
          {
            sukukata: "ju",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 142
          },
          {
            sukukata: "je",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 142

          },
          {
            sukukata: "jo",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 142
          },
        ]
  },
  {
    letter: "k",
    x: isMobile.value? .7: .7,
    y: isMobile.value? .66: .66,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "ka",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 132
          },
          {
            sukukata: "ki",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "ku",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 132
          },
          {
            sukukata: "ke",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 132

          },
          {
            sukukata: "ko",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 132
          },
        ]
  },
  {
    letter: "l",
    x: isMobile.value? .34: .34,
    y: isMobile.value? .75: .75,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "la",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 132
          },
          {
            sukukata: "li",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "lu",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 132
          },
          {
            sukukata: "le",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 132

          },
          {
            sukukata: "lo",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 132
          },
        ]
  },
  {
    letter: "m",
    x: isMobile.value? .4: .4,
    y: isMobile.value? .75: .75,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "ma",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 287,
            height: 132
          },
          {
            sukukata: "mi",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "mu",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 132
          },
          {
            sukukata: "me",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 285,
            height: 132

          },
          {
            sukukata: "mo",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 286,
            height: 132
          },
        ]
  },
  {
    letter: "n",
    x: isMobile.value? .46: .46,
    y: isMobile.value? .75: .75,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "na",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 132
          },
          {
            sukukata: "ni",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "nu",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 132
          },
          {
            sukukata: "ne",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 132

          },
          {
            sukukata: "no",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 132
          },
        ]
  },
  {
    letter: "p",
    x: isMobile.value? .52: .52,
    y: isMobile.value? .75: .75,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "pa",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 142
          },
          {
            sukukata: "pi",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 142
          },
          {
            sukukata: "pu",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 142
          },
          {
            sukukata: "pe",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 142

          },
          {
            sukukata: "po",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 142
          },
        ]
  },
  {
    letter: "r",
    x: isMobile.value? .58: .58,
    y: isMobile.value? .75: .75,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "ra",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 132
          },
          {
            sukukata: "ri",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "ru",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 132
          },
          {
            sukukata: "re",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 132

          },
          {
            sukukata: "ro",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 132
          },
        ]
  },
  {
    letter: "s",
    x: isMobile.value? .64: .64,
    y: isMobile.value? .75: .75,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "sa",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 132
          },
          {
            sukukata: "si",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "su",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 132
          },
          {
            sukukata: "se",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 132

          },
          {
            sukukata: "so",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 132
          },
        ]
  },
  {
    letter: "t",
    x: isMobile.value? .7: .7,
    y: isMobile.value? .75: .75,
    sukukata_arr: //array of sukukata of one page
        [
          {
            sukukata: "ta",
            x: isMobile.value ? .1: .16,
            y: isMobile.value ? .32 : .24,
            width: 281,
            height: 132
          },
          {
            sukukata: "ti",
            x: isMobile.value ? .27: .3,
            y: isMobile.value ? .28 : .2,
            width: 281,
            height: 132
          },
          {
            sukukata: "tu",
            x: isMobile.value ? .45: .45,
            y: isMobile.value ? .26 : .18,
            width: 281,
            height: 132
          },
          {
            sukukata: "te",
            x: isMobile.value ? .64 : .6,
            y: isMobile.value ? .29: .2,
            width: 281,
            height: 132

          },
          {
            sukukata: "to",
            x: isMobile.value ? .83 : .73,
            y: isMobile.value ? .34 : .26,
            width: 281,
            height: 132
          },
        ]
  },
]
// generate assets from the array above
const generateAssets = (arr) => {
  let assets = []
  arr.forEach((page)=>{
    page.sukukata_arr.forEach((value) =>{
      // add the sukukata buttons
      for(let i=1; i<=3; i++){
        assets.push({id: `btn_${value.sukukata}_0${i}`, src: `/images/sukukata/kvk/${page.letter}/${value.sukukata}000${i}.png`});
      }
      // add the sounds
      arr.forEach((x)=>{
        //do not include c as last letter
        if(!x.hideOnKeyboard){
          if((value.sukukata+x.letter) === 'con' || (value.sukukata+x.letter) === 'nul'){
            assets.push({id: `sound_${value.sukukata}${x.letter}`, src: `/sounds/sukukata/kvk/${value.sukukata}${x.letter}_.mp3`});
          }else{
            // loop through each of the letter and append with the current sukukata
            assets.push({id: `sound_${value.sukukata}${x.letter}`, src: `/sounds/sukukata/kvk/${value.sukukata}${x.letter}.mp3`});
          }
        }
      });
    })

    //add the keyboard keys
    for(let i=1; i<=3; i++) {
      if (!page.hideOnKeyboard) {
        assets.push({id: `btn_keyboard_${page.letter}_0${i}`, src: `/images/sukukata/kvk/btn_${page.letter}000${i}.png`});
      }
    }
  });
  return assets;
}
const assetsArr = generateAssets(sukukata);
const generalAssetsArr = [
  //   images
  {id: "background", src: "/images/sukukata/kvk/background.png"},
  {id: "title", src: "/images/sukukata/kvk/title_sukukata_kvk.png"},
  {id: "monitor", src: "/images/sukukata/kvk/monitor.png"},
  {id: "pc", src: "/images/sukukata/kvk/pc.png"},
  {id: "keyboard", src: "/images/sukukata/kvk/keyboard.png"},

  {id: "btn_home_01", src: "/images/btn_home_01.png"},
  {id: "btn_home_02", src: "/images/btn_home_02.png"},
  {id: "btn_bantuan_01", src: "/images/btn_bantuan_01.png"},
  {id: "btn_bantuan_02", src: "/images/btn_bantuan_02.png"},
  {id: "btn_arahan", src: "/images/btn_arahan.png"},
  {id: "btn_keluar_01", src: "/images/btn_keluar_01.png"},
  {id: "btn_keluar_02", src: "/images/btn_keluar_02.png"},
  {id: "btn_submenu_01", src: "/images/sukukata/kv/btn_submenu0001.png"},
  {id: "btn_submenu_02", src: "/images/sukukata/kv/btn_submenu0002.png"},
  {id: "btn_next_01", src: "/images/btn_next_01.png"},
  {id: "btn_next_02", src: "/images/btn_next_02.png"},
  {id: "btn_previous_01", src: "/images/btn_previous_01.png"},
  {id: "btn_previous_02", src: "/images/btn_previous_02.png"},
  {id: "btn_telinga_01", src: "/images/sukukata/kvk/btn_telinga0001.png"},
  {id: "btn_telinga_02", src: "/images/sukukata/kvk/btn_telinga0002.png"},
  //  sounds
  {id: "sound_laman_utama", src: "/sounds/laman_utama.mp3"},
  {id: "sound_keluar", src: "/sounds/keluar.mp3"},
  {id: "sound_submenu", src: "/sounds/submenu.mp3"},
  {id: "sound_bantuan", src: "/sounds/bantuan.mp3"},
  {id: "sound_arahan", src: "/sounds/sukukata/kvk/arahan.mp3"},
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
  backgroundImg.scaleX = backgroundImg.scaleY = isMobile.value ? 0.45 * dpr :0.4 * dpr;
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
    frames: { width: 268, height: 307 }, // Adjust size as needed
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
    router.push({name: 'LamanSukukata'});
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

  //add the pc
  pc = new createjs.Bitmap(queue.getResult("pc"));
  pc.regX = pc.image.width / 2;
  pc.x = canvas.width * .2;
  pc.y = canvas.height * .3;
  pc.scale = isMobile.value ? .3 * dpr: .35 * dpr;
  stage.addChild(pc);

  //add the monitor
  monitor = new createjs.Bitmap(queue.getResult("monitor"));
  monitor.regX = monitor.image.width / 2;
  monitor.x = canvas.width * .55;
  monitor.y = canvas.height * .26;
  monitor.scale = isMobile.value ? .3 * dpr: .35 * dpr;
  stage.addChild(monitor);

  //add the keyboard
  keyboard = new createjs.Bitmap(queue.getResult("keyboard"));
  keyboard.regX = keyboard.image.width / 2;
  keyboard.x = canvas.width * .55;
  keyboard.y = canvas.height * .65;
  keyboard.scale = isMobile.value ? .3 * dpr: .35 * dpr;
  stage.addChild(keyboard);

  //add the telinga button
  let btnTelingaSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_telinga_01"), // Normal state
      queue.getResult("btn_telinga_02")  // Hover / Click state
    ],
    frames: { width: 185, height: 215 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });
  // Create the Sprite
  btnTelinga = new createjs.Sprite(btnTelingaSpriteSheet, "normal");
  btnTelinga.mouseEnabled = true;
  btnTelinga.mouseChildren = true;
  btnTelinga.cursor = "pointer";
  btnTelinga.y = canvas.height * .5;
  btnTelinga.x = isMobile.value ? canvas.width * .55 :canvas.width * .8;
  btnTelinga.scale = .35 * dpr; // Apply scaling
  // Add event listeners for hover and click
  btnTelinga.on("mouseover", () => {
    btnTelinga.gotoAndStop("hover");
  });
  btnTelinga.on("mouseout", () => {
    btnTelinga.gotoAndStop("normal");
  });
  btnTelinga.on("click", () => {
    btnTelinga.gotoAndStop("hover");
    setTimeout(() => {
      btnTelinga.gotoAndStop("normal");
    }, 200);
    outputSound();
  });

  stage.addChild(btnTelinga);


  initKeyboardButtons();
  initButtons();
}
function initKeyboardButtons(){
  sukukata.forEach((page)=>{
    //add the keyboard button for each of the letters
    if(!page.hideOnKeyboard){
      let btnSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult(`btn_keyboard_${page.letter}_01`), // Normal state
          queue.getResult(`btn_keyboard_${page.letter}_02`), // Hover
          queue.getResult(`btn_keyboard_${page.letter}_03`),  // Click
        ],
        frames: { width: 174, height: 183 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1,
          click: 2,
        }
      });
      // Create the Sprite
      let btn = new createjs.Sprite(btnSpriteSheet, "normal");
      btn.mouseEnabled = true;
      btn.mouseChildren = true;
      btn.cursor = "pointer";
      btn.y = canvas.height * page.y ;
      btn.x = canvas.width * page.x;
      btn.scale = .35 * dpr; // Apply scaling
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

        displayLastLetter(page.letter);
      });

      stage.addChild(btn);
    }

  });
}
function initButtons(){
  let sukukataPage = sukukata[currentPage - 1];
  let sukukataArr = sukukataPage.sukukata_arr;
  let deltaY = 0;
  for(let i= 0; i < sukukataArr.length;i++){
    let btnSpriteSheet = new createjs.SpriteSheet({
      images: [
        queue.getResult(`btn_${sukukataArr[i].sukukata}_01`), // Normal state
        queue.getResult(`btn_${sukukataArr[i].sukukata}_02`), // Hover state
        queue.getResult(`btn_${sukukataArr[i].sukukata}_03`), // Click state
      ],
      frames: { width: sukukataArr[i].width, height: sukukataArr[i].height},
      animations: {
        normal: 0,
        hover: 1,
        click: 2,
      }
    });
    // Create the Sprite
    let btn = new createjs.Sprite(btnSpriteSheet, "normal");
    btn.mouseEnabled = true;
    btn.mouseChildren = true;
    btn.cursor = "pointer";
    btn.y = canvas.height * .44 + deltaY;
    btn.x =  canvas.width  * .13;
    btn.scale = .35 * dpr; // Apply scaling
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

      displaySukukata(sukukataArr[i].sukukata);
    });
    stage.addChild(btn);
    displayedButtons.push(btn);

    deltaY += 60;
  }
}

function outputSound(){

}
function displayLastLetter(){
  /*
  * display the last letter clicked on keyboard onto the monitor
  * */
}
function displaySukukata(){
  /*
  * display the sukukata clicked on keyboard onto the monitor
  * */
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
    if(currentPage >= 1 && currentPage < sukukata.length){
      hideDisplayButtons();
      addPreviousButton();
      currentPage++;
      initButtons();
    }
    else if(currentPage === sukukata.length){
      navigateToAnotherSubmenu();
    }
  }else if(direction === "previous"){
    if(currentPage > 1 && currentPage <= sukukata.length){
      hideDisplayButtons();
      currentPage--;
      initButtons();
    }
    else if(currentPage === 1){
      //hide the previous button
      hidePreviousButton();
    }
  }
}
function hideDisplayButtons(){
  /*
  * remove any sukukata buttons from the previous run
  * */
  displayedButtons.forEach((btn) => {
    stage.removeChild(btn);
  });

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
  }
}
function hidePreviousButton(){
  if(btnPrevious){
    stage.removeChild(btnPrevious);
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
