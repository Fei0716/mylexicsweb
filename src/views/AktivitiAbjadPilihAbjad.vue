<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import router from '../router.js';
import Loader from '../components/Loader.vue';
import { SceneBuilder } from '../helper.js';
import ModalRetry from '../components/ModalRetry.vue';

// States
let canvas;
let stage;
let queue;
const dpr = window.devicePixelRatio || 1;
let showModalRetry = ref(false);
// objects
let builder;
let backgroundImg;
let titleImg;
let btnHome;
let btnSubmenu;
let btnArahan;
let btnEar;
let stageBackground;
let handsClapping;
let isLoading = ref(true);
let isMobile = computed(() => {
    return window.innerWidth < 1000 && window.innerWidth < window.innerHeight;
});
let targetWidth = isMobile.value ? 675 : 1000;
let targetHeight = isMobile.value ? 800 : 675;
let duckFrames = [
    [0, 0, 77, 81, 0, 7, 23],
    [79, 0, 77, 81, 0, 7, 23],
    [158, 0, 77, 81, 0, 7, 23],
    [237, 0, 77, 81, 0, 7, 23],
    [316, 0, 77, 81, 0, 7, 23],
    [395, 0, 77, 82, 0, 7, 23],
    [0, 84, 77, 82, 0, 7, 23],
    [79, 84, 77, 82, 0, 7, 23],
    [158, 84, 77, 82, 0, 7, 23],
    [237, 84, 79, 83, 0, 7, 23],
    [318, 84, 78, 83, 0, 7, 23],
    [398, 84, 78, 84, 0, 7, 23],
    [0, 170, 79, 84, 0, 7, 23],
    [81, 170, 79, 85, 0, 7, 23],
    [162, 170, 79, 85, 0, 7, 23],
    [243, 170, 79, 86, 0, 7, 23],
    [324, 170, 80, 86, 0, 7, 23],
    [406, 170, 80, 87, 0, 7, 23],
    [0, 259, 80, 88, 0, 7, 23],
    [82, 259, 81, 89, 0, 7, 23],
    [0, 0, 77, 81, 0, 7, 23],
    [79, 0, 77, 81, 0, 7, 23],
    [158, 0, 77, 81, 0, 7, 23],
    [237, 0, 77, 81, 0, 7, 23],
    [316, 0, 77, 81, 0, 7, 23],
    [395, 0, 77, 82, 0, 7, 23],
    [0, 84, 77, 82, 0, 7, 23],
    [79, 84, 77, 82, 0, 7, 23],
    [158, 84, 77, 82, 0, 7, 23],
    [237, 84, 79, 83, 0, 7, 23],
    [165, 259, 79, 83, 0, 7, 23],
    [246, 259, 79, 84, 0, 7, 23],
    [327, 259, 79, 84, 0, 7, 23],
    [408, 259, 80, 85, 0, 7, 23],
    [0, 350, 80, 85, 0, 7, 23],
    [82, 350, 81, 86, 0, 7, 23],
    [165, 350, 81, 86, 0, 7, 23],
    [248, 350, 82, 87, 0, 7, 23],
    [332, 350, 82, 88, 0, 7, 23],
    [416, 350, 83, 89, 0, 7, 23],
];
const duckContainer = new createjs.Container();
const bgScale = isMobile.value ? 0.35 : 0.37;
const generateAssets = () => {
    let assets = [];
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    // Loop through all alphabets from 'a' to 'z'
    // 97 is the ASCII code for 'a', 122 is for 'z'
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);

        // Determine the folder based on vowel vs consonant
        const type = vowels.includes(letter) ? 'vokal' : 'konsonan';

        // Add the sound asset to the array
        assets.push({
            id: `sound_${letter}`,
            src: `/sounds/${type}/${letter}.mp3`,
        });
    }

    return assets;
};

