<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import router from '../router.js';
import Loader from '../components/Loader.vue';
import { SceneBuilder } from '../helper.js';

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
let btnArahan;
let btnNext;
let btnPrevious;
let writingBoard;
// Containers
let gameContainer; // Holds level-specific items (images, boxes) so we can clear them easily
let isLoading = ref(true);
let isMobile = computed(() => {
    return window.innerWidth < 1000 && window.innerWidth < window.innerHeight;
});
let targetWidth = isMobile.value ? 675 : 1000;
let targetHeight = isMobile.value ? 800 : 675;
const bgScale = isMobile.value ? 0.35 : 0.37;

// 1. GLOB IMPORT
const allImages = import.meta.glob(
    '../assets/images/aktiviti_kenali_bunyi/**/*.png',
    { eager: true }
);

// 2. PREPARE DATA STRUCTURES
const assetsArr = [];
const questionsData = [];
const folderMap = {};

//Create a Global Set to track sounds across ALL folders ---
const globalSoundTracker = new Set();

// 3. LOOP THROUGH FILES AND BUILD ASSETS
for (const path in allImages) {
    // Regex to handle both Windows (\) and Unix (/) paths safely
    const match = path.match(/[\\/](\d+_([a-z]))[\\/]([a-zA-Z]+)(\d{4})\.png$/);

    if (match) {
        const folder = match[1]; // "01_a"
        const letter = match[2]; // "a"
        const word = match[3]; // "api"
        const frameStr = match[4]; // "0001"
        const frame = frameStr === '0001' ? 1 : 2;

        // A. Add Image Asset
        assetsArr.push({
            id: `${letter}_${word}_${frame}`,
            src: allImages[path].default,
        });

        // B. Build Data Structure
        if (!folderMap[folder]) {
            folderMap[folder] = {
                folder: folder,
                letter: letter,
                items: new Set(),
            };
        }

        // Always add the word to the folder (for Game Logic questions)
        folderMap[folder].items.add(word);

        // C. Add Sound (CHECK GLOBAL TRACKER)
        // If we haven't added 'sound_api' yet (even from a different folder), add it now.
        if (!globalSoundTracker.has(word)) {
            assetsArr.push({
                id: `sound_${word}`,
                src: `/sounds/aktiviti/abjad/kenali_bunyi/${word}.mp3`,
            });

            // Mark this word as "Sound Loaded" globally
            globalSoundTracker.add(word);
        }
    }
}

// 4. POST-PROCESSING
Object.values(folderMap).forEach((folderObj) => {
    folderObj.items = Array.from(folderObj.items);
    questionsData.push(folderObj);
});

// 5. SORT
questionsData.sort((a, b) => a.folder.localeCompare(b.folder));

const generalAssetsArr = [
    //   images
    {
        id: 'abjad_background',
        src: '/images/aktiviti/abjad/background.png',
    },
    {
        id: 'title_abjad',
        src: '/images/aktiviti/abjad/aktiviti_kenali_bunyi/title.png',
    },
    { id: 'btn_home_01', src: '/images/btn_home_01.png' },
    { id: 'btn_home_02', src: '/images/btn_home_02.png' },
    { id: 'btn_arahan', src: '/images/btn_arahan.png' },
    {
        id: 'btn_submenu_01',
        src: '/images/aktiviti/abjad/aktiviti_pilih_abjad/btn_submenu0001.png',
    },
    {
        id: 'btn_submenu_02',
        src: '/images/aktiviti/abjad/aktiviti_pilih_abjad/btn_submenu0002.png',
    },
    {
        id: 'btn_next_01',
        src: '/images/btn_next_01.png',
    },
    {
        id: 'btn_next_02',
        src: '/images/btn_next_02.png',
    },
    {
        id: 'btn_prev_01',
        src: '/images/btn_previous_01.png',
    },
    {
        id: 'btn_prev_02',
        src: '/images/btn_previous_02.png',
    },
    {
        id: 'writing_board',
        src: '/images/aktiviti/abjad/aktiviti_kenali_bunyi/writing_board.png',
    },
    {
        id: 'board',
        src: '/images/aktiviti/abjad/aktiviti_pilih_abjad/board.png',
    },
    {
        id: 'box',
        src: '/images/aktiviti/abjad/aktiviti_kenali_bunyi/box.png',
    },

    //  sounds
    { id: 'sound_laman_utama', src: '/sounds/laman_utama.mp3' },
    { id: 'sound_submenu', src: '/sounds/submenu.mp3' },
    {
        id: 'sound_arahan',
        src: '/sounds/aktiviti/abjad/kenali_bunyi/arahan.mp3',
    },
    {
        id: 'sound_tahniah',
        src: '/sounds/aktiviti/tahniah.mp3',
    },
    {
        id: 'sound_maaf',
        src: '/sounds/aktiviti/abjad/maaf.mp3',
    },
];
const mergedAssetsArr = [...generalAssetsArr, ...assetsArr];

