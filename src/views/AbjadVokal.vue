<script setup>
import { onMounted,onUnmounted, ref } from 'vue';
import router from '../router.js';
import ModalContinue from "../components/ModalContinue.vue";
// States
let canvas;
let stage;
let queue;
let targetWidth = 1000;
let targetHeight = 675;
let playingSound = null;
let playingAnimation = null;
let displayedVokalButtons = [];
let displayedImage = null;
let displayedText = null;
let currentPage = 1;
let showModalContinue = ref(false);
// objects
let kenaliBackgroundImg;
let kenaliVokalTitleImg;
let tvImg;
let guideImg;
let btnHome;
let btnKeluar;
let btnSubmenu;
let btnBantuan;
let btnArahan;
let btnNext;
let btnPrevious;
let btnA;
let btnE1;
let btnE2;
let btnI;
let btnO;
let btnU;

let btnApi;
let btnAwan;
let btnAyam;

let btnIbu;
let btnIkan;
let btnItik;

let btnUbi;
let btnUlar;
let btnUlat;

let btnEmak;
let btnEmas;
let btnEnam;

let btnEkor;
let btnEpal;

let btnObor;
let btnOtak;
let btnOren;

// animation states
let animationVokalA;
let animationVokalE1;
let animationVokalE2;
let animationVokalI;
let animationVokalO;
let animationVokalU;

function init() {
  //get DPI
  canvas = document.getElementById("canvas");
  canvas.width = targetWidth ;
  canvas.height = targetHeight;

  stage = new createjs.Stage(canvas);
  stage.snapToPixelEnabled = true;
  stage.enableMouseOver(1000);//to enable mouseover

  queue = new createjs.LoadQueue();
  queue.installPlugin(createjs.Sound);
  queue.on("complete", handleComplete);
  queue.loadManifest([
    //   images
    {id: "kenali_background", src: "/images/kenali_background.png"},
    {id: "title_kenali_vokal", src: "/images/title_kenali_vokal.png"},
    {id: "tv", src: "/images/tv_1.png"},
    {id: "guide", src: "/images/guide.png"},

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

    {id: "btn_a_01", src: "/images/btn_a_01.png"},
    {id: "btn_a_02", src: "/images/btn_a_02.png"},
    {id: "btn_api_01", src: "/images/btn_api_01.png"},
    {id: "btn_api_02", src: "/images/btn_api_02.png"},
    {id: "text_api", src: "/images/text_api.png"},
    {id: "btn_awan_01", src: "/images/btn_awan_01.png"},
    {id: "btn_awan_02", src: "/images/btn_awan_02.png"},
    {id: "text_awan", src: "/images/text_awan.png"},
    {id: "btn_ayam_01", src: "/images/btn_ayam_01.png"},
    {id: "btn_ayam_02", src: "/images/btn_ayam_02.png"},
    {id: "text_ayam", src: "/images/text_ayam.png"},

    {id: "btn_e1_01", src: "/images/btn_e1_01.png"},
    {id: "btn_e1_02", src: "/images/btn_e1_02.png"},
    {id: "btn_emak_01", src: "/images/btn_emak_01.png"},
    {id: "btn_emak_02", src: "/images/btn_emak_02.png"},
    {id: "text_emak", src: "/images/text_emak.png"},
    {id: "btn_emas_01", src: "/images/btn_emas_01.png"},
    {id: "btn_emas_02", src: "/images/btn_emas_02.png"},
    {id: "text_emas", src: "/images/text_emas.png"},
    {id: "btn_enam_01", src: "/images/btn_enam_01.png"},
    {id: "btn_enam_02", src: "/images/btn_enam_02.png"},
    {id: "text_enam", src: "/images/text_enam.png"},

    {id: "btn_e2_01", src: "/images/btn_e2_01.png"},
    {id: "btn_e2_02", src: "/images/btn_e2_02.png"},
    {id: "btn_ekor_01", src: "/images/btn_ekor_01.png"},
    {id: "btn_ekor_02", src: "/images/btn_ekor_02.png"},
    {id: "text_ekor", src: "/images/text_ekor.png"},
    {id: "btn_epal_01", src: "/images/btn_epal_01.png"},
    {id: "btn_epal_02", src: "/images/btn_epal_02.png"},
    {id: "text_epal", src: "/images/text_epal.png"},

    {id: "btn_i_01", src: "/images/btn_i_01.png"},
    {id: "btn_i_02", src: "/images/btn_i_02.png"},
    {id: "btn_itik_01", src: "/images/btn_itik_01.png"},
    {id: "btn_itik_02", src: "/images/btn_itik_02.png"},
    {id: "text_itik", src: "/images/text_itik.png"},
    {id: "btn_ikan_01", src: "/images/btn_ikan_01.png"},
    {id: "btn_ikan_02", src: "/images/btn_ikan_02.png"},
    {id: "text_ikan", src: "/images/text_ikan.png"},
    {id: "btn_ibu_01", src: "/images/btn_ibu_01.png"},
    {id: "btn_ibu_02", src: "/images/btn_ibu_02.png"},
    {id: "text_ibu", src: "/images/text_ibu.png"},

    {id: "btn_o_01", src: "/images/btn_o_01.png"},
    {id: "btn_o_02", src: "/images/btn_o_02.png"},
    {id: "btn_obor_01", src: "/images/btn_obor_01.png"},
    {id: "btn_obor_02", src: "/images/btn_obor_02.png"},
    {id: "text_obor", src: "/images/text_obor.png"},
    {id: "btn_oren_01", src: "/images/btn_oren_01.png"},
    {id: "btn_oren_02", src: "/images/btn_oren_02.png"},
    {id: "text_oren", src: "/images/text_oren.png"},
    {id: "btn_otak_01", src: "/images/btn_otak_01.png"},
    {id: "btn_otak_02", src: "/images/btn_otak_02.png"},
    {id: "text_otak", src: "/images/text_otak.png"},

    {id: "btn_u_01", src: "/images/btn_u_01.png"},
    {id: "btn_u_02", src: "/images/btn_u_02.png"},
    {id: "btn_ubi_01", src: "/images/btn_ubi_01.png"},
    {id: "btn_ubi_02", src: "/images/btn_ubi_02.png"},
    {id: "text_ubi", src: "/images/text_ubi.png"},
    {id: "btn_ular_01", src: "/images/btn_ular_01.png"},
    {id: "btn_ular_02", src: "/images/btn_ular_02.png"},
    {id: "text_ular", src: "/images/text_ular.png"},
    {id: "btn_ulat_01", src: "/images/btn_ulat_01.png"},
    {id: "btn_ulat_02", src: "/images/btn_ulat_02.png"},
    {id: "text_ulat", src: "/images/text_ulat.png"},

    {id: "spreadsheet_a", src: "/images/vokal_a_animation.png"},
    {id: "spreadsheet_i", src: "/images/vokal_i_animation.png"},
    {id: "spreadsheet_u", src: "/images/vokal_u_animation.png"},
    {id: "spreadsheet_e", src: "/images/vokal_e_animation.png"},
    {id: "spreadsheet_o", src: "/images/vokal_o_animation.png"},

    //  sounds
    {id: "sound_vokal", src: "/sounds/kenali_vokal.mp3"},
    {id: "sound_laman_utama", src: "/sounds/laman_utama.mp3"},
    {id: "sound_keluar", src: "/sounds/keluar.mp3"},
    {id: "sound_submenu", src: "/sounds/submenu.mp3"},
    {id: "sound_bantuan", src: "/sounds/bantuan.mp3"},

    {id: "sound_a", src: "/sounds/vokal/a.mp3"},
    {id: "sound_api", src: "/sounds/vokal/api.mp3"},
    {id: "sound_awan", src: "/sounds/vokal/awan.mp3"},
    {id: "sound_ayam", src: "/sounds/vokal/ayam.mp3"},

    {id: "sound_e1", src: "/sounds/vokal/e1.mp3"},
    {id: "sound_emas", src: "/sounds/vokal/emas.mp3"},
    {id: "sound_emak", src: "/sounds/vokal/emak.mp3"},
    {id: "sound_enam", src: "/sounds/vokal/enam.mp3"},

    {id: "sound_e2", src: "/sounds/vokal/e2.mp3"},
    {id: "sound_epal", src: "/sounds/vokal/epal.mp3"},
    {id: "sound_ekor", src: "/sounds/vokal/ekor.mp3"},

    {id: "sound_i", src: "/sounds/vokal/i.mp3"},
    {id: "sound_ibu", src: "/sounds/vokal/ibu.mp3"},
    {id: "sound_ikan", src: "/sounds/vokal/ikan.mp3"},
    {id: "sound_itik", src: "/sounds/vokal/itik.mp3"},

    {id: "sound_o", src: "/sounds/vokal/o.mp3"},
    {id: "sound_obor", src: "/sounds/vokal/obor.mp3"},
    {id: "sound_oren", src: "/sounds/vokal/oren.mp3"},
    {id: "sound_otak", src: "/sounds/vokal/otak.mp3"},

    {id: "sound_u", src: "/sounds/vokal/u.mp3"},
    {id: "sound_ubi", src: "/sounds/vokal/ubi.mp3"},
    {id: "sound_ular", src: "/sounds/vokal/ular.mp3"},
    {id: "sound_ulat", src: "/sounds/vokal/ulat.mp3"},
  ]);
}