// Now you can call it without arguments
const assetsArr = generateAssets();
const generalAssetsArr = [
    //   images
    {
        id: 'abjad_background',
        src: '/images/aktiviti/abjad/background.png',
    },
    {
        id: 'title_abjad',
        src: '/images/aktiviti/abjad/aktiviti_pilih_abjad/title.png',
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
        id: 'btn_ear_01',
        src: '/images/aktiviti/abjad/aktiviti_pilih_abjad/btn_ear0001.png',
    },
    {
        id: 'btn_ear_02',
        src: '/images/aktiviti/abjad/aktiviti_pilih_abjad/btn_ear0002.png',
    },
    {
        id: 'duck_swimming',
        src: '/images/aktiviti/abjad/aktiviti_pilih_abjad/duck_swimming.png',
    },
    {
        id: 'hands_clapping',
        src: '/images/aktiviti/abjad/aktiviti_pilih_abjad/hands_clapping.png',
    },
    {
        id: 'stage_background',
        src: '/images/aktiviti/abjad/aktiviti_pilih_abjad/stage_background.png',
    },
    {
        id: 'board',
        src: '/images/aktiviti/abjad/aktiviti_pilih_abjad/board.png',
    },

    //  sounds
    { id: 'sound_laman_utama', src: '/sounds/laman_utama.mp3' },
    { id: 'sound_submenu', src: '/sounds/submenu.mp3' },
    {
        id: 'sound_arahan',
        src: '/sounds/aktiviti/abjad/pilih_abjad/arahan.mp3',
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
let remainingLetters = []; // Will hold ['a', 'b', ... 'z']
let currentTarget = null; // The letter we are currently testing
let isGameActive = false; // Prevent clicking while ducks are swimming
let progressBar; // The visual bar object
let progressFill; // The colored part of the bar
let progressBlockContainer;
const totalLetters = 26;
let isAnimating = false;

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

    // Generate 'a' to 'z'
    remainingLetters = [];
    for (let i = 97; i <= 122; i++) {
        remainingLetters.push(String.fromCharCode(i));
    }
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
    // 1. WIPE the stage
    stage.removeAllChildren();

    // 2. Initialize the Builder
    // We instantiate the class so we can use its methods
    builder = new SceneBuilder(stage, queue, dpr);

    // --- BACKGROUND ---
    // Using { centered: true } replaces the manual regX/regY calculations
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
        isMobile.value ? canvas.width * 0.7 : canvas.width * 0.9,
        isMobile.value ? canvas.height * 0.17 : canvas.height * 0.23,
        isMobile.value ? 0.3 : 0.35,
        'sound_arahan'
    );

    stageBackground = builder.addBitmap(
        'stage_background',
        canvas.width / 2,
        canvas.height * 0.54,
        bgScale,
        { centered: true }
    );

    drawProgressBar();

    btnEar = builder.addActionButton(
        'btn_ear_01',
        'btn_ear_02',
        isMobile.value ? canvas.width * 0.87 : canvas.width * 0.9,
        isMobile.value ? canvas.height * 0.17 : canvas.height * 0.37,
        isMobile.value ? 0.3 : 0.35,
        null,
        () => {
            startGameRound();
        }
    );
    duckContainer.scaleX = dpr;
    duckContainer.scaleY = dpr;
    stage.addChild(duckContainer);
    // Ensure the stage updates with the new content
    stage.update();
}

function startGameRound() {
    // BLOCK if animation is playing
    if (isAnimating) return;

    //Check if user just want to rehear the sound of the current target
    if (currentTarget) {
        builder.playSound(`sound_${currentTarget}`);
        return;
    }
    // 1. Check if game over
    if (remainingLetters.length === 0) {
        alert('Tahniah! Anda telah menamatkan semua huruf!');
        return;
    }
    // 2. Pick a random target from the REMAINING letters
    const randomIndex = Math.floor(Math.random() * remainingLetters.length);
    currentTarget = remainingLetters[randomIndex];

    // 3. Play the Sound for the target
    // We use the ID format we created in generateAssets: "sound_a", "sound_b" etc.
    builder.playSound(`sound_${currentTarget}`);

    // 4. Pick 3 Distractors (Wrong answers)
    const distractors = getDistractors(currentTarget);

    // 5. Combine and Shuffle
    let options = [currentTarget, ...distractors];
    options = shuffleArray(options); // Helper function to randomize positions

    // 6. Send these letters to the ducks
    callDucks(options);
}

// --- HELPER 1: Get 3 unique random wrong letters ---
function getDistractors(target) {
    const wrongOnes = [];
    const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');

    while (wrongOnes.length < 3) {
        const rand = allLetters[Math.floor(Math.random() * allLetters.length)];
        // Must not be the target AND not already in our wrong list
        if (rand !== target && !wrongOnes.includes(rand)) {
            wrongOnes.push(rand);
        }
    }
    return wrongOnes;
}