// Game State
let currentQuestionIndex = 0;
let correctAnswersFound = 0;
let totalCorrectNeeded = 0;
let levelActive = false;
let correctBoxes = []; // Array to store the box containers on the left

function init() {
    //get DPI
    canvas = document.getElementById('canvas');
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
        queue.removeAllEventListeners('fileload');
        queue.removeAllEventListeners('complete');
        queue.removeAllEventListeners('error');

        // Track progress for this batch
        queue.on('fileload', (event) => {
            loadedAssetCount++;
            const progress = Math.round((loadedAssetCount / totalAssets) * 100);
        });

        queue.on('complete', () => {
            currentBatch++;

            // Small delay between batches to prevent overwhelming the browser
            setTimeout(() => {
                loadNextBatch();
            }, 100);
        });

        queue.on('error', (event) => {
            console.error(
                `Error loading asset in batch ${currentBatch + 1}:`,
                event.data
            );
        });

        queue.loadManifest(batch);
    }

    // Start loading the first batch
    loadNextBatch();
}
function handleComplete() {
    isLoading.value = false;
    loadScene();
    createjs.Ticker.addEventListener('tick', handleTick);
}

function handleTick() {
    /*
     * update similar to requestAnimationFrame
     * */
    stage.update();
}

function loadScene() {
    stage.removeAllChildren();
    builder = new SceneBuilder(stage, queue, dpr);
    backgroundImg = builder.addBitmap(
        'abjad_background',
        canvas.width / 2,
        canvas.height * 0.45,
        isMobile.value ? 0.45 : 0.4,
        { centered: true }
    );

    // --- TITLE ---
    // We capture the returned image so we can access its width for the regX specific logic
    titleImg = builder.addBitmap(
        'title_abjad',
        canvas.width / 2,
        canvas.height * 0.01,
        isMobile.value ? 0.3 : 0.35
    );
    // Original logic only centered X, not Y, so we set it manually here
    titleImg.regX = titleImg.image.width / 2;

    // --- HOME BUTTON ---
    // The builder handles normal/hover states, scaling, positioning, sounds, and routing
    btnHome = builder.addNavButton(
        'btn_home_01',
        'btn_home_02',
        canvas.width * 0.02,
        canvas.height * 0.02,
        isMobile.value ? 0.3 : 0.4,
        'sound_laman_utama',
        'LamanUtama'
    );

    btnSubmenu = builder.addNavButton(
        'btn_submenu_01',
        'btn_submenu_02',
        canvas.width * 0.87,
        canvas.height * 0.02,
        isMobile.value ? 0.3 : 0.4,
        'sound_submenu',
        'LamanAktivitiAbjad'
    );

    btnArahan = builder.addSimpleButton(
        'btn_arahan',
        isMobile.value ? canvas.width * 0.85 : canvas.width * 0.9,
        isMobile.value ? canvas.height * 0.15 : canvas.height * 0.23,
        isMobile.value ? 0.3 : 0.35,
        'sound_arahan'
    );

    writingBoard = builder.addBitmap(
        'writing_board',
        canvas.width * 0.55,
        canvas.height * 0.57,
        bgScale,
        { centered: true }
    );
    // Navigation Buttons
    btnPrevious = builder.addActionButton(
        'btn_prev_01',
        'btn_prev_02',
        isMobile.value ? canvas.width * 0.37 : canvas.width * 0.8,
        isMobile.value ? canvas.height * 0.83 : canvas.height * 0.85,
        0.4,
        null,
        () => {
            if (currentQuestionIndex > 0) loadLevel(currentQuestionIndex - 1);
        }
    );

    btnNext = builder.addActionButton(
        'btn_next_01',
        'btn_next_02',
        isMobile.value ? canvas.width * 0.6 : canvas.width * 0.9,
        isMobile.value ? canvas.height * 0.83 : canvas.height * 0.85,
        0.4,
        null,
        () => {
            if (currentQuestionIndex < questionsData.length - 1)
                loadLevel(currentQuestionIndex + 1);
        }
    );

    gameContainer = new createjs.Container();
    gameContainer.scaleX = dpr;
    gameContainer.scaleY = dpr;
    stage.addChild(gameContainer);
    stage.update();
    loadLevel(0); // Start Level 0
}