function handleComplete() {
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
  kenaliBackgroundImg.y = canvas.height - (kenaliBackgroundImg.image.height * 0.35) / 2 + 20 ; // Adjust this value if needed
  // Scale it properly
  kenaliBackgroundImg.scaleX = kenaliBackgroundImg.scaleY = 0.4;
  stage.addChild(kenaliBackgroundImg); // Green background on top

  kenaliVokalTitleImg = new createjs.Bitmap(queue.getResult("title_kenali_vokal"));
  kenaliVokalTitleImg.regX = kenaliVokalTitleImg.image.width / 2;
  kenaliVokalTitleImg.x = canvas.width / 2 - 100;
  kenaliVokalTitleImg.y = 10;
  kenaliVokalTitleImg.scale = .35;
  stage.addChild(kenaliVokalTitleImg);


  tvImg= new createjs.Bitmap(queue.getResult("tv"));
  // Set registration point to center (better for positioning)
  tvImg.regX = tvImg.image.width / 2;
  tvImg.regY = tvImg.image.height / 2;
  // Position it centered horizontally and slightly above the bottom
  tvImg.x = canvas.width / 2 -100;
  tvImg.y = canvas.height - (tvImg.image.height * 0.35) / 2 - 10 ; // Adjust this value if needed
  // Scale it properly
  tvImg.scaleX = tvImg.scaleY = 0.35;
  stage.addChild(tvImg); // Green background on top


  guideImg= new createjs.Bitmap(queue.getResult("guide"));
  // Set registration point to center (better for positioning)
  guideImg.regX = guideImg.image.width / 2;
  guideImg.regY = guideImg.image.height / 2;
  // Position it centered horizontally and slightly above the bottom
  guideImg.x = canvas.width / 2 -100;
  guideImg.y = canvas.height - (guideImg.image.height * 0.35) / 2 - 75 ; // Adjust this value if needed
  // Scale it properly
  guideImg.scaleX = guideImg.scaleY = 0.35;
  stage.addChild(guideImg); // Green background on top


  kenaliVokalTitleImg = new createjs.Bitmap(queue.getResult("title_kenali_vokal"));
  kenaliVokalTitleImg.regX = kenaliVokalTitleImg.image.width / 2;
  kenaliVokalTitleImg.x = canvas.width / 2 - 100;
  kenaliVokalTitleImg.y = 10;
  kenaliVokalTitleImg.scale = .35;
  stage.addChild(kenaliVokalTitleImg);


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
  btnHome.y = 20;
  btnHome.x = 20;
  btnHome.scale = .4; // Apply scaling


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
  btnSubmenu.y = 20;
  btnSubmenu.x = canvas.width - 360;
  btnSubmenu.scale = .38; // Apply scaling

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
  stage.addChild(btnBantuan);


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
  stage.addChild(btnKeluar);


  btnArahan= new createjs.Bitmap(queue.getResult("btn_arahan"));
  // Position it centered horizontally and slightly above the bottom
  btnArahan.y = 150;
  btnArahan.x = canvas.width - 120;
  btnArahan.cursor = "pointer";
  // Scale it properly
  btnArahan.scaleX = btnArahan.scaleY = 0.35;
  stage.addChild(btnArahan); // Green background on top


  showAIEButtons();

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
  btnNext.y = canvas.height - 120;
  btnNext.x = canvas.width - 120;
  btnNext.scale = .4; // Apply scaling
  // Add event listeners for hover and click
  btnNext.on("mouseover", () => {
    btnNext.gotoAndStop("hover");
  });
  btnNext.on("mouseout", () => {
    btnNext.gotoAndStop("normal");
  });
  btnNext.on("click", () => {
    btnNext.gotoAndStop("hover");

    navigateToAnotherPage("next");
  });

  stage.addChild(btnNext);
  stage.addChild(btnSubmenu);//required because the button will be covered the letter

  initAnimations();
}
function showAIEButtons(){

  let btnASpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_a_01"), // Normal state
      queue.getResult("btn_a_02")  // Hover / Click state
    ],
    frames: { width: 261, height: 238 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });
  // Create the Sprite
  btnA = new createjs.Sprite(btnASpriteSheet, "normal");
  btnA.mouseEnabled = true;
  btnA.mouseChildren = true;
  btnA.cursor = "pointer";
  btnA.y = canvas.height / 2 - 100;
  btnA.x = canvas.width - 250;
  btnA.scale = .4; // Apply scaling
  // Add event listeners for hover and click
  btnA.on("mouseover", () => {
    btnA.gotoAndStop("hover");

  });
  btnA.on("mouseout", () => {
    btnA.gotoAndStop("normal");
  });
  btnA.on("click", () => {
    btnA.gotoAndStop("hover");
    //if there is animation playing,stop the playing animation
    if(playingAnimation){
      playingAnimation.gotoAndPlay("stop");
      stage.removeChild(playingAnimation);
      playingAnimation = null;
    }
    playSound("sound_a");
    hideDisplayVokalButtons();
    hideDisplayImageText();
    stage.addChild(animationVokalA);
    animationVokalA.gotoAndPlay("run");
    playingAnimation = animationVokalA;
    stage.addChild(btnSubmenu);//required because the button will be covered the letter
  });
  stage.addChild(btnA);

  let btnISpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_i_01"), // Normal state
      queue.getResult("btn_i_02")  // Hover / Click state
    ],
    frames: { width: 261, height: 238 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });
  // Create the Sprite
  btnI = new createjs.Sprite(btnISpriteSheet, "normal");
  btnI.mouseEnabled = true;
  btnI.mouseChildren = true;
  btnI.cursor = "pointer";
  btnI.y = canvas.height / 2;
  btnI.x = canvas.width - 250;
  btnI.scale = .4; // Apply scaling
  // Add event listeners for hover and click
  btnI.on("mouseover", () => {
    btnI.gotoAndStop("hover");
  });
  btnI.on("mouseout", () => {
    btnI.gotoAndStop("normal");
  });
  btnI.on("click", () => {
    btnI.gotoAndStop("hover");
    //if there is animation playing,stop the playing animation
    if(playingAnimation){
      playingAnimation.gotoAndPlay("stop");
      stage.removeChild(playingAnimation);
      playingAnimation = null;
    }
    playSound("sound_i");
    hideDisplayVokalButtons();
    hideDisplayImageText();
    stage.addChild(animationVokalI);
    animationVokalI.gotoAndPlay("run");
    playingAnimation = animationVokalI;
    stage.addChild(btnSubmenu);//required because the button will be covered the letter
  });
  stage.addChild(btnI);


  let btnUSpriteSheet = new createjs.SpriteSheet({
    images: [
      queue.getResult("btn_u_01"), // Normal state
      queue.getResult("btn_u_02")  // Hover / Click state
    ],
    frames: { width: 261, height: 238 }, // Adjust size as needed
    animations: {
      normal: 0,
      hover: 1
    }
  });
  // Create the Sprite
  btnU = new createjs.Sprite(btnUSpriteSheet, "normal");
  btnU.mouseEnabled = true;
  btnU.mouseChildren = true;
  btnU.cursor = "pointer";
  btnU.y = canvas.height / 2 + 100;
  btnU.x = canvas.width - 250;
  btnU.scale = .4; // Apply scaling
  // Add event listeners for hover and click
  btnU.on("mouseover", () => {
    btnU.gotoAndStop("hover");
  });
  btnU.on("mouseout", () => {
    btnU.gotoAndStop("normal");
  });
  btnU.on("click", () => {
    btnU.gotoAndStop("hover");
    //if there is animation playing,stop the playing animation
    if(playingAnimation){
      playingAnimation.gotoAndPlay("stop");
      stage.removeChild(playingAnimation);
      playingAnimation = null;
    }
    playSound("sound_u");
    hideDisplayVokalButtons();
    hideDisplayImageText();
    stage.addChild(animationVokalU);
    animationVokalU.gotoAndPlay("run");
    playingAnimation = animationVokalU;
    stage.addChild(btnSubmenu);//required because the button will be covered the letter

  });
  stage.addChild(btnU);
}
function initAnimations(){
  // initialize animations
  let animationASpriteSheet = new createjs.SpriteSheet({
    images: [queue.getResult("spreadsheet_a")],
    framerate: 30,
    frames: [[0,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[363,0,363,336,0,27,132.9],[726,0,363,336,0,27,132.9],[1089,0,363,336,0,27,132.9],[1452,0,363,336,0,27,132.9],[1815,0,363,336,0,27,132.9],[2178,0,363,336,0,27,132.9],[2541,0,363,336,0,27,132.9],[2904,0,363,336,0,27,132.9],[3267,0,363,336,0,27,132.9],[3630,0,363,336,0,27,132.9],[0,336,363,336,0,27,132.9],[363,336,363,336,0,27,132.9],[726,336,363,336,0,27,132.9],[1089,336,363,336,0,27,132.9],[1452,336,363,336,0,27,132.9],[1815,336,363,336,0,27,132.9],[2178,336,363,336,0,27,132.9],[2541,336,363,336,0,27,132.9],[2904,336,363,336,0,27,132.9],[3267,336,363,336,0,27,132.9],[3630,336,363,336,0,27,132.9],[0,672,363,336,0,27,132.9],[363,672,363,336,0,27,132.9],[726,672,363,336,0,27,132.9],[1089,672,363,336,0,27,132.9],[1452,672,363,336,0,27,132.9],[1815,672,363,336,0,27,132.9],[2178,672,363,336,0,27,132.9],[2541,672,363,336,0,27,132.9],[2904,672,363,336,0,27,132.9],[3267,672,363,336,0,27,132.9],[3630,672,363,336,0,27,132.9],[0,1008,363,336,0,27,132.9],[363,1008,363,336,0,27,132.9],[726,1008,363,336,0,27,132.9],[1089,1008,363,336,0,27,132.9],[1452,1008,363,336,0,27,132.9],[1815,1008,363,336,0,27,132.9],[2178,1008,363,336,0,27,132.9],[2541,1008,363,336,0,27,132.9],[2904,1008,363,336,0,27,132.9],[3267,1008,363,336,0,27,132.9],[3630,1008,363,336,0,27,132.9],[0,1344,363,336,0,27,132.9],[363,1344,363,336,0,27,132.9],[726,1344,363,336,0,27,132.9],[1089,1344,363,336,0,27,132.9],[1452,1344,363,336,0,27,132.9],[1815,1344,363,336,0,27,132.9],[2178,1344,363,336,0,27,132.9],[2541,1344,363,336,0,27,132.9],[2904,1344,363,336,0,27,132.9],[3267,1344,363,336,0,27,132.9],[3630,1344,363,336,0,27,132.9],[0,1680,363,336,0,27,132.9],[0,1680,363,336,0,27,132.9],[0,1680,363,336,0,27,132.9],[363,1680,363,336,0,27,132.9],[726,1680,363,336,0,27,132.9],[1089,1680,363,336,0,27,132.9],[1452,1680,363,336,0,27,132.9],[1815,1680,363,336,0,27,132.9],[2178,1680,363,336,0,27,132.9],[2541,1680,363,336,0,27,132.9],[2904,1680,363,336,0,27,132.9],[3267,1680,363,336,0,27,132.9],[3630,1680,363,336,0,27,132.9],[0,2016,363,336,0,27,132.9],[363,2016,363,336,0,27,132.9],[726,2016,363,336,0,27,132.9],[1089,2016,363,336,0,27,132.9],[1452,2016,363,336,0,27,132.9],[1815,2016,363,336,0,27,132.9],[2178,2016,363,336,0,27,132.9],[2541,2016,363,336,0,27,132.9],[2904,2016,363,336,0,27,132.9],[3267,2016,363,336,0,27,132.9],[3630,2016,363,336,0,27,132.9],[0,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[363,2352,363,336,0,27,132.9],[726,2352,363,337,0,27,133.9],[1089,2352,367,341,0,27,137.9],[1456,2352,371,344,0,27,140.9],[1827,2352,375,348,0,27,144.9],[2202,2352,379,351,0,27,147.9],[2581,2352,383,355,0,27,151.9],[2964,2352,387,358,0,27,154.9],[3351,2352,392,362,0,27,158.9],[0,2714,396,365,0,27,161.9],[396,2714,400,369,0,27,165.9],[796,2714,404,372,0,27,168.9],[1200,2714,408,376,0,27,172.9],[1608,2714,413,379,0,27,175.9],[2021,2714,417,383,0,27,179.9],[2438,2714,421,386,0,27,182.9],[2859,2714,425,390,0,27,186.9],[3284,2714,429,393,0,27,189.9],[0,3107,433,397,0,27,193.9],[433,3107,433,397,0,27,193.9],[866,3107,433,397,0,27,193.9],[1299,3107,433,397,0,27,193.9],[1732,3107,433,397,0,27,193.9],[2165,3107,433,397,0,27,193.9],[2598,3107,433,397,0,27,193.9],[3031,3107,433,397,0,27,193.9],[3464,3107,433,397,0,27,193.9],[0,3504,433,397,0,27,193.9]],
    animations: {
      run: [0,156, "end"],
      end: [156, 156],
      stop: [0]
    }
  });
  animationVokalA= new createjs.Sprite(animationASpriteSheet);
  animationVokalA.x =  canvas.width / 2 - 285;
  animationVokalA.y = canvas.height / 2 + 30 ; // Adjust this value if needed
  animationVokalA.scale = 1.3;
  animationVokalA.on("animationend", ()=> {handleAnimationEnd("a")});

  let animationISpriteSheet = new createjs.SpriteSheet({
    images: [queue.getResult("spreadsheet_i")],
    framerate: 30,
    frames: [[0,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[364,0,364,337,0,14.8,129.8],[728,0,364,337,0,14.8,129.8],[1092,0,364,337,0,14.8,129.8],[1456,0,364,337,0,14.8,129.8],[1820,0,364,337,0,14.8,129.8],[2184,0,364,337,0,14.8,129.8],[2548,0,364,337,0,14.8,129.8],[2912,0,364,337,0,14.8,129.8],[3276,0,364,337,0,14.8,129.8],[3640,0,364,337,0,14.8,129.8],[0,337,364,337,0,14.8,129.8],[364,337,364,337,0,14.8,129.8],[728,337,364,337,0,14.8,129.8],[1092,337,364,337,0,14.8,129.8],[1456,337,364,337,0,14.8,129.8],[1820,337,364,337,0,14.8,129.8],[2184,337,364,337,0,14.8,129.8],[2548,337,364,337,0,14.8,129.8],[2912,337,364,337,0,14.8,129.8],[3276,337,364,337,0,14.8,129.8],[3640,337,364,337,0,14.8,129.8],[0,674,364,337,0,14.8,129.8],[364,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[728,674,364,337,0,14.8,129.8],[1092,674,364,337,0,14.8,129.8],[1092,674,364,337,0,14.8,129.8],[1456,674,364,337,0,14.8,129.8],[1456,674,364,337,0,14.8,129.8],[1820,674,364,337,0,14.8,129.8],[1820,674,364,337,0,14.8,129.8],[2184,674,364,337,0,14.8,129.8],[2184,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2548,674,364,337,0,14.8,129.8],[2912,674,387,359,0,28.8,142.8],[3299,674,377,353,0,14.8,145.8],[3676,674,380,356,0,14.8,148.8],[0,1033,383,358,0,14.8,150.8],[383,1033,386,361,0,14.8,153.8],[769,1033,389,363,0,14.8,155.8],[1158,1033,392,366,0,14.8,158.8],[1550,1033,396,369,0,14.8,161.8],[1946,1033,399,371,0,14.8,163.8],[2345,1033,402,374,0,14.8,166.8],[2747,1033,405,376,0,14.8,168.8],[3152,1033,408,379,0,14.8,171.8],[3560,1033,411,382,0,14.8,174.8],[0,1415,415,384,0,14.8,176.8],[415,1415,418,387,0,14.8,179.8],[833,1415,421,390,0,14.8,182.8],[1254,1415,424,392,0,14.8,184.8],[1678,1415,427,395,0,14.8,187.8],[2105,1415,427,395,0,14.8,187.8],[2532,1415,427,395,0,14.8,187.8],[2959,1415,427,395,0,14.8,187.8],[3386,1415,427,395,0,14.8,187.8],[0,1810,427,395,0,14.8,187.8],[427,1810,427,395,0,14.8,187.8],[854,1810,427,395,0,14.8,187.8],[1281,1810,427,395,0,14.8,187.8]],
    animations: {
      run: [0,114, "end"],
      end: [114, 114],
      stop: [0]
    }
  });
  animationVokalI= new createjs.Sprite(animationISpriteSheet);
  animationVokalI.x =  canvas.width / 2 - 300;
  animationVokalI.y = canvas.height / 2 + 26 ; // Adjust this value if needed
  animationVokalI.scale = 1.3;
  animationVokalI.on("animationend", ()=> {handleAnimationEnd("i")});


  let animationUSpriteSheet = new createjs.SpriteSheet({
    images: [queue.getResult("spreadsheet_u")],
    framerate: 30,
    frames: [[0,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[364,0,364,337,0,308.8,359.25],[728,0,364,337,0,308.8,359.25],[1092,0,364,337,0,308.8,359.25],[1456,0,364,337,0,308.8,359.25],[1820,0,364,337,0,308.8,359.25],[2184,0,364,337,0,308.8,359.25],[2548,0,364,337,0,308.8,359.25],[2912,0,364,337,0,308.8,359.25],[3276,0,364,337,0,308.8,359.25],[3640,0,364,337,0,308.8,359.25],[0,337,364,337,0,308.8,359.25],[364,337,364,337,0,308.8,359.25],[364,337,364,337,0,308.8,359.25],[364,337,364,337,0,308.8,359.25],[728,337,364,337,0,308.8,359.25],[1092,337,364,337,0,308.8,359.25],[1456,337,364,337,0,308.8,359.25],[1820,337,364,337,0,308.8,359.25],[2184,337,364,337,0,308.8,359.25],[2548,337,364,337,0,308.8,359.25],[2912,337,364,337,0,308.8,359.25],[3276,337,364,337,0,308.8,359.25],[3640,337,364,337,0,308.8,359.25],[0,674,364,337,0,308.8,359.25],[364,674,364,337,0,308.8,359.25],[728,674,364,337,0,308.8,359.25],[1092,674,364,337,0,308.8,359.25],[1092,674,364,337,0,308.8,359.25],[1092,674,364,337,0,308.8,359.25],[1092,674,364,337,0,308.8,359.25],[1092,674,364,337,0,308.8,359.25],[1092,674,364,337,0,308.8,359.25],[1456,674,364,337,0,308.8,359.25],[1820,674,364,337,0,308.8,359.25],[2184,674,364,337,0,308.8,359.25],[2548,674,364,337,0,308.8,359.25],[2912,674,364,337,0,308.8,359.25],[3276,674,364,337,0,308.8,359.25],[3640,674,364,337,0,308.8,359.25],[0,1011,364,337,0,308.8,359.25],[364,1011,364,337,0,308.8,359.25],[728,1011,364,337,0,308.8,359.25],[1092,1011,364,337,0,308.8,359.25],[1456,1011,364,337,0,308.8,359.25],[1820,1011,364,337,0,308.8,359.25],[2184,1011,364,337,0,308.8,359.25],[2548,1011,364,337,0,308.8,359.25],[2912,1011,364,337,0,308.8,359.25],[3276,1011,364,337,0,308.8,359.25],[3640,1011,364,337,0,308.8,359.25],[0,1348,364,337,0,308.8,359.25],[364,1348,364,337,0,308.8,359.25],[728,1348,364,337,0,308.8,359.25],[1092,1348,364,337,0,308.8,359.25],[1456,1348,364,337,0,308.8,359.25],[1820,1348,364,337,0,308.8,359.25],[2184,1348,364,337,0,308.8,359.25],[2548,1348,364,337,0,308.8,359.25],[2912,1348,364,337,0,308.8,359.25],[3276,1348,364,337,0,308.8,359.25],[3640,1348,364,337,0,308.8,359.25],[0,1685,364,337,0,308.8,359.25],[364,1685,364,337,0,308.8,359.25],[364,1685,364,337,0,308.8,359.25],[364,1685,364,337,0,308.8,359.25],[364,1685,364,337,0,308.8,359.25],[364,1685,364,337,0,308.8,359.25],[728,1685,364,337,0,308.8,359.25],[1092,1685,367,340,0,308.8,362.25],[1459,1685,371,343,0,308.8,365.25],[1830,1685,375,346,0,308.8,368.25],[2205,1685,379,350,0,308.8,372.25],[2584,1685,383,353,0,308.8,375.25],[2967,1685,387,356,0,308.8,378.25],[3354,1685,392,360,0,308.8,382.25],[0,2045,396,363,0,308.8,385.25],[396,2045,400,366,0,308.8,388.25],[796,2045,404,370,0,308.8,392.25],[1200,2045,408,373,0,308.8,395.25],[1608,2045,412,376,0,308.8,398.25],[2020,2045,416,379,0,308.8,401.25],[2436,2045,421,382,0,308.8,404.25],[2857,2045,425,386,0,308.8,408.25],[3282,2045,429,389,0,308.8,411.25],[0,2434,433,392,0,308.8,414.25],[433,2434,433,392,0,308.8,414.25],[866,2434,433,392,0,308.8,414.25],[1299,2434,433,392,0,308.8,414.25],[1732,2434,433,392,0,308.8,414.25],[2165,2434,433,392,0,308.8,414.25],[2598,2434,433,392,0,308.8,414.25],[3031,2434,433,392,0,308.8,414.25],[3464,2434,433,392,0,308.8,414.25]],
    animations: {
      run: [0,121, "end"],
      end: [121, 121],
      stop: [0]
    }
  });
  animationVokalU= new createjs.Sprite(animationUSpriteSheet);
  animationVokalU.x =  canvas.width / 2 + 80;
  animationVokalU.y = canvas.height / 2 + 320; // Adjust this value if needed
  animationVokalU.scale = 1.3;
  animationVokalU.on("animationend", ()=> {handleAnimationEnd("u")});


  let animationE1SpriteSheet = new createjs.SpriteSheet({
    images: [queue.getResult("spreadsheet_e")],
    framerate: 30,
    frames: [[0,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[728,0,364,337,0,14.8,130.15],[1092,0,364,337,0,14.8,130.15],[1456,0,364,337,0,14.8,130.15],[1820,0,364,337,0,14.8,130.15],[2184,0,364,337,0,14.8,130.15],[2548,0,364,337,0,14.8,130.15],[2912,0,364,337,0,14.8,130.15],[3276,0,364,337,0,14.8,130.15],[3640,0,364,337,0,14.8,130.15],[4004,0,364,337,0,14.8,130.15],[4368,0,364,337,0,14.8,130.15],[4732,0,364,337,0,14.8,130.15],[5096,0,364,337,0,14.8,130.15],[5460,0,364,337,0,14.8,130.15],[5824,0,364,337,0,14.8,130.15],[6188,0,364,337,0,14.8,130.15],[6552,0,364,337,0,14.8,130.15],[6916,0,364,337,0,14.8,130.15],[7280,0,364,337,0,14.8,130.15],[7644,0,364,337,0,14.8,130.15],[0,337,364,337,0,14.8,130.15],[364,337,364,337,0,14.8,130.15],[728,337,364,337,0,14.8,130.15],[1092,337,364,337,0,14.8,130.15],[1456,337,364,337,0,14.8,130.15],[1456,337,364,337,0,14.8,130.15],[1456,337,364,337,0,14.8,130.15],[1456,337,364,337,0,14.8,130.15],[1456,337,364,337,0,14.8,130.15],[1820,337,364,337,0,14.8,130.15],[2184,337,364,337,0,14.8,130.15],[2548,337,364,337,0,14.8,130.15],[2912,337,364,337,0,14.8,130.15],[3276,337,364,337,0,14.8,130.15],[3640,337,364,337,0,14.8,130.15],[4004,337,364,337,0,14.8,130.15],[4368,337,364,337,0,14.8,130.15],[4732,337,364,337,0,14.8,130.15],[5096,337,364,337,0,14.8,130.15],[5460,337,364,337,0,14.8,130.15],[5824,337,364,337,0,14.8,130.15],[6188,337,364,337,0,14.8,130.15],[6552,337,364,337,0,14.8,130.15],[6916,337,364,337,0,14.8,130.15],[7280,337,364,337,0,14.8,130.15],[7644,337,364,337,0,14.8,130.15],[0,674,364,337,0,14.8,130.15],[364,674,364,337,0,14.8,130.15],[728,674,364,337,0,14.8,130.15],[1092,674,364,337,0,14.8,130.15],[1456,674,364,337,0,14.8,130.15],[1820,674,364,337,0,14.8,130.15],[2184,674,364,337,0,14.8,130.15],[2548,674,364,337,0,14.8,130.15],[2912,674,364,337,0,14.8,130.15],[3276,674,364,337,0,14.8,130.15],[3640,674,364,337,0,14.8,130.15],[4004,674,364,337,0,14.8,130.15],[4368,674,364,337,0,14.8,130.15],[4732,674,364,337,0,14.8,130.15],[5096,674,364,337,0,14.8,130.15],[5460,674,364,337,0,14.8,130.15],[5824,674,364,337,0,14.8,130.15],[6188,674,364,337,0,14.8,130.15],[6552,674,364,337,0,14.8,130.15],[6916,674,364,337,0,14.8,130.15],[7280,674,364,337,0,14.8,130.15],[7644,674,364,337,0,14.8,130.15],[0,1011,364,337,0,14.8,130.15],[364,1011,364,337,0,14.8,130.15],[728,1011,364,337,0,14.8,130.15],[1092,1011,364,337,0,14.8,130.15],[1456,1011,364,337,0,14.8,130.15],[1820,1011,364,337,0,14.8,130.15],[2184,1011,364,337,0,14.8,130.15],[2548,1011,364,337,0,14.8,130.15],[2912,1011,364,337,0,14.8,130.15],[3276,1011,364,337,0,14.8,130.15],[3640,1011,364,337,0,14.8,130.15],[4004,1011,364,337,0,14.8,130.15],[4368,1011,364,337,0,14.8,130.15],[4732,1011,364,337,0,14.8,130.15],[5096,1011,364,337,0,14.8,130.15],[5460,1011,364,337,0,14.8,130.15],[5824,1011,364,337,0,14.8,130.15],[6188,1011,364,337,0,14.8,130.15],[6552,1011,364,337,0,14.8,130.15],[6916,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7644,1011,387,358,0,28.8,143.15],[0,1369,377,353,0,14.8,146.15],[377,1369,380,356,0,14.8,149.15],[757,1369,383,358,0,14.8,151.15],[1140,1369,387,361,0,14.8,154.15],[1527,1369,390,364,0,14.8,157.15],[1917,1369,393,366,0,14.8,159.15],[2310,1369,396,369,0,14.8,162.15],[2706,1369,400,371,0,14.8,164.15],[3106,1369,403,374,0,14.8,167.15],[3509,1369,406,377,0,14.8,170.15],[3915,1369,409,379,0,14.8,172.15],[4324,1369,413,382,0,14.8,175.15],[4737,1369,416,385,0,14.8,178.15],[5153,1369,419,387,0,14.8,180.15],[5572,1369,423,390,0,14.8,183.15],[5995,1369,426,393,0,14.8,186.15],[6421,1369,429,395,0,14.8,188.15],[6850,1369,429,395,0,14.8,188.15],[7279,1369,429,395,0,14.8,188.15],[7708,1369,429,395,0,14.8,188.15],[0,1764,429,395,0,14.8,188.15],[429,1764,429,395,0,14.8,188.15],[858,1764,429,395,0,14.8,188.15],[1287,1764,429,395,0,14.8,188.15],[1716,1764,429,395,0,14.8,188.15],[1716,1764,429,395,0,14.8,188.15]],
    animations: {
      run: [0,165, "end"],
      end: [165, 165],
      stop: [0]
    }
  });
  animationVokalE1= new createjs.Sprite(animationE1SpriteSheet);
  animationVokalE1.x =  200 ;
  animationVokalE1.y = canvas.height / 2 + 26; // Adjust this value if needed
  animationVokalE1.scale = 1.30;
  animationVokalE1.on("animationend", ()=> {handleAnimationEnd("e1")});


  let animationE2SpriteSheet = new createjs.SpriteSheet({
    images: [queue.getResult("spreadsheet_e")],
    framerate: 30,
    frames: [[0,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[364,0,364,337,0,14.8,130.15],[728,0,364,337,0,14.8,130.15],[1092,0,364,337,0,14.8,130.15],[1456,0,364,337,0,14.8,130.15],[1820,0,364,337,0,14.8,130.15],[2184,0,364,337,0,14.8,130.15],[2548,0,364,337,0,14.8,130.15],[2912,0,364,337,0,14.8,130.15],[3276,0,364,337,0,14.8,130.15],[3640,0,364,337,0,14.8,130.15],[4004,0,364,337,0,14.8,130.15],[4368,0,364,337,0,14.8,130.15],[4732,0,364,337,0,14.8,130.15],[5096,0,364,337,0,14.8,130.15],[5460,0,364,337,0,14.8,130.15],[5824,0,364,337,0,14.8,130.15],[6188,0,364,337,0,14.8,130.15],[6552,0,364,337,0,14.8,130.15],[6916,0,364,337,0,14.8,130.15],[7280,0,364,337,0,14.8,130.15],[7644,0,364,337,0,14.8,130.15],[0,337,364,337,0,14.8,130.15],[364,337,364,337,0,14.8,130.15],[728,337,364,337,0,14.8,130.15],[1092,337,364,337,0,14.8,130.15],[1456,337,364,337,0,14.8,130.15],[1456,337,364,337,0,14.8,130.15],[1456,337,364,337,0,14.8,130.15],[1456,337,364,337,0,14.8,130.15],[1456,337,364,337,0,14.8,130.15],[1820,337,364,337,0,14.8,130.15],[2184,337,364,337,0,14.8,130.15],[2548,337,364,337,0,14.8,130.15],[2912,337,364,337,0,14.8,130.15],[3276,337,364,337,0,14.8,130.15],[3640,337,364,337,0,14.8,130.15],[4004,337,364,337,0,14.8,130.15],[4368,337,364,337,0,14.8,130.15],[4732,337,364,337,0,14.8,130.15],[5096,337,364,337,0,14.8,130.15],[5460,337,364,337,0,14.8,130.15],[5824,337,364,337,0,14.8,130.15],[6188,337,364,337,0,14.8,130.15],[6552,337,364,337,0,14.8,130.15],[6916,337,364,337,0,14.8,130.15],[7280,337,364,337,0,14.8,130.15],[7644,337,364,337,0,14.8,130.15],[0,674,364,337,0,14.8,130.15],[364,674,364,337,0,14.8,130.15],[728,674,364,337,0,14.8,130.15],[1092,674,364,337,0,14.8,130.15],[1456,674,364,337,0,14.8,130.15],[1820,674,364,337,0,14.8,130.15],[2184,674,364,337,0,14.8,130.15],[2548,674,364,337,0,14.8,130.15],[2912,674,364,337,0,14.8,130.15],[3276,674,364,337,0,14.8,130.15],[3640,674,364,337,0,14.8,130.15],[4004,674,364,337,0,14.8,130.15],[4368,674,364,337,0,14.8,130.15],[4732,674,364,337,0,14.8,130.15],[5096,674,364,337,0,14.8,130.15],[5460,674,364,337,0,14.8,130.15],[5824,674,364,337,0,14.8,130.15],[6188,674,364,337,0,14.8,130.15],[6552,674,364,337,0,14.8,130.15],[6916,674,364,337,0,14.8,130.15],[7280,674,364,337,0,14.8,130.15],[7644,674,364,337,0,14.8,130.15],[0,1011,364,337,0,14.8,130.15],[364,1011,364,337,0,14.8,130.15],[728,1011,364,337,0,14.8,130.15],[1092,1011,364,337,0,14.8,130.15],[1456,1011,364,337,0,14.8,130.15],[1820,1011,364,337,0,14.8,130.15],[2184,1011,364,337,0,14.8,130.15],[2548,1011,364,337,0,14.8,130.15],[2912,1011,364,337,0,14.8,130.15],[3276,1011,364,337,0,14.8,130.15],[3640,1011,364,337,0,14.8,130.15],[4004,1011,364,337,0,14.8,130.15],[4368,1011,364,337,0,14.8,130.15],[4732,1011,364,337,0,14.8,130.15],[5096,1011,364,337,0,14.8,130.15],[5460,1011,364,337,0,14.8,130.15],[5824,1011,364,337,0,14.8,130.15],[6188,1011,364,337,0,14.8,130.15],[6552,1011,364,337,0,14.8,130.15],[6916,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7280,1011,364,337,0,14.8,130.15],[7644,1011,387,358,0,28.8,143.15],[0,1369,377,353,0,14.8,146.15],[377,1369,380,356,0,14.8,149.15],[757,1369,383,358,0,14.8,151.15],[1140,1369,387,361,0,14.8,154.15],[1527,1369,390,364,0,14.8,157.15],[1917,1369,393,366,0,14.8,159.15],[2310,1369,396,369,0,14.8,162.15],[2706,1369,400,371,0,14.8,164.15],[3106,1369,403,374,0,14.8,167.15],[3509,1369,406,377,0,14.8,170.15],[3915,1369,409,379,0,14.8,172.15],[4324,1369,413,382,0,14.8,175.15],[4737,1369,416,385,0,14.8,178.15],[5153,1369,419,387,0,14.8,180.15],[5572,1369,423,390,0,14.8,183.15],[5995,1369,426,393,0,14.8,186.15],[6421,1369,429,395,0,14.8,188.15],[6850,1369,429,395,0,14.8,188.15],[7279,1369,429,395,0,14.8,188.15],[7708,1369,429,395,0,14.8,188.15],[0,1764,429,395,0,14.8,188.15],[429,1764,429,395,0,14.8,188.15],[858,1764,429,395,0,14.8,188.15],[1287,1764,429,395,0,14.8,188.15],[1716,1764,429,395,0,14.8,188.15],[1716,1764,429,395,0,14.8,188.15]],
    animations: {
      run: [0,165, "end"],
      end: [165, 165],
      stop: [0]
    }
  });
  animationVokalE2= new createjs.Sprite(animationE2SpriteSheet);
  animationVokalE2.x =  200 ;
  animationVokalE2.y = canvas.height / 2 + 26; // Adjust this value if needed
  animationVokalE2.scale = 1.30;
  animationVokalE2.on("animationend", ()=> {handleAnimationEnd("e2")});


  let animationOSpriteSheet = new createjs.SpriteSheet({
    images: [queue.getResult("spreadsheet_o")],
    framerate: 30,
    frames: [[0,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[364,0,364,337,0,14.8,131.15],[728,0,364,337,0,14.8,131.15],[1092,0,364,337,0,14.8,131.15],[1456,0,364,337,0,14.8,131.15],[1820,0,364,337,0,14.8,131.15],[2184,0,364,337,0,14.8,131.15],[2548,0,364,337,0,14.8,131.15],[2912,0,364,337,0,14.8,131.15],[3276,0,364,337,0,14.8,131.15],[3640,0,364,337,0,14.8,131.15],[0,337,364,337,0,14.8,131.15],[364,337,364,337,0,14.8,131.15],[728,337,364,337,0,14.8,131.15],[1092,337,364,337,0,14.8,131.15],[1456,337,364,337,0,14.8,131.15],[1820,337,364,337,0,14.8,131.15],[2184,337,364,337,0,14.8,131.15],[2548,337,364,337,0,14.8,131.15],[2912,337,364,337,0,14.8,131.15],[3276,337,364,337,0,14.8,131.15],[3640,337,364,337,0,14.8,131.15],[0,674,364,337,0,14.8,131.15],[364,674,364,337,0,14.8,131.15],[728,674,364,337,0,14.8,131.15],[1092,674,364,337,0,14.8,131.15],[1456,674,364,337,0,14.8,131.15],[1820,674,364,337,0,14.8,131.15],[2184,674,364,337,0,14.8,131.15],[2548,674,364,337,0,14.8,131.15],[2912,674,364,337,0,14.8,131.15],[3276,674,364,337,0,14.8,131.15],[3640,674,364,337,0,14.8,131.15],[0,1011,364,337,0,14.8,131.15],[364,1011,364,337,0,14.8,131.15],[728,1011,364,337,0,14.8,131.15],[1092,1011,364,337,0,14.8,131.15],[1456,1011,364,337,0,14.8,131.15],[1820,1011,364,337,0,14.8,131.15],[2184,1011,364,337,0,14.8,131.15],[2548,1011,364,337,0,14.8,131.15],[2912,1011,364,337,0,14.8,131.15],[3276,1011,364,337,0,14.8,131.15],[3640,1011,364,337,0,14.8,131.15],[0,1348,364,337,0,14.8,131.15],[364,1348,364,337,0,14.8,131.15],[728,1348,364,337,0,14.8,131.15],[1092,1348,364,337,0,14.8,131.15],[1456,1348,364,337,0,14.8,131.15],[1820,1348,364,337,0,14.8,131.15],[2184,1348,364,337,0,14.8,131.15],[2548,1348,364,337,0,14.8,131.15],[2912,1348,364,337,0,14.8,131.15],[3276,1348,364,337,0,14.8,131.15],[3640,1348,364,337,0,14.8,131.15],[0,1685,364,337,0,14.8,131.15],[364,1685,364,337,0,14.8,131.15],[728,1685,364,337,0,14.8,131.15],[1092,1685,364,337,0,14.8,131.15],[1456,1685,364,337,0,14.8,131.15],[1820,1685,364,337,0,14.8,131.15],[2184,1685,364,337,0,14.8,131.15],[2184,1685,364,337,0,14.8,131.15],[2184,1685,364,337,0,14.8,131.15],[2184,1685,364,337,0,14.8,131.15],[2184,1685,364,337,0,14.8,131.15],[2548,1685,387,358,0,28.8,144.15],[2935,1685,377,353,0,14.8,147.15],[3312,1685,380,356,0,14.8,150.15],[3692,1685,383,358,0,14.8,152.15],[0,2043,386,361,0,14.8,155.15],[386,2043,390,364,0,14.8,158.15],[776,2043,393,366,0,14.8,160.15],[1169,2043,396,369,0,14.8,163.15],[1565,2043,400,371,0,14.8,165.15],[1965,2043,403,374,0,14.8,168.15],[2368,2043,406,377,0,14.8,171.15],[2774,2043,409,379,0,14.8,173.15],[3183,2043,413,382,0,14.8,176.15],[3596,2043,416,385,0,14.8,179.15],[0,2428,419,387,0,14.8,181.15],[419,2428,423,389,0,14.8,183.15],[842,2428,426,392,0,14.8,186.15],[1268,2428,429,394,0,14.8,188.15],[1697,2428,429,394,0,14.8,188.15],[2126,2428,429,394,0,14.8,188.15],[2555,2428,429,394,0,14.8,188.15],[2984,2428,429,394,0,14.8,188.15],[3413,2428,429,394,0,14.8,188.15],[0,2822,429,394,0,14.8,188.15],[429,2822,429,394,0,14.8,188.15],[858,2822,429,394,0,14.8,188.15]],
    animations: {
      run: [0,119, "end"],
      end: [119, 119],
      stop: [0]
    }
  });
  animationVokalO= new createjs.Sprite(animationOSpriteSheet);
  animationVokalO.x =  200 ;
  animationVokalO.y = canvas.height / 2 + 26; // Adjust this value if needed
  animationVokalO.scale = 1.30;
  animationVokalO.on("animationend", ()=> {handleAnimationEnd("o")});
}
function handleAnimationEnd(letter){
  /*
  * display the button with images for a vokal
  * */
  switch(letter){
    case "a":
      let btnApiSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_api_01"), // Normal state
          queue.getResult("btn_api_02")  // Hover / Click state
        ],
        frames: { width: 218, height: 206 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnApi = new createjs.Sprite(btnApiSpriteSheet, "normal");
      btnApi.mouseEnabled = true;
      btnApi.mouseChildren = true;
      btnApi.cursor = "pointer";
      btnApi.y = canvas.height/2;
      btnApi.x = 110;
      btnApi.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnApi.on("mouseover", () => {
        btnApi.gotoAndStop("hover");
      });
      btnApi.on("mouseout", () => {
        btnApi.gotoAndStop("normal");
      });
      btnApi.on("click", () => {
        btnApi.gotoAndStop("hover");
        displayImageTextOnTv("api")
        playSound("sound_api");
      });
      stage.addChild(btnApi);


      let btnAwanSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_awan_01"), // Normal state
          queue.getResult("btn_awan_02")  // Hover / Click state
        ],
        frames: { width: 254, height: 206 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnAwan = new createjs.Sprite(btnAwanSpriteSheet, "normal");
      btnAwan.mouseEnabled = true;
      btnAwan.mouseChildren = true;
      btnAwan.cursor = "pointer";
      btnAwan.y = canvas.height/2 + 70;
      btnAwan.x = 110;
      btnAwan.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnAwan.on("mouseover", () => {
        btnAwan.gotoAndStop("hover");
      });
      btnAwan.on("mouseout", () => {
        btnAwan.gotoAndStop("normal");
      });
      btnAwan.on("click", () => {
        btnAwan.gotoAndStop("hover");
        displayImageTextOnTv("awan")
        playSound("sound_awan");

      });
      stage.addChild(btnAwan);


      let btnAyamSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_ayam_01"), // Normal state
          queue.getResult("btn_ayam_02")  // Hover / Click state
        ],
        frames: { width: 218, height: 225 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnAyam = new createjs.Sprite(btnAyamSpriteSheet, "normal");
      btnAyam.mouseEnabled = true;
      btnAyam.mouseChildren = true;
      btnAyam.cursor = "pointer";
      btnAyam.y = canvas.height/2 + 140;
      btnAyam.x = 110;
      btnAyam.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnAyam.on("mouseover", () => {
        btnAyam.gotoAndStop("hover");
      });
      btnAyam.on("mouseout", () => {
        btnAyam.gotoAndStop("normal");
      });
      btnAyam.on("click", () => {
        btnAyam.gotoAndStop("hover");
        displayImageTextOnTv("ayam");
        playSound("sound_ayam");

      });
      stage.addChild(btnAyam);

      displayedVokalButtons.push(btnApi);
      displayedVokalButtons.push(btnAwan);
      displayedVokalButtons.push(btnAyam);

      break;

    case "i":
      let btnIbuSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_ibu_01"), // Normal state
          queue.getResult("btn_ibu_02")  // Hover / Click state
        ],
        frames: { width: 218, height: 221 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnIbu = new createjs.Sprite(btnIbuSpriteSheet, "normal");
      btnIbu.mouseEnabled = true;
      btnIbu.mouseChildren = true;
      btnIbu.cursor = "pointer";
      btnIbu.y = canvas.height/2;
      btnIbu.x = 110;
      btnIbu.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnIbu.on("mouseover", () => {
        btnIbu.gotoAndStop("hover");
      });
      btnIbu.on("mouseout", () => {
        btnIbu.gotoAndStop("normal");
      });
      btnIbu.on("click", () => {
        btnIbu.gotoAndStop("hover");
        displayImageTextOnTv("ibu");
        playSound("sound_ibu");

      });
      stage.addChild(btnIbu);


      let btnIkanSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_ikan_01"), // Normal state
          queue.getResult("btn_ikan_02")  // Hover / Click state
        ],
        frames: { width: 218, height: 207 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnIkan = new createjs.Sprite(btnIkanSpriteSheet, "normal");
      btnIkan.mouseEnabled = true;
      btnIkan.mouseChildren = true;
      btnIkan.cursor = "pointer";
      btnIkan.y = canvas.height/2 + 70;
      btnIkan.x = 110;
      btnIkan.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnIkan.on("mouseover", () => {
        btnIkan.gotoAndStop("hover");
      });
      btnIkan.on("mouseout", () => {
        btnIkan.gotoAndStop("normal");
      });
      btnIkan.on("click", () => {
        btnIkan.gotoAndStop("hover");
        displayImageTextOnTv("ikan");
        playSound("sound_ikan");

      });
      stage.addChild(btnIkan);


      let btnItikSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_itik_01"), // Normal state
          queue.getResult("btn_itik_02")  // Hover / Click state
        ],
        frames: { width: 218, height: 217 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnItik = new createjs.Sprite(btnItikSpriteSheet, "normal");
      btnItik.mouseEnabled = true;
      btnItik.mouseChildren = true;
      btnItik.cursor = "pointer";
      btnItik.y = canvas.height/2 + 140;
      btnItik.x = 110;
      btnItik.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnItik.on("mouseover", () => {
        btnItik.gotoAndStop("hover");
      });
      btnItik.on("mouseout", () => {
        btnItik.gotoAndStop("normal");
      });
      btnItik.on("click", () => {
        btnItik.gotoAndStop("hover");
        displayImageTextOnTv("itik");
        playSound("sound_itik");

      });
      stage.addChild(btnItik);

      displayedVokalButtons.push(btnIbu);
      displayedVokalButtons.push(btnItik);
      displayedVokalButtons.push(btnIkan);
      break;

    case "u":
      let btnUbiSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_ubi_01"), // Normal state
          queue.getResult("btn_ubi_02")  // Hover / Click state
        ],
        frames: { width: 226, height: 206 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnUbi = new createjs.Sprite(btnUbiSpriteSheet, "normal");
      btnUbi.mouseEnabled = true;
      btnUbi.mouseChildren = true;
      btnUbi.cursor = "pointer";
      btnUbi.y = canvas.height/2;
      btnUbi.x = 110;
      btnUbi.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnUbi.on("mouseover", () => {
        btnUbi.gotoAndStop("hover");
      });
      btnUbi.on("mouseout", () => {
        btnUbi.gotoAndStop("normal");
      });
      btnUbi.on("click", () => {
        btnUbi.gotoAndStop("hover");
        displayImageTextOnTv("ubi");
        playSound("sound_ubi");

      });
      stage.addChild(btnUbi);


      let btnUlarSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_ular_01"), // Normal state
          queue.getResult("btn_ular_02")  // Hover / Click state
        ],
        frames: { width: 218, height: 206 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnUlar = new createjs.Sprite(btnUlarSpriteSheet, "normal");
      btnUlar.mouseEnabled = true;
      btnUlar.mouseChildren = true;
      btnUlar.cursor = "pointer";
      btnUlar.y = canvas.height/2 + 70;
      btnUlar.x = 110;
      btnUlar.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnUlar.on("mouseover", () => {
        btnUlar.gotoAndStop("hover");
      });
      btnUlar.on("mouseout", () => {
        btnUlar.gotoAndStop("normal");
      });
      btnUlar.on("click", () => {
        btnUlar.gotoAndStop("hover");
        displayImageTextOnTv("ular");
        playSound("sound_ular");

      });
      stage.addChild(btnUlar);


      let btnUlatSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_ulat_01"), // Normal state
          queue.getResult("btn_ulat_02")  // Hover / Click state
        ],
        frames: { width: 243, height: 206 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnUlat = new createjs.Sprite(btnUlatSpriteSheet, "normal");
      btnUlat.mouseEnabled = true;
      btnUlat.mouseChildren = true;
      btnUlat.cursor = "pointer";
      btnUlat.y = canvas.height/2 + 140;
      btnUlat.x = 110;
      btnUlat.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnUlat.on("mouseover", () => {
        btnUlat.gotoAndStop("hover");
      });
      btnUlat.on("mouseout", () => {
        btnUlat.gotoAndStop("normal");
      });
      btnUlat.on("click", () => {
        btnUlat.gotoAndStop("hover");
        displayImageTextOnTv("ulat");
        playSound("sound_ulat");

      });
      stage.addChild(btnUlat);

      displayedVokalButtons.push(btnUbi);
      displayedVokalButtons.push(btnUlar);
      displayedVokalButtons.push(btnUlat);
      break;

    case "e1":
      let btnEmakSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_emak_01"), // Normal state
          queue.getResult("btn_emak_02")  // Hover / Click state
        ],
        frames: { width: 218, height: 217 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnEmak = new createjs.Sprite(btnEmakSpriteSheet, "normal");
      btnEmak.mouseEnabled = true;
      btnEmak.mouseChildren = true;
      btnEmak.cursor = "pointer";
      btnEmak.y = canvas.height/2;
      btnEmak.x = 110;
      btnEmak.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnEmak.on("mouseover", () => {
        btnEmak.gotoAndStop("hover");
      });
      btnEmak.on("mouseout", () => {
        btnEmak.gotoAndStop("normal");
      });
      btnEmak.on("click", () => {
        btnEmak.gotoAndStop("hover");
        displayImageTextOnTv("emak");
        playSound("sound_emak");

      });
      stage.addChild(btnEmak);


      let btnEmasSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_emas_01"), // Normal state
          queue.getResult("btn_emas_02")  // Hover / Click state
        ],
        frames: { width: 300, height: 215 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnEmas = new createjs.Sprite(btnEmasSpriteSheet, "normal");
      btnEmas.mouseEnabled = true;
      btnEmas.mouseChildren = true;
      btnEmas.cursor = "pointer";
      btnEmas.y = canvas.height/2 + 70;
      btnEmas.x = 110;
      btnEmas.scale = .25; // Apply scaling
      // Add event listeners for hover and click
      btnEmas.on("mouseover", () => {
        btnEmas.gotoAndStop("hover");
      });
      btnEmas.on("mouseout", () => {
        btnEmas.gotoAndStop("normal");
      });
      btnEmas.on("click", () => {
        btnEmas.gotoAndStop("hover");
        displayImageTextOnTv("emas");
        playSound("sound_emas");

      });
      stage.addChild(btnEmas);


      let btnEnamSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_enam_01"), // Normal state
          queue.getResult("btn_enam_02")  // Hover / Click state
        ],
        frames: { width: 218, height: 206 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnEnam = new createjs.Sprite(btnEnamSpriteSheet, "normal");
      btnEnam.mouseEnabled = true;
      btnEnam.mouseChildren = true;
      btnEnam.cursor = "pointer";
      btnEnam.y = canvas.height/2 + 140;
      btnEnam.x = 110;
      btnEnam.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnEnam.on("mouseover", () => {
        btnEnam.gotoAndStop("hover");
      });
      btnEnam.on("mouseout", () => {
        btnEnam.gotoAndStop("normal");
      });
      btnEnam.on("click", () => {
        btnEnam.gotoAndStop("hover");
        displayImageTextOnTv("enam");
        playSound("sound_enam");

      });
      stage.addChild(btnEnam);

      displayedVokalButtons.push(btnEmak);
      displayedVokalButtons.push(btnEmas);
      displayedVokalButtons.push(btnEnam);
      break;

    case "e2":
      let btnEkorSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_ekor_01"), // Normal state
          queue.getResult("btn_ekor_02")  // Hover / Click state
        ],
        frames: { width: 242, height: 206 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnEkor = new createjs.Sprite(btnEkorSpriteSheet, "normal");
      btnEkor.mouseEnabled = true;
      btnEkor.mouseChildren = true;
      btnEkor.cursor = "pointer";
      btnEkor.y = canvas.height/2;
      btnEkor.x = 110;
      btnEkor.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnEkor.on("mouseover", () => {
        btnEkor.gotoAndStop("hover");
      });
      btnEkor.on("mouseout", () => {
        btnEkor.gotoAndStop("normal");
      });
      btnEkor.on("click", () => {
        btnEkor.gotoAndStop("hover");
        displayImageTextOnTv("ekor");
        playSound("sound_ekor");

      });
      stage.addChild(btnEkor);


      let btnEpalSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_epal_01"), // Normal state
          queue.getResult("btn_epal_02")  // Hover / Click state
        ],
        frames: { width: 218, height: 206 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnEpal = new createjs.Sprite(btnEpalSpriteSheet, "normal");
      btnEpal.mouseEnabled = true;
      btnEpal.mouseChildren = true;
      btnEpal.cursor = "pointer";
      btnEpal.y = canvas.height/2 + 70;
      btnEpal.x = 110;
      btnEpal.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnEpal.on("mouseover", () => {
        btnEpal.gotoAndStop("hover");
      });
      btnEpal.on("mouseout", () => {
        btnEpal.gotoAndStop("normal");
      });
      btnEpal.on("click", () => {
        btnEpal.gotoAndStop("hover");
        displayImageTextOnTv("epal");
        playSound("sound_epal");

      });
      stage.addChild(btnEpal);

      displayedVokalButtons.push(btnEkor);
      displayedVokalButtons.push(btnEpal);
      break;

    case "o":
      let btnOborSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_obor_01"), // Normal state
          queue.getResult("btn_obor_02")  // Hover / Click state
        ],
        frames: { width: 242, height: 209 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnObor = new createjs.Sprite(btnOborSpriteSheet, "normal");
      btnObor.mouseEnabled = true;
      btnObor.mouseChildren = true;
      btnObor.cursor = "pointer";
      btnObor.y = canvas.height/2;
      btnObor.x = 110;
      btnObor.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnObor.on("mouseover", () => {
        btnObor.gotoAndStop("hover");
      });
      btnObor.on("mouseout", () => {
        btnObor.gotoAndStop("normal");
      });
      btnObor.on("click", () => {
        btnObor.gotoAndStop("hover");
        displayImageTextOnTv("obor");
        playSound("sound_obor");

      });
      stage.addChild(btnObor);


      let btnOrenSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_oren_01"), // Normal state
          queue.getResult("btn_oren_02")  // Hover / Click state
        ],
        frames: { width: 218, height: 206 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnOren = new createjs.Sprite(btnOrenSpriteSheet, "normal");
      btnOren.mouseEnabled = true;
      btnOren.mouseChildren = true;
      btnOren.cursor = "pointer";
      btnOren.y = canvas.height/2 + 70;
      btnOren.x = 110;
      btnOren.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnOren.on("mouseover", () => {
        btnOren.gotoAndStop("hover");
      });
      btnOren.on("mouseout", () => {
        btnOren.gotoAndStop("normal");
      });
      btnOren.on("click", () => {
        btnOren.gotoAndStop("hover");
        displayImageTextOnTv("oren");
        playSound("sound_oren");

      });
      stage.addChild(btnOren);


      let btnOtakSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_otak_01"), // Normal state
          queue.getResult("btn_otak_02")  // Hover / Click state
        ],
        frames: { width: 230, height: 206 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnOtak = new createjs.Sprite(btnOtakSpriteSheet, "normal");
      btnOtak.mouseEnabled = true;
      btnOtak.mouseChildren = true;
      btnOtak.cursor = "pointer";
      btnOtak.y = canvas.height/2 + 140;
      btnOtak.x = 110;
      btnOtak.scale = .3; // Apply scaling
      // Add event listeners for hover and click
      btnOtak.on("mouseover", () => {
        btnOtak.gotoAndStop("hover");
      });
      btnOtak.on("mouseout", () => {
        btnOtak.gotoAndStop("normal");
      });
      btnOtak.on("click", () => {
        btnOtak.gotoAndStop("hover");
        displayImageTextOnTv("otak");
        playSound("sound_otak");

      });
      stage.addChild(btnOtak);

      displayedVokalButtons.push(btnObor);
      displayedVokalButtons.push(btnOren);
      displayedVokalButtons.push(btnOtak);
      break;
    default:break;
  }
}
function hideDisplayVokalButtons(){
  /*
  * remove any image buttons at the side of the tv
  * */
  if(displayedVokalButtons.length > 0){
    displayedVokalButtons.forEach((btn)=>{
      stage.removeChild(btn);
    });
  }
}
function hideDisplayImageText(){
  /*
  * remove any image buttons on the tv
  * */
  if(displayedImage){
    stage.removeChild(displayedImage);
    displayedImage = null;
  }
  if(displayedText){
    stage.removeChild(displayedText);
    displayedText= null;
  }
}
function displayImageTextOnTv(word){
  /*
  * display text and image related to the word clicked on tv screen
  * */
  hideDisplayImageText();

  displayedImage  = new createjs.Bitmap(queue.getResult(`btn_${word}_01`));
  displayedImage.regX = displayedImage.image.width / 2;
  displayedImage.regY = displayedImage.image.height / 2;
  displayedImage.x = canvas.width / 2 - 70;
  displayedImage.y = canvas.width / 2 - 150;
  displayedImage.alpha = 0; // Initially hidden
  stage.addChild(displayedImage);

  displayedText  = new createjs.Bitmap(queue.getResult(`text_${word}`));
  displayedText.regX = displayedText.image.width / 2;
  displayedText.regY = displayedText.image.height / 2;
  displayedText.x = canvas.width / 2 - 70;
  displayedText.y = canvas.width / 2 ;
  displayedText.alpha = 0; // Initially hidden
  displayedText.scale = .4;
  stage.addChild(displayedText);

  // Apply fade-in animation (0 to 1 alpha in 1 second)
  createjs.Tween.get(displayedImage).to({ alpha: 1 }, 500, createjs.Ease.quadIn);
  createjs.Tween.get(displayedText).to({ alpha: 1 }, 500, createjs.Ease.quadIn);
}
function navigateToAnotherPage(direction){
  if(playingAnimation){
    playingAnimation.gotoAndPlay("stop");
    stage.removeChild(playingAnimation);
    playingAnimation = null;
  }
  hideDisplayVokalButtons();
  hideDisplayImageText();
  /*
  * to handle page navigation when clicking on next or previous button
  * */
  if(direction === "next"){
    if(currentPage === 1){
      currentPage++;
      stage.removeChild(btnA);
      stage.removeChild(btnU);
      stage.removeChild(btnI);


      let btnE1SpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_e1_01"), // Normal state
          queue.getResult("btn_e1_02")  // Hover / Click state
        ],
        frames: { width: 261, height: 238 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnE1 = new createjs.Sprite(btnE1SpriteSheet, "normal");
      btnE1.mouseEnabled = true;
      btnE1.mouseChildren = true;
      btnE1.cursor = "pointer";
      btnE1.y = canvas.height / 2 - 100;
      btnE1.x = canvas.width - 250;
      btnE1.scale = .4; // Apply scaling
      // Add event listeners for hover and click
      btnE1.on("mouseover", () => {
        btnE1.gotoAndStop("hover");

      });
      btnE1.on("mouseout", () => {
        btnE1.gotoAndStop("normal");
      });
      btnE1.on("click", () => {
        btnE1.gotoAndStop("hover");
        //if there is animation playing,stop the playing animation
        if(playingAnimation){
          playingAnimation.gotoAndPlay("stop");
          stage.removeChild(playingAnimation);
          playingAnimation = null;
        }
        playSound("sound_e1");
        hideDisplayVokalButtons();
        hideDisplayImageText();
        stage.addChild(animationVokalE1);
        animationVokalE1.gotoAndPlay("run");
        playingAnimation = animationVokalE1;
        stage.addChild(btnSubmenu);//required because the button will be covered the letter
      });
      stage.addChild(btnE1);

      let btnE2SpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_e2_01"), // Normal state
          queue.getResult("btn_e2_02")  // Hover / Click state
        ],
        frames: { width: 261, height: 237 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnE2 = new createjs.Sprite(btnE2SpriteSheet, "normal");
      btnE2.mouseEnabled = true;
      btnE2.mouseChildren = true;
      btnE2.cursor = "pointer";
      btnE2.y = canvas.height / 2;
      btnE2.x = canvas.width - 250;
      btnE2.scale = .4; // Apply scaling
      // Add event listeners for hover and click
      btnE2.on("mouseover", () => {
        btnE2.gotoAndStop("hover");
      });
      btnE2.on("mouseout", () => {
        btnE2.gotoAndStop("normal");
      });
      btnE2.on("click", () => {
        btnE2.gotoAndStop("hover");
        //if there is animation playing,stop the playing animation
        if(playingAnimation){
          playingAnimation.gotoAndPlay("stop");
          stage.removeChild(playingAnimation);
          playingAnimation = null;
        }
        playSound("sound_e2");
        hideDisplayVokalButtons();
        hideDisplayImageText();
        stage.addChild(animationVokalE2);
        animationVokalE2.gotoAndPlay("run");
        playingAnimation = animationVokalE2;
      });
      stage.addChild(btnE2);


      let btnOSpriteSheet = new createjs.SpriteSheet({
        images: [
          queue.getResult("btn_o_01"), // Normal state
          queue.getResult("btn_o_02")  // Hover / Click state
        ],
        frames: { width: 261, height: 237 }, // Adjust size as needed
        animations: {
          normal: 0,
          hover: 1
        }
      });
      // Create the Sprite
      btnO = new createjs.Sprite(btnOSpriteSheet, "normal");
      btnO.mouseEnabled = true;
      btnO.mouseChildren = true;
      btnO.cursor = "pointer";
      btnO.y = canvas.height / 2 + 100;
      btnO.x = canvas.width - 250;
      btnO.scale = .4; // Apply scaling
      // Add event listeners for hover and click
      btnO.on("mouseover", () => {
        btnO.gotoAndStop("hover");
      });
      btnO.on("mouseout", () => {
        btnO.gotoAndStop("normal");
      });
      btnO.on("click", () => {
        btnO.gotoAndStop("hover");
        //if there is animation playing,stop the playing animation
        if(playingAnimation){
          playingAnimation.gotoAndPlay("stop");
          stage.removeChild(playingAnimation);
          playingAnimation = null;
        }
        playSound("sound_o");
        hideDisplayVokalButtons();
        hideDisplayImageText();
        stage.addChild(animationVokalO);
        animationVokalO.gotoAndPlay("run");
        playingAnimation = animationVokalO;
      });
      stage.addChild(btnO);

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
      btnPrevious.y = canvas.height - 120;
      btnPrevious.x = canvas.width - 240;
      btnPrevious.scale = .4; // Apply scaling
      // Add event listeners for hover and click
      btnPrevious.on("mouseover", () => {
        btnPrevious.gotoAndStop("hover");
      });
      btnPrevious.on("mouseout", () => {
        btnPrevious.gotoAndStop("normal");
      });
      btnPrevious.on("click", () => {
        btnPrevious.gotoAndStop("hover");
        navigateToAnotherPage("previous");
      });
      stage.addChild(btnPrevious);

    }
    else if(currentPage === 2){
      navigateToAnotherSubmenu();
    }
  }else if(direction === "previous"){
    if(currentPage === 2){
      currentPage--;
      stage.removeChild(btnE1);
      stage.removeChild(btnE2);
      stage.removeChild(btnO);
      stage.removeChild(btnPrevious);

      showAIEButtons();
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
</template>

<style scoped>


</style>