// --- HELPER 2: Fisher-Yates Shuffle ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function callDucks(lettersArray) {
    // 1. SAFETY: Clear any existing ducks if the button is clicked twice
    duckContainer.removeAllChildren();
    builder.stage.addChild(duckContainer);
    // 2. SETUP DIMENSIONS
    const bgBounds = stageBackground.getBounds();
    const bgWidth = bgBounds.width * bgScale * dpr - 10; // add 10px to avoid edge clipping
    const bgHeight = bgBounds.height * bgScale * dpr;
    const bgX = canvas.width / 2 - bgWidth / 2;
    const bgY = canvas.height * 0.54 - bgHeight / 2;

    // 3. APPLY MASK (The "Window")
    const maskRect = new createjs.Shape();
    maskRect.graphics.beginFill('#000').drawRect(bgX, bgY, bgWidth, bgHeight);
    duckContainer.mask = maskRect;

    const exitX = bgX - 200; // 200px to the left of the background edge
    // 4. DEFINE DATA
    const positions = [
        {
            x: isMobile.value ? targetWidth * 0.35 : targetWidth * 0.37,
            y: targetHeight * 0.62,
        },
        {
            x: isMobile.value ? targetWidth * 0.47 : targetWidth * 0.47,
            y: targetHeight * 0.52,
        },
        {
            x: isMobile.value ? targetWidth * 0.53 : targetWidth * 0.51,
            y: targetHeight * 0.68,
        },
        {
            x: isMobile.value ? targetWidth * 0.63 : targetWidth * 0.61,
            y: targetHeight * 0.58,
        },
    ];

    // 5. CREATE & ANIMATE LOOP
    positions.forEach((pos, index) => {
        const letter = lettersArray[index];
        const startX = bgX + bgWidth + 150;

        // 2. PASS 'exitX' TO THE FUNCTION
        const myDuck = createDuck(letter, startX, pos.y, pos.x, exitX);

        duckContainer.addChild(myDuck);

        createjs.Tween.get(myDuck)
            .wait(index * 300)
            .to({ x: myDuck.targetX }, 1000, createjs.Ease.quartOut);
    });
}
/**
 * Creates a Duck + Text, sets up interaction, and returns the Container.
 */
function createDuck(letter, startX, yPos, targetX, exitX) {
    // 1. Create a wrapper container for this specific duck
    // This allows us to move the duck and text together
    const duckWrapper = new createjs.Container();
    duckWrapper.x = startX;
    duckWrapper.y = yPos;
    duckWrapper.name = 'duck_' + letter; // Helpful for debugging
    duckWrapper.cursor = 'pointer'; // Show hand cursor on hover

    // Define your sprite sheet data
    const spriteSheet = new createjs.SpriteSheet({
        images: [builder.queue.getResult('duck_swimming')],
        framerate: 30,
        frames: duckFrames,
        animations: {
            swim: [0, duckFrames.length - 1, 'swim', 0.5],
        },
    });

    const duckSprite = new createjs.Sprite(spriteSheet, 'swim');

    // Scale the sprite if needed (adjust based on your mobile/desktop logic)
    const scale = isMobile.value ? 1.45 : 1.45;
    duckSprite.scale = scale;

    // Create the letter text
    const text = new createjs.Text(letter, 'bold 60px MyLexics', '#000000');
    text.textAlign = 'center';
    text.textBaseline = 'middle';
    text.x = 35 * scale;
    text.y = 31 * scale; // Push it down slightly to sit on the body

    duckWrapper.on('mousedown', (evt) => {
        // 1. Prevent multiple clicks if game is already resolving
        if (!currentTarget || isAnimating) return;

        if (letter === currentTarget) {
            // --- A. LOCK THE GAME ---
            // Stop anyone from clicking again immediately
            const winningLetter = currentTarget; // Save it
            currentTarget = null; // Lock the game logic
            isAnimating = true;

            // Update the data immediately so the bar fills up
            const index = remainingLetters.indexOf(winningLetter);
            if (index > -1) remainingLetters.splice(index, 1);
            updateProgressBar();

            // --- B. FADE OUT LOSERS ---
            duckContainer.children.forEach((child) => {
                if (child !== duckWrapper) {
                    createjs.Tween.get(child).to({ alpha: 0 }, 500);
                }
            });

            // --- C. SHOW MODAL (Foreground Action) ---
            // The callback here controls when the NEXT round starts
            displayCorrectMessage(winningLetter, () => {
                isAnimating = false; // Unlock game

                // Check Game Over
                if (remainingLetters.length === 0) {
                    showModalRetry.value = true;
                }
            });

            // --- D. SWIM AWAY (Background Action) ---
            // This happens concurrently with the modal!
            duckSprite.play();
            createjs.Tween.get(duckWrapper)
                .to({ x: exitX }, 2500, createjs.Ease.linear) // Slower swim (2.5s) looks better behind modal
                .call(() => {
                    // Optional: You can hide the duck once it's off-screen
                    // just to be clean, but the next round will wipe it anyway.
                    duckWrapper.visible = false;
                });
        } else {
            // 1. Lock game temporarily so they can't click while "Sorry" is playing
            isAnimating = true;

            // 2. Show the Wrong Message Modal
            displayWrongMessage(() => {
                // This runs after the "Sorry" sound finishes and modal closes
                isAnimating = false; // Unlock game so they can try again
            });
            // --- WRONG ANSWER (SHAKE) ---
            createjs.Tween.get(duckWrapper)
                .to({ x: duckWrapper.x - 10 }, 50)
                .to({ x: duckWrapper.x + 10 }, 50)
                .to({ x: duckWrapper.x }, 50);
        }
    });

    duckWrapper.addChild(duckSprite, text);

    // Store the target destination on the wrapper for easy access later
    duckWrapper.targetX = targetX;
    return duckWrapper;
}