function loadLevel(index) {
    // 1. Reset Logic
    gameContainer.removeAllChildren();
    currentQuestionIndex = index;
    levelActive = true;
    correctAnswersFound = 0;
    correctBoxes = [];

    // Enable/Disable Nav Buttons
    btnPrevious.visible = index > 0;
    btnNext.visible = index < questionsData.length - 1;

    const data = questionsData[index];
    // 2. Identify Correct Answers vs Distractors
    const correctWords = data.items.filter((word) =>
        word.toLowerCase().startsWith(data.letter)
    );
    const wrongWords = data.items.filter(
        (word) => !word.toLowerCase().startsWith(data.letter)
    );
    totalCorrectNeeded = correctWords.length;

    // 3. Setup Layout
    const boxScale = isMobile.value ? 0.28 : 0.28;

    // --- A. Target Letter Box (Top Right) ---
    // We use a container so we can treat the box + text as one unit
    const letterBoxContainer = new createjs.Container();
    letterBoxContainer.x = isMobile.value
        ? targetWidth * 0.79
        : targetWidth * 0.725;
    letterBoxContainer.y = isMobile.value
        ? targetHeight * 0.25
        : targetHeight * 0.165;

    // Use builder to get the bitmap (it returns a createjs.Bitmap)
    // We don't add it to the stage yet, we add it to our container
    const letterBg = new createjs.Bitmap(builder.queue.getResult('box'));
    letterBg.scale = boxScale;

    const letterText = new createjs.Text(
        data.letter,
        'bold 100px MyLexics',
        '#000000'
    );
    letterText.textAlign = 'center';
    letterText.textBaseline = 'middle';

    // Center text based on the box's scaled dimensions
    const boxW = letterBg.image.width * boxScale;
    const boxH = letterBg.image.height * boxScale;
    letterText.x = boxW / 2;
    letterText.y = boxH / 2;

    letterBoxContainer.addChild(letterBg, letterText);
    gameContainer.addChild(letterBoxContainer);

    // --- B. Correct Answer Boxes (Left Side) ---
    const startY = isMobile.value ? targetHeight * 0.3 : targetHeight * 0.25;
    const gapY = boxH + 15; // Vertical gap between boxes

    for (let i = 0; i < totalCorrectNeeded; i++) {
        const answerBox = new createjs.Container();
        answerBox.x = isMobile.value
            ? canvas.width * 0.04
            : canvas.width * 0.08;
        answerBox.y = startY + i * gapY;

        const boxImg = new createjs.Bitmap(builder.queue.getResult('box'));
        boxImg.scale = boxScale;

        answerBox.addChild(boxImg);
        gameContainer.addChild(answerBox);
        correctBoxes.push(answerBox);
    }

    // --- C. Writing Board Images (Center) ---
    const allWords = [...correctWords, ...wrongWords];
    shuffleArray(allWords);

    // Board area center point
    const boardCenterX = targetWidth * 0.54;
    const boardCenterY = isMobile.value
        ? targetHeight * 0.6
        : targetHeight * 0.59;

    // Grid Logic to prevent overlapping
    // We create a 3x3 or 4x3 grid area on the board
    const cols = 3;
    const xStep = 120; // Horizontal distance between items
    const yStep = 120; // Vertical distance

    allWords.forEach((word, i) => {
        // 1. Get IDs for both frames
        const normalID = `${data.letter}_${word}_1`;
        const hoverID = `${data.letter}_${word}_2`;

        const imgNormal = builder.queue.getResult(normalID);
        const imgHover = builder.queue.getResult(hoverID);

        // Safety check: ensure at least the normal image exists
        if (!imgNormal) return;

        // Calculate grid position
        const col = i % cols;
        const row = Math.floor(i / cols);
        const offsetX = (col - 1) * xStep;
        const offsetY = (row - 1) * yStep;

        const itemContainer = new createjs.Container();
        itemContainer.x = boardCenterX + offsetX;
        itemContainer.y = boardCenterY + offsetY;
        itemContainer.cursor = 'pointer';

        const itemScale = 0.3;

        // --- A. Create Normal Bitmap ---
        const bmpNormal = new createjs.Bitmap(imgNormal);
        bmpNormal.scale = itemScale;
        bmpNormal.regX = imgNormal.width / 2;
        bmpNormal.regY = imgNormal.height / 2;

        // --- B. Create Hover Bitmap (if available) ---
        let bmpHover = null;
        if (imgHover) {
            bmpHover = new createjs.Bitmap(imgHover);
            bmpHover.scale = itemScale;
            bmpHover.regX = imgHover.width / 2;
            bmpHover.regY = imgHover.height / 2;
            bmpHover.visible = false; // Hidden by default
            itemContainer.addChild(bmpHover);
        }

        // Add Hit Area (using Normal image dimensions)
        const hit = new createjs.Shape();
        hit.graphics
            .beginFill('#000')
            .drawRect(0, 0, imgNormal.width, imgNormal.height);
        bmpNormal.hitArea = hit; // Apply hitArea to the visible normal bmp

        // Add Normal on top (or bottom, doesn't matter if we toggle visibility)
        itemContainer.addChild(bmpNormal);

        // --- EVENTS ---
        itemContainer.on('mouseover', () => {
            // Play Sound
            createjs.Sound.stop();
            builder.playSound(`sound_${word}`);

            // Pop Effect
            itemContainer.scale = 1.1;

            // Swap Images
            if (bmpHover) {
                bmpNormal.visible = false;
                bmpHover.visible = true;
            }
        });

        itemContainer.on('mouseout', () => {
            // Reset Scale
            itemContainer.scale = 1;

            // Swap Back
            if (bmpHover) {
                bmpNormal.visible = true;
                bmpHover.visible = false;
            }
        });

        itemContainer.on('click', () => {
            if (!levelActive) return;

            const isCorrect = word.toLowerCase().startsWith(data.letter);

            if (isCorrect) {
                // 1. Visual Feedback (Grey out)
                itemContainer.mouseEnabled = false;
                itemContainer.alpha = 0.2;
                // Force switch back to normal state visually if desired, or keep hover state frozen
                if (bmpHover) {
                    bmpNormal.visible = true;
                    bmpHover.visible = false;
                }

                // 2. Animate to Box
                fillNextBox(word, data.letter);
            } else {
                displayWrongMessage();
            }
        });

        gameContainer.addChild(itemContainer);
    });

    stage.update();
}
function fillNextBox(word, letter) {
    if (correctAnswersFound < correctBoxes.length) {
        const targetBox = correctBoxes[correctAnswersFound];
        const boxScale = isMobile.value ? 0.25 : 0.28; // Match loadLevel scale

        const wordID = `${letter}_${word}_1`;
        const imgAsset = builder.queue.getResult(wordID);
        const filledImg = new createjs.Bitmap(imgAsset);

        const fitScale = 0.21;
        filledImg.scale = 0;
        filledImg.regX = imgAsset.width / 2;
        filledImg.regY = imgAsset.height / 2;

        // Position relative to the box (which is already scaled by gameContainer)
        const bgParams = targetBox.children[0].image;
        const centerX = (bgParams.width * boxScale) / 2;
        const centerY = (bgParams.height * boxScale) / 2;

        filledImg.x = centerX;
        filledImg.y = centerY - 12;

        // Colored Text
        const textContainer = new createjs.Container();
        const firstChar = word.substring(0, 1);
        const restChars = word.substring(1);

        const t1 = new createjs.Text(
            firstChar,
            'bold 40px MyLexics',
            '#000000'
        );
        const t2 = new createjs.Text(
            restChars,
            'bold 40px MyLexics',
            '#009900'
        );

        const w1 = t1.getMeasuredWidth();
        const totalW = w1 + t2.getMeasuredWidth();

        t1.x = -totalW / 2;
        t2.x = t1.x + w1;

        textContainer.addChild(t1, t2);
        textContainer.x = centerX;
        textContainer.y = centerY + 20;

        targetBox.addChild(filledImg, textContainer);

        createjs.Tween.get(filledImg).to(
            { scale: fitScale },
            500,
            createjs.Ease.backOut
        );

        correctAnswersFound++;
        if (correctAnswersFound === totalCorrectNeeded) {
            // displayTahniah();
        }
    }
}
function displayWrongMessage() {
    // 1. Create a Container for the Modal
    const modalContainer = new createjs.Container();
    // Ensure it sits on top of everything
    stage.addChild(modalContainer);

    // 2. Create Blocking Overlay (Semi-transparent black)
    const overlay = new createjs.Shape();
    overlay.graphics
        .beginFill('rgba(0,0,0,0.3)')
        .drawRect(0, 0, canvas.width, canvas.height);
    overlay.cursor = 'default';

    // Empty click listener stops the event from passing through to the stage
    overlay.on('click', (evt) => {
        evt.stopPropagation();
    });
    modalContainer.addChild(overlay);

    // 3. Setup the Board Background
    const boardImg = builder.queue.getResult('board');
    const board = new createjs.Bitmap(boardImg);

    // Center the board (Same scaling as your Correct Message)
    const boardScale = isMobile.value ? 0.4 : 0.4;
    board.scaleX = board.scaleY = boardScale;

    const boardW = boardImg.width * boardScale;
    const boardH = boardImg.height * boardScale;
    board.x = (canvas.width - boardW) / 2;
    board.y = (canvas.height - boardH) / 2;

    modalContainer.addChild(board);

    // 4. Setup the Text
    // We use \n to create the two-line effect seen in the image
    const wrongText = new createjs.Text(
        'maaf..\nSila cuba lagi',
        'bold 80px MyLexics',
        '#000000'
    );
    wrongText.textAlign = 'center';
    wrongText.textBaseline = 'middle';
    wrongText.lineHeight = 100; // Adjust spacing between lines
    wrongText.x = canvas.width / 2;
    // Position vertically centered on the board
    wrongText.y = board.y + boardH * 0.4;

    modalContainer.addChild(wrongText);
    stage.update();

    // 5. Play Sound & Wait
    const maafSound = builder.playSound('sound_maaf');

    // 6. Cleanup when sound finishes
    maafSound.on('complete', () => {
        // Small delay so the modal doesn't vanish instantly after the word is spoken
        setTimeout(() => {
            stage.removeChild(modalContainer); // Close modal
        }, 500);
    });
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function navigateToSubMenu() {
    showModalRetry.value = false;
    router.push({ name: 'LamanAktivitiAbjad' });
}
function cleanupCreateJS() {
    if (queue) {
        queue.removeAllEventListeners(); // Remove all event listeners
        queue.removeAll(); // Clear all loaded assets
        queue = null;
    }

    if (stage) {
        createjs.Ticker.removeEventListener('tick', handleTick); // Stop ticker updates
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
