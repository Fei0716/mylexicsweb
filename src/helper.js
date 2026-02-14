import router from './router.js';

export class SceneBuilder {
    constructor(stage, queue, dpr) {
        this.stage = stage;
        this.queue = queue;
        this.dpr = dpr;
        this.playingSound = null; // Internal state for sound management
    }
    //Centralized Sound Manager
    playSound(id) {
        // 1. If something is already playing, STOP it.
        if (this.playingSound) {
            this.playingSound.stop();
        }

        // 2. Play the new sound and track it
        this.playingSound = createjs.Sound.play(id);
        return this.playingSound;
    }
    /**
     * Adds a static bitmap image to the stage.
     */
    addBitmap(id, x, y, scale, options = {}) {
        let img = new createjs.Bitmap(this.queue.getResult(id));

        // Handle Registration Points (Centering)
        if (options.centered) {
            img.regX = img.image.width / 2;
            img.regY = img.image.height / 2;
        } else {
            if (options.regX) img.regX = options.regX;
            if (options.regY) img.regY = options.regY;
        }

        // Position and Scale
        img.x = x;
        img.y = y;

        // Check if we need to flip or scale specifically
        if (options.scaleX) {
            img.scaleX = options.scaleX * this.dpr;
            img.scaleY = (options.scaleY || scale) * this.dpr;
        } else {
            img.scale = scale * this.dpr;
        }

        this.stage.addChild(img);
        return img; // Return the object so you can animate it later (e.g., clouds)
    }

    /**
     * Adds an animated sprite (looping) to the stage.
     */
    addAnimatedSprite(id, frameData, x, y, scale, options = {}) {
        let spriteSheet = new createjs.SpriteSheet({
            images: [this.queue.getResult(id)],
            framerate: 30,
            frames: frameData,
            animations: {
                run: [0, frameData.length - 1, 'run'], // Infinite loop
                end: [frameData.length - 1, frameData.length - 1],
                stop: [0],
            },
        });

        let sprite = new createjs.Sprite(spriteSheet, 'run');
        sprite.x = x;
        sprite.y = y;

        // Handle Flipping (negative scaleX)
        if (options.scaleX) {
            sprite.scaleX = options.scaleX * this.dpr;
            sprite.scaleY = (options.scaleY || scale) * this.dpr;
        } else {
            sprite.scale = scale * this.dpr;
        }

        this.stage.addChild(sprite);
        return sprite;
    }

    /**
     * Adds a navigation button with hover effects and sound.
     */
    addNavButton(normalId, hoverId, x, y, scale, soundId, routeName) {
        let normalImg = this.queue.getResult(normalId);
        let hoverImg = this.queue.getResult(hoverId);

        let btnSheet = new createjs.SpriteSheet({
            images: [normalImg, hoverImg],
            frames: { width: normalImg.width, height: normalImg.height },
            animations: {
                normal: 0,
                hover: 1,
            },
        });

        let btn = new createjs.Sprite(btnSheet, 'normal');
        btn.mouseEnabled = true;
        btn.cursor = 'pointer';
        btn.x = x;
        btn.y = y;
        btn.scale = scale * this.dpr;

        // --- Event Listeners ---

        btn.on('mouseover', () => {
            btn.gotoAndStop('hover');
            if (soundId) {
                this.playSound(soundId);
            }
        });

        btn.on('mouseout', () => {
            btn.gotoAndStop('normal');
            if (this.playingSound) {
                this.playingSound.stop();
                this.playingSound = null;
            }
        });

        btn.on('click', () => {
            btn.gotoAndStop('hover');
            if (this.playingSound) {
                this.playingSound.stop();
                this.playingSound = null;
            }
            if (routeName) {
                router.push({ name: routeName });
            }
        });

        this.stage.addChild(btn);
        return btn;
    }

    // Adds a simple static button (Bitmap)
    addSimpleButton(id, x, y, scale, soundId, callback, options = {}) {
        // 1. Reuse addBitmap to handle creation, positioning, and adding to stage
        let btn = this.addBitmap(id, x, y, scale, options);

        // 2. Add Button properties
        btn.cursor = 'pointer';

        // 3. Add Click Listener
        btn.on('click', () => {
            // Play sound if provided
            if (soundId) {
                // You can use this.playSound(id) if you want it to stop other sounds,
                // or createjs.Sound.play(id) if you want it to overlap.
                this.playSound(soundId);
            }

            // Run custom code (like your specific logic)
            if (callback) {
                callback();
            }
        });

        return btn;
    }
    /**
     * Adds an action button with hover effects and execute a function.
     */
    addActionButton(normalId, hoverId, x, y, scale, soundId, callback) {
        let normalImg = this.queue.getResult(normalId);
        let hoverImg = this.queue.getResult(hoverId);

        let btnSheet = new createjs.SpriteSheet({
            images: [normalImg, hoverImg],
            frames: { width: normalImg.width, height: normalImg.height },
            animations: {
                normal: 0,
                hover: 1,
            },
        });

        let btn = new createjs.Sprite(btnSheet, 'normal');
        btn.mouseEnabled = true;
        btn.cursor = 'pointer';
        btn.x = x;
        btn.y = y;
        btn.scale = scale * this.dpr;

        // --- Event Listeners ---

        btn.on('mouseover', () => {
            btn.gotoAndStop('hover');
            if (soundId) {
                this.playSound(soundId);
            }
        });

        btn.on('mouseout', () => {
            btn.gotoAndStop('normal');
        });

        btn.on('click', () => {
            btn.gotoAndStop('hover');
            if (this.playingSound) {
                this.playingSound.stop();
                this.playingSound = null;
            }
            // 2. Execute the Custom Function
            if (callback && typeof callback === 'function') {
                callback();
            }
        });

        this.stage.addChild(btn);
        return btn;
    }
}