function displayCorrectMessage(correctLetter, onFinishedCallback) {
    // 1. Create a Container for the Modal
    const modalContainer = new createjs.Container();
    // Ensure it sits on top of everything
    stage.addChild(modalContainer);

    // 2. Create Blocking Overlay (Semi-transparent black)
    // This catches all clicks to prevent interacting with the game behind
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
    // Center the board
    const boardScale = isMobile.value ? 0.4 : 0.4;
    board.scaleX = board.scaleY = boardScale;
    const boardW = boardImg.width * boardScale;
    const boardH = boardImg.height * boardScale;
    board.x = (canvas.width - boardW) / 2;
    board.y = (canvas.height - boardH) / 2;
    modalContainer.addChild(board);

    // --- PHASE 1: TAHNIAH + CLAPPING ---

    // A. "Tahniah" Text
    const titleText = new createjs.Text(
        'Tahniah',
        'bold 60px MyLexics',
        '#000000'
    );
    titleText.textAlign = 'center';
    titleText.textBaseline = 'middle';
    titleText.x = canvas.width / 2;
    titleText.y = board.y + boardH * 0.4;
    // B. Hands Clapping Animation
    // NOTE: Adjust 'width' and 'height' below to match your specific sprite frame size
    const handsClapppingFrames = [
        [0, 0, 105, 101, 0, 0, 0],
        [107, 0, 105, 101, 0, 0, 0],
        [0, 103, 105, 101, 0, 0, 0],
        [107, 103, 105, 101, 0, 0, 0],
    ];
    const spriteSheet = new createjs.SpriteSheet({
        images: [builder.queue.getResult('hands_clapping')],
        frames: handsClapppingFrames,
        animations: {
            clap: [0, handsClapppingFrames.length - 1, 'clap', 0.5],
        },
    });
    const handsSprite = new createjs.Sprite(spriteSheet, 'clap');
    const handsScale = isMobile.value ? 1 : 1.25;
    handsSprite.x = canvas.width * 0.45;
    handsSprite.y = board.y + boardH * 0.5; // Position at bottom section of board
    handsSprite.scale = handsScale; // Match board scale

    modalContainer.addChild(titleText, handsSprite);
    stage.update();

    // C. Play Sound & Wait
    const tahniahSound = builder.playSound('sound_tahniah');

    // Listen for sound completion to trigger Phase 2
    tahniahSound.on('complete', () => {
        // --- PHASE 2: ALPHABET DISPLAY ---

        // 1. Remove Phase 1 elements
        modalContainer.removeChild(titleText);
        modalContainer.removeChild(handsSprite);

        // 2. Add Alphabet Text
        const letterText = new createjs.Text(
            correctLetter,
            'bold 150px MyLexics',
            '#000000'
        );
        letterText.textAlign = 'center';
        letterText.textBaseline = 'middle';
        letterText.x = canvas.width / 2;
        letterText.y = board.y + boardH / 2; // Perfectly centered

        modalContainer.addChild(letterText);
        stage.update();

        // 3. Play Alphabet Sound
        const letterSound = builder.playSound(`sound_${correctLetter}`);

        // 4. Cleanup & Finish
        letterSound.on('complete', () => {
            // Small delay for better pacing
            setTimeout(() => {
                stage.removeChild(modalContainer); // Close modal

                // Trigger the callback (The duck swimming away logic)
                if (onFinishedCallback) {
                    onFinishedCallback();
                }
            }, 500);
        });
    });
}

function displayWrongMessage(onFinishedCallback) {
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

            // Trigger callback (usually to unlock the game state so user can try again)
            if (onFinishedCallback) {
                onFinishedCallback();
            }
        }, 500);
    });
}
function drawProgressBar() {
    const barContainer = new createjs.Container();

    // Dimensions
    const barWidth = isMobile.value ? canvas.width * 0.95 : canvas.width * 0.7;
    const barHeight = 50; // Made it taller to match your image
    const barX = (canvas.width - barWidth) / 2;
    const barY = isMobile.value ? canvas.height * 0.85 : canvas.height * 0.9; // Position near bottom

    // 1. Background (White with Black Border)
    const bg = new createjs.Shape();
    bg.graphics
        .setStrokeStyle(2) // Thicker border like the image
        .beginStroke('#000000') // Black Border
        .beginFill('#FFFFFF') // White Background
        .drawRect(0, 0, barWidth, barHeight); // Using drawRect for sharp corners

    // 2. Container for the Red Blocks (Empty at start)
    progressBlockContainer = new createjs.Container();

    // Add to main container
    barContainer.addChild(bg, progressBlockContainer);

    // Position on stage
    barContainer.x = barX;
    barContainer.y = barY;

    // Store dimensions for the update function to use
    barContainer.innerW = barWidth;
    barContainer.innerH = barHeight;

    stage.addChild(barContainer);
}

function updateProgressBar() {
    if (!progressBlockContainer) return;

    // 1. Clear previous blocks
    progressBlockContainer.removeAllChildren();

    // 2. Calculate Progress
    const totalCount = 26; // Total alphabets
    const completedCount = totalCount - remainingLetters.length;

    // 3. Calculate Block Dimensions
    // We get the width from the parent container we saved earlier
    const totalWidth = progressBlockContainer.parent.innerW;
    const totalHeight = progressBlockContainer.parent.innerH;

    const gap = 4; // Space between blocks
    const padding = 6; // Space inside the border

    // Available width for blocks = Total Width - (Side Padding * 2)
    const usableWidth = totalWidth - padding * 2;

    // Width of ONE block = (Usable Width / 26 items) - Gap
    // We subtract gap so they don't touch
    const step = usableWidth / totalCount;
    const blockWidth = step - gap;
    const blockHeight = totalHeight - padding * 2;

    // 4. Draw the Red Blocks
    for (let i = 0; i < completedCount; i++) {
        const block = new createjs.Shape();
        block.graphics
            .beginFill('#FF0000')
            .drawRect(0, 0, blockWidth, blockHeight);

        // Position: Padding + (Index * Step)
        block.x = padding + i * step + gap / 2;
        block.y = padding;

        progressBlockContainer.addChild(block);
    }

    stage.update();
}
function resetGame() {
    showModalRetry.value = false;
    // Reset game state
    remainingLetters = [];
    for (let i = 97; i <= 122; i++) {
        remainingLetters.push(String.fromCharCode(i));
    }
    currentTarget = null;
    isAnimating = false;
    updateProgressBar();

    // Clear any existing ducks
    duckContainer.removeAllChildren();
    stage.update();
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
        <Transition name="fade-in">
            <ModalRetry
                @hide="navigateToSubMenu()"
                @retry="resetGame()"
                v-if="showModalRetry"
            ></ModalRetry>
        </Transition>
        <Loader v-if="isLoading"></Loader>
    </div>
</template>
<style scoped></style>
